import { ReactNode } from 'react'

import TagListLayout from '@/layouts/ListLayoutWithTags/TagListLayout'

export default function PostPageLayout({ children }: { children: ReactNode }) {
  return <TagListLayout>{children}</TagListLayout>
}
