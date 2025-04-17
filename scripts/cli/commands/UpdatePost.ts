import { select, Separator } from '@inquirer/prompts'
import { promises } from 'fs'

import { postsPath } from '../paths'
import CommandInterface from './CommandInterface'
import Exit from './Exit'
import CreatedAt from './updatePost/CreatedAt'
import Title from './updatePost/Title'
import UpdatedAt from './updatePost/UpdatedAt'

const EXIT = 'Exit'

class UpdatePost implements CommandInterface {
  name = 'Update Post'
  async run(): Promise<void> {
    const postsFolder = `${process.cwd()}/${postsPath}`

    const files = await promises.readdir(postsFolder)

    const fileName = (await select({
      message: 'Which file do you want to update?',
      choices: [...files, new Separator(), EXIT],
    })) as string

    if (fileName === EXIT) {
      process.exit()
    }

    const field = await select({
      message: 'Which field do you want to update?',
      choices: [CreatedAt.choice, UpdatedAt.choice, Title.choice, new Separator(), Exit.choice],
    })

    await field.run(postsFolder, fileName)
  }

  choice: { name: string; value: CommandInterface } = { name: this.name, value: this }
}

const updatePost = new UpdatePost()

export default updatePost
