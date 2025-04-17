import matter from 'gray-matter'

import UpdatePostCommandInterface from './UpdatePostCommandInterface'

class UpdatedAt implements UpdatePostCommandInterface {
  name = 'updatedAt'

  async run(postsFolder: string, fileName: string): Promise<void> {
    const filePath = `${postsFolder}/${fileName}`
    const file = Bun.file(filePath)
    const fileContent = await file.text()

    const { content, data } = matter(fileContent)

    data.updatedAt = new Date()

    await Bun.write(filePath, matter.stringify(content, data))

    console.log(`Updated ${fileName}`)
  }

  choice: { name: string; value: UpdatePostCommandInterface } = { name: this.name, value: this }
}

const updatedAt = new UpdatedAt()

export default updatedAt
