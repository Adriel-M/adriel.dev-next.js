import { genPageMetadata } from 'app/seo'

import ObfuscatedEmail from '@/components/ObfuscatedEmail'
import { VeliteMarkdownRenderer } from '@/components/VeliteMarkdownRenderer'
import PageSimple from '@/layouts/PageSimple'
import { authors } from '#veliteContent'

const title = 'About'
export const metadata = genPageMetadata({ title: title })

export default function Page() {
  const author = authors
  return (
    <>
      <PageSimple title={title}>
        <VeliteMarkdownRenderer content={author} components={{ ObfuscatedEmail }} />
      </PageSimple>
    </>
  )
}
