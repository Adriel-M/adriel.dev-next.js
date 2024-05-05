import { slug } from 'github-slugger'
import matter from 'gray-matter'
import inquirer from 'inquirer'

import { postsPath } from './paths'

export const createNewPost = async () => {
  const postsFolder = `${process.cwd()}/${postsPath}`
  const title = (
    await inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Title of Post?',
      },
    ])
  ).title
  const now = new Date()
  const date = now.toISOString().split('T')[0]
  const fileName = `${date}-${slug(title)}.mdx`
  const fullPath = `${postsFolder}/${fileName}`
  const frontMatter = {
    title,
    createdAt: now,
    tags: ['tag'],
  }

  await Bun.write(fullPath, matter.stringify('', frontMatter))

  console.log(`Created new post at ${fullPath}`)
}
