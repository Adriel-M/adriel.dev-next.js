import { ReactNode } from 'react'

import TagListSidebarLayout from '@/app/(PostListing)/TagListSidebarLayout'

export default function PostPageLayout({ children }: { children: ReactNode }) {
  return <TagListSidebarLayout>{children}</TagListSidebarLayout>
}
