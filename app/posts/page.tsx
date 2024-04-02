import { genPageMetadata } from 'app/seo'

import PagedListLayoutWithTags from '@/layouts/PagedListLayoutWithTags'
import { getAllPosts } from '@/lib/CollectionUtils'
import { sortPosts } from '@/lib/PlinyUtils'

export const metadata = genPageMetadata({ title: 'Posts' })

export default function Page() {
  const posts = sortPosts(getAllPosts())

  return <PagedListLayoutWithTags posts={posts} title="All Posts" pageNumber={1} />
}
