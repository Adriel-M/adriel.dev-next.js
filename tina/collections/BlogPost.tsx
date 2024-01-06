import React from 'react'

import { Collection } from '@tinacms/cli'
import { Form, TinaCMS } from 'tinacms'

const BlogPost: Collection = {
  name: 'post',
  label: 'Blog Posts',
  path: 'data/blog',
  format: 'mdx',
  defaultItem: () => {
    return {
      date: new Date().toISOString(),
    }
  },
  ui: {
    beforeSubmit: async ({
      form,
      cms,
      values,
    }: {
      form: Form
      cms: TinaCMS
      values: Record<string, unknown>
    }) => {
      return {
        ...values,
        lastmod: new Date().toISOString(),
      }
    },
  },
  fields: [
    {
      type: 'string',
      name: 'title',
      label: 'Title',
      isTitle: true,
      required: true,
    },
    {
      label: 'Date',
      name: 'date',
      type: 'datetime',
      required: true,
    },
    {
      type: 'string',
      name: 'summary',
      label: 'Summary',
    },
    {
      type: 'rich-text',
      name: 'body',
      label: 'Body',
      isBody: true,
    },
    {
      label: 'Tags',
      name: 'tags',
      type: 'string',
      list: true,
    },
    {
      label: 'Last Modified',
      name: 'lastmod',
      type: 'datetime',
      ui: {
        component: () => <div className="hidden"></div>,
      },
    },
  ],
}

export default BlogPost
