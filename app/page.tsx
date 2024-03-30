import { allBlogs } from 'contentlayer/generated'

import { sortPosts } from '@/lib/PlinyUtils'

import Main from './Main'

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  return <Main posts={sortedPosts} />
}
