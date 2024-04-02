import octicons from '@primer/octicons'
import nlp from 'compromise'
import { writeFileSync } from 'fs'
import { slug } from 'github-slugger'
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'
import removeMd from 'remove-markdown'
import { defineConfig, s } from 'velite'

import siteMetadata from '@/data/siteMetadata'
import remarkCodeTitles from '@/lib/remarkPlugins/RemarkCodeTitles'
import remarkImgToJsx from '@/lib/remarkPlugins/RemarkImgToJsx'

function createTagCount(allPosts: { tags: string[] }[]) {
  const tagCount: { [key: string]: number } = {}
  for (const post of allPosts) {
    for (const tag of post.tags) {
      const formattedTag = slug(tag)
      if (!(formattedTag in tagCount)) {
        tagCount[formattedTag] = 0
      }

      tagCount[formattedTag] += 1
    }
  }
  const orderedTagOutput = JSON.stringify(tagCount, Object.keys(tagCount).sort())
  writeFileSync('./app/tag-data.json', orderedTagOutput)
}

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
  `
  <span class="content-header-link-placeholder">
    ${octicons.link.toSVG()}
  </span>
  `,
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
              '@type': 'PostPosting',
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
  },
  mdx: {
    gfm: true,
    remarkPlugins: [remarkCodeTitles, remarkImgToJsx],
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
      [rehypePrismPlus, { defaultLanguage: 'ts' }],
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
  complete: ({ posts }) => {
    const tagCount: { [key: string]: number } = {}
    posts.forEach((post) => {
      post.tags.forEach((tag) => {
        const formattedTag = slug(tag)
        if (!(formattedTag in tagCount)) {
          tagCount[formattedTag] = 0
        }

        tagCount[formattedTag] += 1
      })
    })
    const orderedTagOutput = JSON.stringify(tagCount, Object.keys(tagCount).sort())
    writeFileSync('./app/tag-data.json', orderedTagOutput)
    createTagCount(posts)
  },
})

export default config
