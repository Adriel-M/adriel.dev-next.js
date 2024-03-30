import type { MDXComponents } from 'mdx/types'

import Image from './Image'
import CustomLink from './Link'
import Pre from './Pre'
import TableWrapper from './TableWrapper'

export const components = {
  Image,
  a: CustomLink,
  pre: Pre,
  table: TableWrapper,
} as MDXComponents
