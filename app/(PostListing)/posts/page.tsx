import PostListingPage from '@/app/(PostListing)/PostListingPage'
import { genPageMetadata } from '@/app/seo'
import { getAllPosts } from '@/lib/CollectionUtils'

export const metadata = genPageMetadata({ title: 'Posts' })

export default function Page() {
  const posts = getAllPosts()

  return <PostListingPage posts={posts} pageNumber={1} />
}
