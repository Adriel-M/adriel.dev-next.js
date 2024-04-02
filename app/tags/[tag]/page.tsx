import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'

import tagData from '@/app/tag-data.json'
import siteMetadata from '@/data/siteMetadata'
import PagedListLayoutWithTags from '@/layouts/PagedListLayoutWithTags'
import { getPostsByTagSlug } from '@/lib/CollectionUtils'
import { sortPosts } from '@/lib/PlinyUtils'

interface Params {
  tag: string
}
export function generateMetadata({ params }: { params: Params }): Metadata {
  const tag = decodeURI(params.tag)
  return genPageMetadata({
    title: tag,
    description: `${siteMetadata.title} ${tag} tagged content`,
  })
}

export const dynamicParams = false

export const generateStaticParams = () => {
  return Object.keys(tagData).map((tag) => ({
    tag: encodeURI(tag),
  }))
}

export default function TagPage({ params }: { params: Params }) {
  const tag = decodeURI(params.tag)

  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  const filteredPosts = sortPosts(getPostsByTagSlug(tag))

  return (
    <PagedListLayoutWithTags posts={filteredPosts} title={title} pageNumber={1} currentTag={tag} />
  )
}
