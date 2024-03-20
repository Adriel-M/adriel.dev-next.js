import { JetBrains_Mono } from 'next/font/google'
import { ReactNode } from 'react'

import Footer from './Footer'
import Header from './Header'
import SectionContainer from './SectionContainer'

interface Props {
  children: ReactNode
}

const jetbrains_mono = JetBrains_Mono({
  subsets: ['latin'],
})

const LayoutWrapper = ({ children }: Props) => {
  return (
    <SectionContainer>
      <div
        className={`${jetbrains_mono.className} flex h-screen flex-col justify-between font-monospace`}
      >
        <Header />
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
