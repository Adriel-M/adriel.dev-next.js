import React from 'react'

import { Collection } from '@tinacms/cli'
import { Form, InputFieldType, InputProps, TinaCMS, wrapFieldsWithMeta } from 'tinacms'

const formatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})
const displayDateField = (props: InputFieldType<unknown, InputProps>) => {
  if (props.input.value) {
    return wrapFieldsWithMeta(({ input }) => {
      const date = new Date(input.value)
      return <div>{formatter.format(date)}</div>
    })(props)
  } else {
    return <div className="hidden"></div>
  }
}

const BlogPost: Collection = {
  name: 'post',
  label: 'Blog Posts',
  path: 'data/blog',
  format: 'mdx',
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

export default BlogPost
