import { getAllPosts } from '@/lib/CollectionUtils'
import { sortPosts } from '@/lib/PlinyUtils'

import Main from './Main'

export default async function Page() {
  const sortedPosts = sortPosts(getAllPosts())
  return <Main posts={sortedPosts} />
}
