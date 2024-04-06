import { promises } from 'fs'
import matter from 'gray-matter'
import inquirer from 'inquirer'

import { postsPath } from './paths'

const EXIT = 'exitPrompt'
export const updatePost = async () => {
  const postsFolder = `${process.cwd()}/${postsPath}`

  const files = await promises.readdir(postsFolder)

  const fileName = (
    await inquirer.prompt([
      {
        type: 'list',
        name: 'fileName',
        message: 'Which file do you want to update',
        choices: [...files, new inquirer.Separator(), EXIT],
      },
    ])
  ).fileName

  if (fileName === EXIT) {
    process.exit()
  }

  const filePath = `${postsFolder}/${fileName}`
  const file = Bun.file(filePath)
  const fileContent = await file.text()

  const { content, data } = matter(fileContent)

  data['lastmod'] = new Date()

  await Bun.write(filePath, matter.stringify(content, data))

  console.log(`Updated ${fileName}`)
}
