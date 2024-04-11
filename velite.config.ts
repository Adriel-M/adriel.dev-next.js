import { writeFileSync } from 'fs'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGemoji from 'remark-gemoji'
import { titleCase } from 'title-case'
import { defineConfig, s } from 'velite'

import siteMetadata from '@/data/siteMetadata'
import { sortPosts } from '@/lib/PlinyUtils'
import remarkImgToJsx from '@/lib/remarkPlugins/RemarkImgToJsx'
import remarkTitleCase from '@/lib/remarkPlugins/RemarkTitleCase'
import getFeed from '@/lib/Rss'
import { SluggedTag } from '@/lib/SluggedTag'
import { generateSummary, headerIcon } from '@/lib/VeliteUtils'

const config = defineConfig({
  collections: {
    authors: {
      name: 'Author',
      pattern: 'author/index.mdx',
      schema: s.object({
        name: s.string(),
        code: s.mdx(),
      }),
      single: true,
    },
    posts: {
      name: 'Post',
      pattern: 'posts/**/*.mdx',
      schema: s
        .object({
          title: s.string().transform((title) => titleCase(title)),
          date: s.isodate(),
          tags: s
            .array(s.string())
            .superRefine((tags, { addIssue }) => {
              const countsPerTag: Record<string, number> = {}

              for (const tag of tags) {
                if (!(tag in countsPerTag)) {
                  countsPerTag[tag] = 0
                }

                countsPerTag[tag] += 1
              }

              const duplicateTags = Object.keys(countsPerTag).filter((tag) => countsPerTag[tag] > 1)

              if (duplicateTags.length > 0) {
                addIssue({
                  code: 'custom',
                  message: `Duplicate tags found: ${duplicateTags}`,
                })

                return s.NEVER
              }
            })
            .transform((tags) => {
              return tags.map((t) => new SluggedTag(t))
            }),
          lastmod: s.isodate().optional(),
          path: s.path(),
          code: s.mdx(),
          summary: s.raw().transform((raw) => generateSummary(raw)),
        })
        .transform((data) => {
          return {
            ...data,
            slug: data.path.replace(/^.+?(\/)/, ''),
            structuredData: {
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: data.title,
              datePublished: data.date,
              dateModified: data.lastmod || data.date,
              description: data.summary,
              image: siteMetadata.socialBanner,
              url: `${siteMetadata.siteUrl}/${data.path}`,
              author: [
                {
                  '@type': 'Person',
                  name: siteMetadata.author,
                },
              ],
            },
          }
        }),
    },
    projects: {
      name: 'Project',
      pattern: 'projects/**/*.yaml',
      schema: s.object({
        title: s.string().transform((title) => titleCase(title)),
        description: s.string(),
        href: s.string().url(),
      }),
    },
    tags: {
      name: 'Tag',
      pattern: 'tags/**/*.yaml',
      schema: s.object({
        counts: s.record(s.string(), s.number()),
      }),
    },
  },
  mdx: {
    gfm: true,
    remarkPlugins: [remarkGemoji, remarkImgToJsx, remarkTitleCase],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'prepend',
          headingProperties: {
            className: ['content-header'],
          },
          content: headerIcon,
        },
      ],
      [
        rehypePrettyCode,
        {
          keepBackground: false,
          defaultLang: {
            block: 'ts',
            inline: 'console',
          },
          theme: 'github-light',
        },
      ],
    ],
    copyLinkedFiles: false,
    removeComments: true,
    minify: true,
  },
  output: {
    assets: 'public/velite',
    base: '/velite/',
  },
  prepare: (collections) => {
    // sort posts on content build time so we don't have to manually sort
    // in the actual page implementation.
    Object.assign(collections, {
      posts: sortPosts(collections.posts),
    })
    const { posts, tags } = collections
    const tagCount: Record<string, number> = {}
    posts.forEach((post) => {
      post.tags.forEach((sluggedTag) => {
        if (!(sluggedTag.tag in tagCount)) {
          tagCount[sluggedTag.tag] = 0
        }

        tagCount[sluggedTag.tag] += 1
      })
    })

    tags.push({
      counts: tagCount,
    })
  },
  complete: ({ posts }) => {
    const feed = getFeed(posts)

    writeFileSync('./public/rss.xml', feed.rss2())
    writeFileSync('./public/atom.xml', feed.atom1())
  },
})

export default config
