import inquirer from 'inquirer'

import { createNewPost } from './newPost'
import { updatePost } from './updatePosts'

const commands = {
  NEW_FILE: 'New File',
  UPDATE_FILE: 'Update File',
}

const EXIT = 'Exit'

const main = async () => {
  const command = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What do you want to do?',
      choices: [...Object.values(commands), new inquirer.Separator(), EXIT],
    },
  ])

  switch (command.action) {
    case commands.NEW_FILE:
      await createNewPost()
      break
    case commands.UPDATE_FILE:
      await updatePost()
      break
    case EXIT:
      console.log('exiting')
      process.exit()
  }
}

main()
