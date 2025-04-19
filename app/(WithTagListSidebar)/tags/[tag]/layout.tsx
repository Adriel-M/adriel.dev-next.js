import { ReactNode } from 'react'

import TagListSidebar from '@/components/TagListSidebar'
import { SluggedTag } from '@/lib/SluggedTag'

export default async function TagLayout(props: {
  children: ReactNode
  params: Promise<{ tag: string }>
}) {
  const params = await props.params

  const { children } = props

  const sluggedTag = new SluggedTag(params.tag)

  return <TagListSidebar currentTag={sluggedTag}>{children}</TagListSidebar>
}
