import PostListingPage from '@/app/(PostListing)/PostListingPage'
import { getAllPosts } from '@/lib/CollectionUtils'
import { getTotalPages } from '@/lib/PagingUtils'

export const dynamicParams = false

export const generateStaticParams = () => {
  const totalPages = getTotalPages(getAllPosts().length)
  return Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))
}

export default function Page({ params }: { params: { page: string } }) {
  const posts = getAllPosts()
  const pageNumber = parseInt(params.page)

  return <PostListingPage posts={posts} pageNumber={pageNumber} />
}
