import { defineCollection, s } from 'velite'

const TagCollection = defineCollection({
  name: 'Tag',
  pattern: 'virtual',
  schema: s.object({
    counts: s.record(s.string(), s.number()),
  }),
})

export default TagCollection
