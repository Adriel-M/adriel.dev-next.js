import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { genPageMetadata } from 'app/seo'
import PageSimple from '@/layouts/PageSimple'
import { author } from '../../core/AuthorInfo'

const title = 'About'
export const metadata = genPageMetadata({ title: title })

export default function Page() {
  return (
    <>
      <PageSimple title={title}>
        <MDXLayoutRenderer code={author.body.code} components={components} />
      </PageSimple>
    </>
  )
}
