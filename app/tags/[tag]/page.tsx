import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'

import siteMetadata from '@/data/siteMetadata'
import PagedListLayoutWithTags from '@/layouts/PagedListLayoutWithTags'
import { getPostsByTagSlug, getTagCounts } from '@/lib/CollectionUtils'
import { sortPosts } from '@/lib/PlinyUtils'
import { SluggedTag } from '@/lib/SluggedTag'

interface Params {
  tag: string
}
export function generateMetadata({ params }: { params: Params }): Metadata {
  const tag = params.tag
  return genPageMetadata({
    title: tag,
    description: `${siteMetadata.title} ${tag} tagged content`,
  })
}

export const dynamicParams = false

export const generateStaticParams = () => {
  return Object.keys(getTagCounts()).map((tag) => ({
    tag,
  }))
}

export default function TagPage({ params }: { params: Params }) {
  const tag = params.tag
  const sluggedTag = new SluggedTag(tag)

  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  const filteredPosts = sortPosts(getPostsByTagSlug(sluggedTag))

  return (
    <PagedListLayoutWithTags
      posts={filteredPosts}
      title={title}
      pageNumber={1}
      currentTag={sluggedTag}
    />
  )
}
