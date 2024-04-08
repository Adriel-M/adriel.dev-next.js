import { ReactNode } from 'react'

import SectionContainer from '@/components/SectionContainer'

export default function AboutLayout({ children }: { children: ReactNode }) {
  return <SectionContainer>{children}</SectionContainer>
}
