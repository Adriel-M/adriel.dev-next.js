import '@/css/user-content.css'

import { genPageMetadata } from 'app/seo'

import PageSimple from '@/app/about/PageSimple'
import { MDXContent } from '@/components/mdx-content'
import ObfuscatedEmail from '@/components/ObfuscatedEmail'
import siteMetadata from '@/lib/siteMetadata'
import { author } from '#veliteContent'

const title = 'About'
export const metadata = genPageMetadata({ title: title })

export default function Page() {
  return (
    <>
      <PageSimple title={title}>
        <MDXContent
          content={author}
          components={{ ObfuscatedEmail }}
          emailAddress={siteMetadata.emailAddress}
        />
      </PageSimple>
    </>
  )
}
