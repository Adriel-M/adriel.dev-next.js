import inquirer from 'inquirer'

import { createNewPost } from './newPost'
import { updatePost } from './updatePosts'

const mainMenuOptions = {
  NEW_FILE: 'New File',
  UPDATE_FILE: 'Update File',
  EXIT: 'Exit',
}

const main = async () => {
  const command = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What do you want to do?',
      choices: Object.values(mainMenuOptions),
    },
  ])

  switch (command.action) {
    case mainMenuOptions.NEW_FILE:
      await createNewPost()
      break
    case mainMenuOptions.UPDATE_FILE:
      await updatePost()
      break
    case mainMenuOptions.EXIT:
      console.log('exiting')
      process.exit()
  }
}

main()
