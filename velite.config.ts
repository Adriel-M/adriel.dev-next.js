import octicons from '@primer/octicons'
import nlp from 'compromise'
import { writeFileSync } from 'fs'
import { slug } from 'github-slugger'
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import removeMd from 'remove-markdown'
import { defineConfig, s } from 'velite'

import siteMetadata from '@/data/siteMetadata'
import remarkImgToJsx from '@/lib/remarkPlugins/RemarkImgToJsx'
import getFeed from '@/lib/Rss'

// Strip this since manually so we can get rid of the whitespace left behind
const footnoteReferenceRegex = /\s+\[\^\w+]/

// markdownStripper can't handle a footnote definition that is more than one word
// just use regex to remove it.
function removeFootnoteReferences(postBody: string): string {
  return postBody.replace(footnoteReferenceRegex, '')
}

const generateSummary = (rawPostBody: string) => {
  const noFootnoteReferences = removeFootnoteReferences(rawPostBody)
  const strippedBody = removeMd(noFootnoteReferences)
  const sentences = nlp(strippedBody).sentences().json()
  let currentNumberOfWords = 0
  const output: string[] = []
  for (const sentence of sentences) {
    output.push(sentence.text)
    currentNumberOfWords += sentence.terms.length
    if (currentNumberOfWords >= siteMetadata.postSummaryLength) {
      break
    }
  }
  return output.join(' ')
}

const TITLE_MAX_LENGTH = 20
const generateShortenedTitle = (title: string): string => {
  if (title.length < TITLE_MAX_LENGTH) return title

  const words = title.split(' ')
  let characterLength = 0
  const newTitleArr: string[] = []

  let isEnd = false
  for (let i = 0; i < words.length; i++) {
    newTitleArr.push(words[i])
    characterLength += words[i].length
    if (i === words.length - 1) isEnd = true
    if (characterLength > TITLE_MAX_LENGTH) break
  }

  let newTitle = newTitleArr.join(' ')

  if (!isEnd) {
    newTitle += '…'
  }

  return newTitle
}

const icon = fromHtmlIsomorphic(
  `<span class="content-header-link-placeholder">${octicons.link.toSVG()}</span>`,
  { fragment: true }
)

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
      schema: s.object({
        title: s.string(),
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
    remarkPlugins: [remarkImgToJsx],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'prepend',
          headingProperties: {
            className: ['content-header'],
          },
          content: icon,
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
