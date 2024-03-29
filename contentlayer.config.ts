import octicons from '@primer/octicons'
import nlp from 'compromise'
import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import { writeFileSync } from 'fs'
import { slug } from 'github-slugger'
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic'
import { remarkCodeTitles } from 'pliny/mdx-plugins/index.js'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePresetMinify from 'rehype-preset-minify'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import stripMarkdown from 'strip-markdown'

import siteMetadata from './data/siteMetadata'
import { remarkImgToJsx } from './lib/RemarkUtils'

/**
 * Count the occurrences of all tags across blog posts and write to json file
 */
function createTagCount(allBlogs: { tags: string[] }[]) {
  const tagCount: Record<string, number> = {}
  allBlogs.forEach((file) => {
    if (file.tags) {
      file.tags.forEach((tag) => {
        const formattedTag = slug(tag)
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1
        } else {
          tagCount[formattedTag] = 1
        }
      })
    }
  })
  const orderedTagOutput = JSON.stringify(tagCount, Object.keys(tagCount).sort())
  writeFileSync('./app/tag-data.json', orderedTagOutput)
}

// exclude the image description as well
const markdownStripper = remark().use(stripMarkdown, {
  remove: ['image'],
})

const footnoteReferenceRegex = /\s+\[\^\w+]/

// markdownStripper can't handle a footnote definition that is more than one word
// just use regex to remove it.
function removeFootnoteReferences(postBody: string): string {
  return postBody.replace(footnoteReferenceRegex, '')
}

const generateSummary = (rawPostBody: string) => {
  const noFootnoteReferences = removeFootnoteReferences(rawPostBody)
  const strippedBody = String(markdownStripper.processSync(noFootnoteReferences))
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
    newTitle += '...'
  }

  return newTitle
}

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: 'posts/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    lastmod: { type: 'date' },
    summary: { type: 'string' },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ''),
    },
    path: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath,
    },
    structuredData: {
      type: 'json',
      resolve: (doc) => ({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: doc.title,
        datePublished: doc.date,
        dateModified: doc.lastmod || doc.date,
        description: doc.summary,
        image: siteMetadata.socialBanner,
        url: `${siteMetadata.siteUrl}/${doc._raw.flattenedPath}`,
        author: [
          {
            '@type': 'Person',
            name: siteMetadata.author,
          },
        ],
      }),
    },
    summary: {
      type: 'string',
      resolve: (doc) => {
        if (doc.summary) {
          return doc.summary
        }
        return generateSummary(doc.body.raw)
      },
    },
    shortenedTitle: {
      type: 'string',
      resolve: (doc) => {
        if (!doc.title) return doc.title

        return generateShortenedTitle(doc.title)
      },
    },
  },
}))

export const Authors = defineDocumentType(() => ({
  name: 'Authors',
  filePathPattern: 'authors/**/*.mdx',
  contentType: 'mdx',
  fields: {
    name: { type: 'string', required: true },
  },
}))

export const Projects = defineDocumentType(() => ({
  name: 'Projects',
  filePathPattern: 'projects/**/*.yaml',
  contentType: 'data',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    href: { type: 'string' },
  },
}))

const icon = fromHtmlIsomorphic(
  `
  <span class="content-header-link-placeholder">
    ${octicons.link.toSVG()}
  </span>
  `,
  { fragment: true }
)

export default makeSource({
  contentDirPath: 'data',
  documentTypes: [Blog, Authors, Projects],
  mdx: {
    cwd: process.cwd(),
    remarkPlugins: [remarkGfm, remarkCodeTitles, remarkImgToJsx],
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
      [rehypePrismPlus, { defaultLanguage: 'js', ignoreMissing: true }],
      rehypePresetMinify,
    ],
  },
  onSuccess: async (importData) => {
    const { allBlogs } = await importData()
    createTagCount(allBlogs)
  },
})
