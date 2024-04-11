import { getAllPosts } from '@/lib/CollectionUtils'

import Main from './Main'

export default async function Page() {
  const posts = getAllPosts()
  return <Main posts={posts} />
}
