import { ComponentType } from 'react'
import * as runtime from 'react/jsx-runtime'

import Image from '@/components/Image'
import Link from '@/components/Link'
import TableWrapper from '@/components/TableWrapper'

const globalComponents = {
  Image,
  a: Link,
  table: TableWrapper,
}

// parse the Velite generated MDX code into a React component function
const useMDXComponent = (code: string) => {
  const fn = new Function(code)
  return fn({ ...runtime }).default
}

interface MDXProps {
  content: { code: string }
  components?: Record<string, ComponentType>
  [key: string]: unknown
}

// MDXContent component
export const VeliteMarkdownRenderer = ({ content, components, ...rest }: MDXProps) => {
  const Component = useMDXComponent(content.code)
  return <Component components={{ ...globalComponents, ...components }} {...rest} />
}
