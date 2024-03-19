import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { getTotalPages } from '@/core/PagingUtils'
import PagedListLayoutWithTags from '@/layouts/PagedListLayoutWithTags'
import { slug } from 'github-slugger'
import tagData from '../../../../tag-data.json'

interface TagAndPage {
  tag: string
  page: string
}
export const dynamicParams = false

export function generateStaticParams() {
  const tagCounts = tagData as Record<string, number>
  const tags = Object.keys(tagCounts)
  const entries: TagAndPage[] = []

  for (const tag of tags) {
    const numberOfPages = getTotalPages(tagCounts[tag])

    for (let i = 0; i < numberOfPages; i++) {
      entries.push({
        tag,
        page: (i + 1).toString(),
      })
    }
  }

  return entries
}

export default function Page({ params }: { params: { page: string; tag: string } }) {
  const pageNumber = parseInt(params.page as string)

  const tag = params.tag

  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)

  const filteredPosts = allCoreContent(
    sortPosts(allBlogs.filter((post) => post.tags && post.tags.map((t) => slug(t)).includes(tag)))
  )

  return (
    <PagedListLayoutWithTags
      posts={filteredPosts}
      title={title}
      pageNumber={pageNumber}
      currentTag={tag}
    />
  )
}
