import * as runtime from 'react/jsx-runtime'

import Image from '@/components/Image'
import CustomLink from '@/components/Link'
import Pre from '@/components/Pre'
import TableWrapper from '@/components/TableWrapper'

const globalComponents = {
  Image,
  a: CustomLink,
  pre: Pre,
  table: TableWrapper,
}

// parse the Velite generated MDX code into a React component function
const useMDXComponent = (code: string) => {
  const fn = new Function(code)
  return fn({ ...runtime }).default
}

interface MDXProps {
  content: { code: string }
  components?: Record<string, React.ComponentType>
}

// MDXContent component
export const VeliteMarkdownRenderer = ({ content, components }: MDXProps) => {
  const Component = useMDXComponent(content.code)
  return <Component components={{ ...globalComponents, ...components }} />
}
