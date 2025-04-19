import { rename } from 'node:fs/promises'
import { join } from 'node:path'

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

    const folderPath = join(postsFolder, postName)
    const filePath = join(folderPath, 'index.mdx')
    const file = Bun.file(filePath)
    const fileContent = await file.text()

    const { content, data } = matter(fileContent)

    data.title = newTitle

    await Bun.write(filePath, matter.stringify(content, data))

    const createdAtDateString = getDateString(data.createdAt)
    const targetFolderName = `${createdAtDateString}-${slug(data.title)}`

    const targetFolderPath = join(postsFolder, targetFolderName)

    if (targetFolderName !== postName) {
      await rename(folderPath, targetFolderPath)
    }

    console.log(`Updated ${targetFolderName}`)
  }

  choice: { name: string; value: UpdatePostCommandInterface } = { name: this.name, value: this }
}

const title = new Title()

export default title
