import PostListingPage from '@/components/page-display/PostListingPage'
import { getPostsByTagSlug, getTagCounts } from '@/lib/CollectionUtils'
import { getTotalPages } from '@/lib/PagingUtils'
import { SluggedTag } from '@/lib/SluggedTag'

interface TagAndPage {
  tag: string
  page: string
}
export const dynamicParams = false

export function generateStaticParams() {
  const entries: TagAndPage[] = []

  for (const [tag, count] of Object.entries(getTagCounts())) {
    const numberOfPages = getTotalPages(count)

    for (let i = 0; i < numberOfPages; i++) {
      entries.push({
        tag,
        page: (i + 1).toString(),
      })
    }
  }

  return entries
}

export default async function Page(props: { params: Promise<{ page: string; tag: string }> }) {
  const params = await props.params
  const pageNumber = parseInt(params.page)

  const tag = params.tag
  const sluggedTag = new SluggedTag(tag)

  const filteredPosts = getPostsByTagSlug(sluggedTag)

  return <PostListingPage posts={filteredPosts} pageNumber={pageNumber} currentTag={sluggedTag} />
}
