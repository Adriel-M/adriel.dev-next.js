import { input } from '@inquirer/prompts'
import { slug } from 'github-slugger'
import matter from 'gray-matter'

import { getDateString } from '@/lib/DateUtils'

import { postsPath } from '../paths'
import CommandInterface from './CommandInterface'

class NewPost implements CommandInterface {
  name = 'New Post'
  async run(): Promise<void> {
    const postsFolder = `${process.cwd()}/${postsPath}`
    const title = await input({ message: 'Title of Post?' })

    const now = new Date()
    const date = getDateString(now)
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
}

const newPost = new NewPost()

export default newPost
