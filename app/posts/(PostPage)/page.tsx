import { genPageMetadata } from '@/app/seo'
import PagedBody from '@/layouts/ListLayoutWithTags/PagedBody'
import { getAllPosts } from '@/lib/CollectionUtils'
import { sortPosts } from '@/lib/PlinyUtils'

export const metadata = genPageMetadata({ title: 'Posts' })

export default function Page() {
  const posts = sortPosts(getAllPosts())

  return <PagedBody posts={posts} pageNumber={1} />
}
