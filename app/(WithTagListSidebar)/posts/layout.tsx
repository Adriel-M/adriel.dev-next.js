import { ReactNode } from 'react'

import TagListSidebar from '@/components/TagListSidebar'

export default function PostPageLayout({ children }: { children: ReactNode }) {
  return <TagListSidebar>{children}</TagListSidebar>
}
