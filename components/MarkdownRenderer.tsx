import { MDXComponents } from 'mdx/types'
import { getMDXComponent } from 'mdx-bundler/client'

import { components } from '@/components/MDXComponents'

interface Props {
  content: { body: { code: string } }
  extraComponents?: MDXComponents
  [key: string]: unknown
}

const MarkdownRenderer = ({ content, extraComponents, ...rest }: Props) => {
  const Content = getMDXComponent(content.body.code)

  return <Content components={{ ...components, ...extraComponents }} {...rest} />
}

export default MarkdownRenderer
