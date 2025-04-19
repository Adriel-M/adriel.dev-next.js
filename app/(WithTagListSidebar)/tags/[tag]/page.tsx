import { Metadata } from 'next'

import { genPageMetadata } from '@/app/seo'
import PostListingPage from '@/components/page-display/PostListingPage'
import { getPostsByTagSlug, getTagCounts } from '@/lib/CollectionUtils'
import siteConfig from '@/lib/siteConfig'
import { SluggedTag } from '@/lib/SluggedTag'

interface Params {
  tag: string
}
export async function generateMetadata(props: { params: Promise<Params> }): Promise<Metadata> {
  const params = await props.params
  const tag = params.tag
  return genPageMetadata({
    title: tag,
    description: `${siteConfig.title} ${tag} tagged content`,
  })
}

export const dynamicParams = false

export const generateStaticParams = () => {
  return Object.keys(getTagCounts()).map((tag) => ({
    tag,
  }))
}

export default async function TagPage(props: { params: Promise<Params> }) {
  const params = await props.params
  const tag = params.tag
  const sluggedTag = new SluggedTag(tag)

  const filteredPosts = getPostsByTagSlug(sluggedTag)

  return <PostListingPage posts={filteredPosts} pageNumber={1} currentTag={sluggedTag} />
}
