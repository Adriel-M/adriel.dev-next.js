import '@/css/user-content.css'

import { genPageMetadata } from 'app/seo'

import { MDXContent } from '@/components/mdx-content'
import ObfuscatedEmail from '@/components/ObfuscatedEmail'
import SimplePage from '@/components/page-display/SimplePage'
import siteConfig from '@/lib/siteConfig'
import { author } from '#veliteContent'

const title = 'About'
export const metadata = genPageMetadata({ title })

export default function Page() {
  return (
    <>
      <SimplePage title={title}>
        <MDXContent
          content={author}
          components={{ ObfuscatedEmail }}
          emailAddress={siteConfig.emailAddress}
        />
      </SimplePage>
    </>
  )
}
