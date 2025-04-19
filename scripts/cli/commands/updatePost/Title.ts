import { input } from '@inquirer/prompts'
import { slug } from 'github-slugger'
import matter from 'gray-matter'

import { getDateString } from '@/lib/DateUtils'

import UpdatePostCommandInterface from './UpdatePostCommandInterface'

class Title implements UpdatePostCommandInterface {
  name = 'title'

  async run(postsFolder: string, postName: string): Promise<void> {
    const newTitle = (await input({ message: 'New title of Post?' })).trim()

    if (!newTitle || newTitle.toLowerCase() === 'exit') {
      process.exit()
    }

    const filePath = `${postsFolder}/${postName}`
    const file = Bun.file(filePath)
    const fileContent = await file.text()

    const { content, data } = matter(fileContent)

    data.title = newTitle

    const createdAtDateString = getDateString(data.createdAt)

    const targetFileName = `${createdAtDateString}-${slug(data.title)}.mdx`

    const fullPath = `${postsFolder}/${targetFileName}`

    await Bun.write(fullPath, matter.stringify(content, data))

    if (targetFileName !== postName) {
      console.log('deleting original file')
      await file.delete()
    } else {
      console.log('not deleting')
    }

    console.log(`Updated ${postName}`)
  }

  choice: { name: string; value: UpdatePostCommandInterface } = { name: this.name, value: this }
}

const title = new Title()

export default title
