import PagedListLayoutWithTags from '@/layouts/PagedListLayoutWithTags'
import { getAllPosts } from '@/lib/CollectionUtils'
import { getTotalPages } from '@/lib/PagingUtils'
import { sortPosts } from '@/lib/PlinyUtils'

export const dynamicParams = false

export const generateStaticParams = () => {
  const totalPages = getTotalPages(getAllPosts().length)
  return Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))
}

export default function Page({ params }: { params: { page: string } }) {
  const posts = sortPosts(getAllPosts())
  const pageNumber = parseInt(params.page)

  return <PagedListLayoutWithTags posts={posts} title="All Posts" pageNumber={pageNumber} />
}
