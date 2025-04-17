import { select, Separator } from '@inquirer/prompts'
import { promises } from 'fs'
import matter from 'gray-matter'

import { postsPath } from '../paths'
import CommandInterface from './CommandInterface'

const exitEntry = {
  name: 'Exit',
  value: 'EXIT',
}

const generateSimpleChoice = (name: string) => {
  return {
    name: name,
    value: name,
  }
}

const fieldChoices = ['createdAt', 'updatedAt'].map(generateSimpleChoice)

class UpdatePost implements CommandInterface {
  name = 'Update Post'
  async run(): Promise<void> {
    const postsFolder = `${process.cwd()}/${postsPath}`

    const files = await promises.readdir(postsFolder)

    const fileName = await select({
      message: 'Which file do you want to update?',
      choices: [...files.map(generateSimpleChoice), new Separator(), exitEntry],
    })

    if (fileName === exitEntry.value) {
      process.exit()
    }

    const field = await select({
      message: 'Which field do you want to update?',
      choices: [...fieldChoices, new Separator(), exitEntry],
    })

    if (field === exitEntry.value) {
      process.exit()
    }

    const filePath = `${postsFolder}/${fileName}`
    const file = Bun.file(filePath)
    const fileContent = await file.text()

    const { content, data } = matter(fileContent)

    data[field] = new Date()

    await Bun.write(filePath, matter.stringify(content, data))

    console.log(`Updated ${fileName}`)
  }
}

const updatePostClass = new UpdatePost()

export default updatePostClass
