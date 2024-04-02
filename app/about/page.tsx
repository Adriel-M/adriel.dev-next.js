import { genPageMetadata } from 'app/seo'

import BareObfuscatedEmail from '@/components/ObfuscatedEmail'
import { VeliteMarkdownRenderer } from '@/components/VeliteMarkdownRenderer'
import siteMetadata from '@/data/siteMetadata'
import PageSimple from '@/layouts/PageSimple'
import { authors } from '#veliteContent'

const title = 'About'
export const metadata = genPageMetadata({ title: title })

export default function Page() {
  const author = authors

  const emailAddress = siteMetadata.emailAddress
  const ObfuscatedEmail = () => {
    return <BareObfuscatedEmail emailAddress={emailAddress} />
  }
  return (
    <>
      <PageSimple title={title}>
        <VeliteMarkdownRenderer content={author} components={{ ObfuscatedEmail }} />
      </PageSimple>
    </>
  )
}
