import React from 'react'

import { Collection } from '@tinacms/cli'
import { Form, InputFieldType, InputProps, TinaCMS, wrapFieldsWithMeta } from 'tinacms'
import { slug } from 'github-slugger'

const formatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const displayDateField = (props: InputFieldType<any, InputProps>) => {
  if (props.input.value) {
    return wrapFieldsWithMeta(({ input }) => {
      const date = new Date(input.value)
      return <div>{formatter.format(date)}</div>
    })(props)
  } else {
    return <div className="hidden"></div>
  }
}

const Post: Collection = {
  name: 'post',
  label: 'Blog Posts',
  path: 'data/posts',
  format: 'mdx',
  ui: {
    filename: {
      slugify: (values) => {
        // YYYY-MM-DD
        const dateString = new Date().toISOString().split('T')[0]
        const titleSlug = values.title ? slug(values.title) : ''
        return dateString + '-' + titleSlug
      },
    },
    beforeSubmit: async ({
      values,
    }: {
      form: Form
      cms: TinaCMS
      values: Record<string, unknown>
    }) => {
      return {
        ...values,
        date: values.date ? values.date : new Date().toISOString(),
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
      ui: {
        component: 'tags',
      },
    },
    {
      label: 'Created At',
      name: 'date',
      type: 'datetime',
      ui: {
        component: displayDateField,
      },
    },
    {
      label: 'Updated At',
      name: 'lastmod',
      type: 'datetime',
      ui: {
        component: displayDateField,
      },
    },
  ],
}

export default Post
