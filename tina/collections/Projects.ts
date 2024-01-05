import { Collection } from '@tinacms/cli'

const Projects: Collection = {
  name: 'projects',
  label: 'Projects',
  path: 'data/projects',
  format: 'mdx',
  match: {
    include: 'index',
  },
  ui: {
    allowedActions: {
      create: false,
      delete: false,
    },
  },
  fields: [
    {
      type: 'rich-text',
      name: 'body',
      label: 'Body',
      isBody: true,
    },
  ],
}

export default Projects
