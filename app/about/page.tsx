import { allAuthors, Authors } from 'contentlayer/generated'
import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { genPageMetadata } from 'app/seo'
import PageSimple from '@/layouts/PageSimple'

const title = 'About'
export const metadata = genPageMetadata({ title: title })

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  return (
    <>
      <PageSimple title={title}>
        <MDXLayoutRenderer code={author.body.code} components={components} />
      </PageSimple>
    </>
  )
}
