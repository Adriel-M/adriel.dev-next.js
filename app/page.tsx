import { allBlogs } from 'contentlayer/generated'
import { sortPosts } from 'pliny/utils/contentlayer'

import Main from './Main'

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  return <Main posts={sortedPosts} />
}
