import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { getTotalPages } from '@/core/PagingUtils'
import PagedListLayoutWithTags from '@/layouts/PagedListLayoutWithTags'

export const generateStaticParams = async () => {
  const totalPages = getTotalPages(allBlogs.length)
  return Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))
}

export default function Page({ params }: { params: { page: string } }) {
  const posts = allCoreContent(sortPosts(allBlogs))
  const pageNumber = parseInt(params.page as string)

  return <PagedListLayoutWithTags posts={posts} title="All Posts" pageNumber={pageNumber} />
}
