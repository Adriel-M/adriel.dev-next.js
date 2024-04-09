import PostListingPage from '@/app/(PostListing)/PostListingPage'
import { genPageMetadata } from '@/app/seo'
import { getAllPosts } from '@/lib/CollectionUtils'
import { sortPosts } from '@/lib/PlinyUtils'

export const metadata = genPageMetadata({ title: 'Posts' })

export default function Page() {
  const posts = sortPosts(getAllPosts())

  return <PostListingPage posts={posts} pageNumber={1} />
}
