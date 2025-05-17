import fg from 'fast-glob'
import fs from 'fs/promises'
import path from 'path'
import { retext } from 'retext'
import retextEnglish from 'retext-english'
import retextIndefiniteArticle from 'retext-indefinite-article'
import retextRedundantAcronyms from 'retext-redundant-acronyms'
import retextRepeatedWords from 'retext-repeated-words'
import retextSentenceSpacing from 'retext-sentence-spacing'
import { describe, expect, it } from 'vitest'

const POSTS_PATH = '../content/posts'

describe('proofread mdx content', async () => {
  const mdxFiles = await fg('**/*.mdx', {
    cwd: path.resolve(__dirname, POSTS_PATH),
    absolute: true,
  })

  for (const filePath of mdxFiles) {
    const pathSplit = filePath.split('/')
    const slug = pathSplit[pathSplit.length - 2]
    it(`${slug} has no issues`, async () => {
      const content = await fs.readFile(filePath, 'utf8')
      const file = await retext()
        .use(retextEnglish)
        .use(retextIndefiniteArticle)
        .use(retextRedundantAcronyms)
        .use(retextRepeatedWords)
        .use(retextSentenceSpacing)
        .process(content)

      const messages = file.messages

      if (messages.length > 0) {
        console.warn(`Issues found in ${filePath}`)
        for (const message of messages) {
          console.warn(message)
        }
      }
      expect(messages.length).toBe(0)
    })
  }
})
