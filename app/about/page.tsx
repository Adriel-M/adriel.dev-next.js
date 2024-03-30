import { genPageMetadata } from 'app/seo'
import { allAuthors } from 'contentlayer/generated'
import { MDXComponents } from 'mdx/types'
import { MDXLayoutRenderer } from 'pliny/mdx-components'

import { components } from '@/components/MDXComponents'
import ObfuscatedEmail from '@/components/ObfuscatedEmail'
import siteMetadata from '@/data/siteMetadata'
import PageSimple from '@/layouts/PageSimple'

const title = 'About'
export const metadata = genPageMetadata({ title: title })

export default function Page() {
  const AboutComponents: MDXComponents = {
    ObfuscatedEmail,
    ...components,
  }
  const author = allAuthors[0]
  return (
    <>
      <PageSimple title={title}>
        <MDXLayoutRenderer
          code={author.body.code}
          components={AboutComponents}
          emailAddress={siteMetadata.emailAddress}
        />
      </PageSimple>
    </>
  )
}
