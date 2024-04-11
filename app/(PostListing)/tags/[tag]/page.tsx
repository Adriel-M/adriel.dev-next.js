import { Metadata } from 'next'

import PostListingPage from '@/app/(PostListing)/PostListingPage'
import { genPageMetadata } from '@/app/seo'
import siteMetadata from '@/data/siteMetadata'
import { getPostsByTagSlug, getTagCounts } from '@/lib/CollectionUtils'
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

  const filteredPosts = getPostsByTagSlug(sluggedTag)

  return <PostListingPage posts={filteredPosts} pageNumber={1} currentTag={sluggedTag} />
}
