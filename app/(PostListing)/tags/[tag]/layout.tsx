import { ReactNode } from 'react'

import TagListSidebarLayout from '@/app/(PostListing)/TagListSidebarLayout'
import { SluggedTag } from '@/lib/SluggedTag'

export default function TagLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { tag: string }
}) {
  const sluggedTag = new SluggedTag(params.tag)

  return <TagListSidebarLayout currentTag={sluggedTag}>{children}</TagListSidebarLayout>
}
