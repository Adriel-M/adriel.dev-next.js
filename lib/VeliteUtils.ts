import nlp from 'compromise'
import { remark } from 'remark'
import strip from 'strip-markdown'

import remarkExtractFirstSectionText from '@/lib/remarkPlugins/RemarkExtractFirstSectionText'
import siteMetadata from '@/lib/siteMetadata'

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
