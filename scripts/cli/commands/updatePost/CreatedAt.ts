import { rename } from 'node:fs/promises'
import { join } from 'node:path'

import { slug } from 'github-slugger'
import matter from 'gray-matter'

import { getDateString } from '@/lib/DateUtils'

import UpdatePostCommandInterface from './UpdatePostCommandInterface'

class CreatedAt implements UpdatePostCommandInterface {
  name = 'createdAt'

  async run(postsFolder: string, postName: string): Promise<void> {
    const folderPath = join(postsFolder, postName)
    const filePath = join(folderPath, 'index.mdx')

    const file = Bun.file(filePath)
    const fileContent = await file.text()

    const { content, data } = matter(fileContent)

    data.createdAt = new Date()
    delete data.updatedAt

    const nowDateString = getDateString(new Date())

    // overwrite original file
    await Bun.write(filePath, matter.stringify(content, data))

    const targetFolderName = `${nowDateString}-${slug(data.title)}`
    const targetFolderPath = join(postsFolder, targetFolderName)

    if (targetFolderName !== postName) {
      await rename(folderPath, targetFolderPath)
    }

    console.log(`Updated ${targetFolderName}`)
  }

  choice: { name: string; value: UpdatePostCommandInterface } = { name: this.name, value: this }
}

const createdAt = new CreatedAt()

export default createdAt
