import '@/css/user-content.css'

import { genPageMetadata } from 'app/seo'

import PageSimple from '@/app/PageSimple'
import { MDXContent } from '@/components/mdx-content'
import { license } from '#veliteContent'

const title = 'License'
export const metadata = genPageMetadata({ title })

export default function Page() {
  return (
    <>
      <PageSimple title={title}>
        <MDXContent content={license} />
      </PageSimple>
    </>
  )
}
