import { CoreContent } from 'pliny/utils/contentlayer'
import { Blog } from 'contentlayer/generated'
import { getListLayoutsProps } from '@/core/PagingUtils'
import ListLayout from '@/layouts/ListLayoutWithTags'

interface PagedListLayoutWithTagsProps {
  posts: CoreContent<Blog>[]
  title: string
  pageNumber: number
}

export default function PagedListLayoutWithTags({
  posts,
  title,
  pageNumber,
}: PagedListLayoutWithTagsProps) {
  const { displayPosts, pagination } = getListLayoutsProps(posts, pageNumber)

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={displayPosts}
      pagination={pagination}
      title={title}
    />
  )
}
