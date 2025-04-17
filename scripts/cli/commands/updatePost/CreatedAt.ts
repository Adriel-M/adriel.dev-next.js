import { slug } from 'github-slugger'
import matter from 'gray-matter'

import { getDateString } from '../../utils'
import UpdatePostCommandInterface from './UpdatePostCommandInterface'

class CreatedAt implements UpdatePostCommandInterface {
  name = 'createdAt'

  async run(postsFolder: string, fileName: string): Promise<void> {
    const filePath = `${postsFolder}/${fileName}`
    const file = Bun.file(filePath)
    const fileContent = await file.text()

    const { content, data } = matter(fileContent)

    data.createdAt = new Date()
    delete data.updatedAt

    const nowDateString = getDateString(new Date())

    const targetFileName = `${nowDateString}-${slug(data.title)}.mdx`

    const fullPath = `${postsFolder}/${targetFileName}`

    await Bun.write(fullPath, matter.stringify(content, data))

    if (targetFileName !== fileName) {
      console.log('deleting original file')
      await file.delete()
    } else {
      console.log('not deleting')
    }

    console.log(`Updated ${fileName}`)
  }
}

const createdAt = new CreatedAt()

export default createdAt
