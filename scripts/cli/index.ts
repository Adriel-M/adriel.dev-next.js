import { select, Separator } from '@inquirer/prompts'

import Exit from './commands/Exit'
import NewPost from './commands/NewPost'
import UpdatePost from './commands/UpdatePost'

const main = async () => {
  const command = await select({
    message: 'What do you want to do?',
    choices: [NewPost.choice, UpdatePost.choice, new Separator(), Exit.choice],
  })

  await command.run()
}

main()
