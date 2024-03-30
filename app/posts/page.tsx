import { allBlogs } from 'contentlayer/generated'
import { sortPosts } from 'pliny/utils/contentlayer'

import { genPageMetadata } from '@/app/seo'
import PagedListLayoutWithTags from '@/layouts/PagedListLayoutWithTags'

export const metadata = genPageMetadata({ title: 'Posts' })

export default function Page() {
  const posts = sortPosts(allBlogs)

  return <PagedListLayoutWithTags posts={posts} title="All Posts" pageNumber={1} />
}
