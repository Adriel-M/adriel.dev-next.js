import octicons from '@primer/octicons'
import nlp from 'compromise'
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic'
import { remark } from 'remark'
import strip from 'strip-markdown'

import siteMetadata from '@/data/siteMetadata'
import remarkExtractFirstSectionText from '@/lib/remarkPlugins/RemarkExtractFirstSectionText'

// Strip this since manually so we can get rid of the whitespace left behind
const footnoteReferenceRegex = /\[\^\w+]/
const newLineRegex = /\s+/

const markdownStripper = remark().use(remarkExtractFirstSectionText).use(strip)

const stripMarkdown = (content: string): string => {
  const regexedContent = content.replace(footnoteReferenceRegex, '').replace(newLineRegex, ' ') // replace new line as space
  return String(markdownStripper.processSync(regexedContent)).trim()
}

export const generateSummary = (rawPostBody: string) => {
  const strippedBody = stripMarkdown(rawPostBody)
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
export const generateShortenedTitle = (title: string): string => {
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

export const headerIcon = fromHtmlIsomorphic(
  `<span class="content-header-link-placeholder">${octicons.link.toSVG()}</span>`,
  { fragment: true }
)
