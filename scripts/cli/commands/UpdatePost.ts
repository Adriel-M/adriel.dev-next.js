import { select, Separator } from '@inquirer/prompts'
import { promises } from 'fs'

import { postsPath } from '../paths'
import CommandInterface from './CommandInterface'
import Exit from './Exit'
import CreatedAt from './updatePost/CreatedAt'
import Title from './updatePost/Title'
import UpdatePostUpdateFieldUpdatedAt from './updatePost/UpdatedAt'

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
      choices: [
        {
          name: CreatedAt.name,
          value: CreatedAt,
        },
        {
          name: UpdatePostUpdateFieldUpdatedAt.name,
          value: UpdatePostUpdateFieldUpdatedAt,
        },
        {
          name: Title.name,
          value: Title,
        },
        new Separator(),
        {
          name: Exit.name,
          value: Exit,
        },
      ],
    })

    await field.run(postsFolder, fileName)
  }
}

const updatePost = new UpdatePost()

export default updatePost
