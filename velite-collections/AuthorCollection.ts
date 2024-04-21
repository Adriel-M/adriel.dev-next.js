import { defineCollection, s } from 'velite'

const AuthorCollection = defineCollection({
  name: 'Author',
  pattern: 'author/index.mdx',
  schema: s.object({
    name: s.string(),
    code: s.mdx(),
  }),
  single: true,
})

export default AuthorCollection
