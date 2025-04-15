import { ReactNode } from 'react'

import TagListSidebarLayout from '@/app/(PostListing)/TagListSidebarLayout'
import { SluggedTag } from '@/lib/SluggedTag'

export default async function TagLayout(props: {
  children: ReactNode
  params: Promise<{ tag: string }>
}) {
  const params = await props.params

  const { children } = props

  const sluggedTag = new SluggedTag(params.tag)

  return <TagListSidebarLayout currentTag={sluggedTag}>{children}</TagListSidebarLayout>
}
