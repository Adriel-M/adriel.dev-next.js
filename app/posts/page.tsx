import { genPageMetadata } from 'app/seo'
import { allBlogs } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'

import PagedListLayoutWithTags from '@/layouts/PagedListLayoutWithTags'

export const metadata = genPageMetadata({ title: 'Posts' })

export default function Page() {
  const posts = allCoreContent(sortPosts(allBlogs))

  return <PagedListLayoutWithTags posts={posts} title="All Posts" pageNumber={1} />
}
