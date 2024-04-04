import '@/css/user-content.css'

import { genPageMetadata } from 'app/seo'

import ObfuscatedEmail from '@/components/ObfuscatedEmail'
import { VeliteMarkdownRenderer } from '@/components/VeliteMarkdownRenderer'
import siteMetadata from '@/data/siteMetadata'
import PageSimple from '@/layouts/PageSimple'
import { authors } from '#veliteContent'

const title = 'About'
export const metadata = genPageMetadata({ title: title })

export default function Page() {
  return (
    <>
      <PageSimple title={title}>
        <VeliteMarkdownRenderer
          content={authors}
          components={{ ObfuscatedEmail }}
          emailAddress={siteMetadata.emailAddress}
        />
      </PageSimple>
    </>
  )
}
