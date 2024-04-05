import { slug } from 'github-slugger'
import matter from 'gray-matter'

const postPath = 'content/posts'

const createNewPost = async () => {
  const postsFolder = `${process.cwd()}/${postPath}`
  let title = ''
  console.log('Type a title: ')
  for await (const line of console) {
    title = line
    break
  }
  const now = new Date()
  const date = now.toISOString().split('T')[0]
  const fileName = `${date}-${slug(title)}.mdx`
  const fullPath = `${postsFolder}/${fileName}`
  const frontMatter = {
    title,
    date: now,
    tags: ['tag'],
  }

  await Bun.write(fullPath, matter.stringify('', frontMatter))
}

createNewPost()
