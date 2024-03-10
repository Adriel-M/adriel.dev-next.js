import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { getTotalPages } from '@/core/PagingUtils'
import PagedListLayoutWithTags from '@/layouts/PagedListLayoutWithTags'
import { slug } from 'github-slugger'

export async function generateStaticParams({ params: { tag } }: { params: { tag: string } }) {
  const filteredPosts = allBlogs.filter(
    (post) => post.tags && post.tags.map((t) => slug(t)).includes(tag)
  )
  const totalPages = getTotalPages(filteredPosts)
  return Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))
}

export default function Page({ params }: { params: { page: string; tag: string } }) {
  const pageNumber = parseInt(params.page as string)

  const tag = params.tag

  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)

  const filteredPosts = allCoreContent(
    sortPosts(allBlogs.filter((post) => post.tags && post.tags.map((t) => slug(t)).includes(tag)))
  )

  return <PagedListLayoutWithTags posts={filteredPosts} title={title} pageNumber={pageNumber} />
}
