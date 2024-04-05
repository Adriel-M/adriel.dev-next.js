import matter from 'gray-matter'

const postPath = 'data/posts'

const createNewPost = async () => {
  const postsFolder = `${process.cwd()}/${postPath}`
  const now = new Date()
  const date = now.toISOString().split('T')[0]
  const fileName = `${date}-REPLACE_ME.mdx`
  const fullPath = `${postsFolder}/${fileName}`
  const frontMatter = {
    title: 'REPLACE ME',
    date: now,
    tags: ['tag'],
  }

  await Bun.write(fullPath, matter.stringify('', frontMatter))
}

createNewPost()
