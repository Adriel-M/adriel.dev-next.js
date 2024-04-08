import { ReactNode } from 'react'

import SectionContainer from '@/components/SectionContainer'

export default function PostLayout({ children }: { children: ReactNode }) {
  return <SectionContainer>{children}</SectionContainer>
}
