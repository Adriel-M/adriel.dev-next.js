import { ReactNode } from 'react'

import TagListLayout from '@/layouts/ListLayoutWithTags/TagListLayout'

export default function PostPageLayout({
  children,
}: {
  children: ReactNode
  params: { tag: string }
}) {
  return <TagListLayout currentTag={undefined}>{children}</TagListLayout>
}
