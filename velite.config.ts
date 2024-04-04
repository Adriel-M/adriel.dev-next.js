import { writeFileSync } from 'fs'
import { slug } from 'github-slugger'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import { titleCase } from 'title-case'
import { defineConfig, s } from 'velite'

import siteMetadata from '@/data/siteMetadata'
import remarkImgToJsx from '@/lib/remarkPlugins/RemarkImgToJsx'
import remarkTitleCase from '@/lib/remarkPlugins/RemarkTitleCase'
import getFeed from '@/lib/Rss'
import { generateShortenedTitle, generateSummary, headerIcon } from '@/lib/VeliteUtils'

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
          title: s.string(),
          date: s.isodate(),
          tags: s.array(s.string()),
          lastmod: s.isodate().optional(),
          path: s.path(),
          code: s.mdx(),
        })
        .transform((data, { meta }) => {
          const summary = generateSummary(meta.content!)
          return {
            ...data,
            title: titleCase(data.title),
            slug: data.path.replace(/^.+?(\/)/, ''),
            structuredData: {
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: data.title,
              datePublished: data.date,
              dateModified: data.lastmod || data.date,
              description: summary,
              image: siteMetadata.socialBanner,
              url: `${siteMetadata.siteUrl}/${data.path}`,
              author: [
                {
                  '@type': 'Person',
                  name: siteMetadata.author,
                },
              ],
            },
            summary,
            shortenedTitle: generateShortenedTitle(data.title),
          }
        }),
    },
    projects: {
      name: 'Project',
      pattern: 'projects/**/*.yaml',
      schema: s
        .object({
          title: s.string(),
          description: s.string(),
          href: s.string().url(),
        })
        .transform((data) => {
          return {
            ...data,
            title: titleCase(data.title),
          }
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
    remarkPlugins: [remarkImgToJsx, remarkTitleCase],
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
  root: 'data',
  prepare: ({ posts, tags }) => {
    const tagCount: Record<string, number> = {}
    posts.forEach((post) => {
      post.tags.forEach((tag) => {
        const formattedTag = slug(tag)
        if (!(formattedTag in tagCount)) {
          tagCount[formattedTag] = 0
        }

        tagCount[formattedTag] += 1
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
