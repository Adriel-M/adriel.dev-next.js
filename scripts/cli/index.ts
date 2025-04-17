import { select, Separator } from '@inquirer/prompts'

import Exit from './commands/Exit'
import NewPost from './commands/NewPost'
import UpdatePost from './commands/UpdatePost'

const main = async () => {
  const command = await select({
    message: 'What do you want to do?',
    choices: [
      {
        name: NewPost.name,
        value: NewPost,
      },
      {
        name: UpdatePost.name,
        value: UpdatePost,
      },
      new Separator(),
      {
        name: Exit.name,
        value: Exit,
      },
    ],
  })

  await command.run()
}

main()
