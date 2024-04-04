import '@/css/user-content.css'

import { genPageMetadata } from 'app/seo'

import { VeliteMarkdownRenderer } from '@/components/VeliteMarkdownRenderer'
import siteMetadata from '@/data/siteMetadata'
import PageSimple from '@/layouts/PageSimple'
import { authors } from '#veliteContent'

const title = 'About'
export const metadata = genPageMetadata({ title: title })

const ObfuscatedEmail = ({ emailAddress }: { emailAddress?: string }) => {
  return <a href={`mailto:${emailAddress}`}>{emailAddress}</a>
}
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
