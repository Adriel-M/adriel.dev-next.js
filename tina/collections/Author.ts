import { Collection } from '@tinacms/cli'

const Author: Collection = {
  name: 'author',
  label: 'Author Info',
  path: 'data/authors',
  format: 'mdx',
  match: {
    include: 'default',
  },
  ui: {
    allowedActions: {
      create: false,
      delete: false,
    },
  },
  fields: [
    {
      type: 'string',
      name: 'name',
      label: 'Name',
      required: true,
    },
    {
      type: 'rich-text',
      name: 'body',
      label: 'Body',
      isBody: true,
    },
  ],
}

export default Author
