import { readdir } from 'node:fs/promises'
import { join } from 'node:path'

import { select, Separator } from '@inquirer/prompts'

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
    const postsFolder = join(process.cwd(), postsPath)

    const files = await readdir(postsFolder)
    const sortedFileNmaes = files.sort().reverse()

    const postName = (await select({
      message: 'Which file do you want to update?',
      choices: [...sortedFileNmaes, new Separator(), EXIT],
    })) as string

    if (postName === EXIT) {
      process.exit()
    }

    const field = await select({
      message: 'Which field do you want to update?',
      choices: [CreatedAt.choice, UpdatedAt.choice, Title.choice, new Separator(), Exit.choice],
    })

    await field.run(postsFolder, postName)
  }

  choice: { name: string; value: CommandInterface } = { name: this.name, value: this }
}

const updatePost = new UpdatePost()

export default updatePost
