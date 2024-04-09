import { ReactNode } from 'react'

import TagListLayout from '@/layouts/ListLayoutWithTags/TagListLayout'
import { SluggedTag } from '@/lib/SluggedTag'

export default function TagLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { tag: string }
}) {
  const sluggedTag = new SluggedTag(params.tag)

  return <TagListLayout currentTag={sluggedTag}>{children}</TagListLayout>
}
