import { allPosts } from 'contentlayer/generated'

import { sortPosts } from '@/lib/PlinyUtils'

import Main from './Main'

export default async function Page() {
  const sortedPosts = sortPosts(allPosts)
  return <Main posts={sortedPosts} />
}
