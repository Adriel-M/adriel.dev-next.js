import { genPageMetadata } from 'app/seo'
import { author } from 'contentlayer/generated'

import MarkdownRenderer from '@/components/MarkdownRenderer'
import ObfuscatedEmail from '@/components/ObfuscatedEmail'
import siteMetadata from '@/data/siteMetadata'
import PageSimple from '@/layouts/PageSimple'

const title = 'About'
export const metadata = genPageMetadata({ title: title })

export default function Page() {
  return (
    <>
      <PageSimple title={title}>
        <MarkdownRenderer
          content={author}
          extraComponents={{ ObfuscatedEmail }}
          emailAddress={siteMetadata.emailAddress}
        />
      </PageSimple>
    </>
  )
}
