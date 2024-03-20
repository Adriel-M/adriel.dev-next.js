import type { MDXComponents } from 'mdx/types'
import Pre from 'pliny/ui/Pre'

import Image from './Image'
import CustomLink from './Link'
import TableWrapper from './TableWrapper'

export const components: MDXComponents = {
  Image,
  a: CustomLink,
  pre: Pre,
  table: TableWrapper,
}
