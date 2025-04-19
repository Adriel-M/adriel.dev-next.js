import { join } from 'node:path'

import matter from 'gray-matter'

import UpdatePostCommandInterface from './UpdatePostCommandInterface'

class UpdatedAt implements UpdatePostCommandInterface {
  name = 'updatedAt'

  async run(postsFolder: string, postName: string): Promise<void> {
    const filePath = join(postsFolder, postName, 'index.mdx')
    const file = Bun.file(filePath)
    const fileContent = await file.text()

    const { content, data } = matter(fileContent)

    data.updatedAt = new Date()

    await Bun.write(filePath, matter.stringify(content, data))

    console.log(`Updated ${postName}`)
  }

  choice: { name: string; value: UpdatePostCommandInterface } = { name: this.name, value: this }
}

const updatedAt = new UpdatedAt()

export default updatedAt
