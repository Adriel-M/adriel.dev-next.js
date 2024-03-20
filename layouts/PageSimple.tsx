import { ReactNode } from 'react'

import PageTitle from '@/components/PageTitle'
import ScrollTop from '@/components/ScrollTop'
import SectionContainer from '@/components/SectionContainer'

interface LayoutProps {
  title: string
  children: ReactNode
}

export default function PageSimple({ title, children }: LayoutProps) {
  return (
    <SectionContainer>
      <ScrollTop />
      <article>
        <div>
          <header>
            <div className="space-y-1 border-b border-gray-200 pb-10 text-center">
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 xl:divide-y-0">
            <div className="divide-y divide-gray-200 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pb-8 pt-10">{children}</div>
            </div>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
