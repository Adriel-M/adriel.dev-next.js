import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { genPageMetadata } from 'app/seo'
import PageSimple from '@/layouts/PageSimple'
import { author } from '../../core/AuthorInfo'
import { MDXComponents } from 'mdx/types'
import ObfuscatedEmail from '@/components/ObfuscatedEmail'

const title = 'About'
export const metadata = genPageMetadata({ title: title })

export default function Page() {
  const AboutComponents: MDXComponents = {
    ObfuscatedEmail,
    ...components,
  }
  return (
    <>
      <PageSimple title={title}>
        <MDXLayoutRenderer code={author.body.code} components={AboutComponents} />
      </PageSimple>
    </>
  )
}
