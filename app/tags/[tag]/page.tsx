import { genPageMetadata } from 'app/seo'
import { allBlogs } from 'contentlayer/generated'
import { slug } from 'github-slugger'
import { Metadata } from 'next'

import tagData from '@/app/tag-data.json'
import siteMetadata from '@/data/siteMetadata'
import PagedListLayoutWithTags from '@/layouts/PagedListLayoutWithTags'
import { sortPosts } from '@/lib/PlinyUtils'

export async function generateMetadata({ params }: { params: { tag: string } }): Promise<Metadata> {
  const tag = decodeURI(params.tag)
  return genPageMetadata({
    title: tag,
    description: `${siteMetadata.title} ${tag} tagged content`,
  })
}

export const dynamicParams = false

export const generateStaticParams = async () => {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  return tagKeys.map((tag) => ({
    tag: encodeURI(tag),
  }))
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const tag = decodeURI(params.tag)

  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  const filteredPosts = sortPosts(
    allBlogs.filter((post) => post.tags && post.tags.map((t) => slug(t)).includes(tag))
  )

  return (
    <PagedListLayoutWithTags posts={filteredPosts} title={title} pageNumber={1} currentTag={tag} />
  )
}
