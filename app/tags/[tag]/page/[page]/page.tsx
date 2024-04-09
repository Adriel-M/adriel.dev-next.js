import PagedBody from '@/layouts/ListLayoutWithTags/PagedBody'
import { getPostsByTagSlug, getTagCounts } from '@/lib/CollectionUtils'
import { getTotalPages } from '@/lib/PagingUtils'
import { sortPosts } from '@/lib/PlinyUtils'
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

export default function Page({ params }: { params: { page: string; tag: string } }) {
  const pageNumber = parseInt(params.page as string)

  const tag = params.tag
  const sluggedTag = new SluggedTag(tag)

  const filteredPosts = sortPosts(getPostsByTagSlug(sluggedTag))

  return <PagedBody posts={filteredPosts} pageNumber={pageNumber} currentTag={sluggedTag} />
}
