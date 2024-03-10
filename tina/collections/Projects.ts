import { Collection } from '@tinacms/cli'
import { slug } from 'github-slugger'

const Projects: Collection = {
  name: 'projects',
  label: 'Projects',
  path: 'data/projects',
  format: 'yaml',
  ui: {
    filename: {
      slugify: (values) => {
        return values.title ? slug(values.title) : ''
      },
    },
  },
  fields: [
    {
      type: 'string',
      name: 'title',
      label: 'Title',
      required: true,
    },
    {
      type: 'rich-text',
      name: 'description',
      label: 'Description',
      required: true,
    },
    {
      type: 'string',
      name: 'href',
      label: 'URL',
    },
  ],
}

export default Projects
