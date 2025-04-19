import '@/css/user-content.css'

import { genPageMetadata } from 'app/seo'

import { MDXContent } from '@/components/mdx-content'
import SimplePage from '@/components/page-display/SimplePage'
import { license } from '#veliteContent'

const title = 'License'
export const metadata = genPageMetadata({ title })

export default function Page() {
  return (
    <>
      <SimplePage title={title}>
        <MDXContent content={license} />
      </SimplePage>
    </>
  )
}
