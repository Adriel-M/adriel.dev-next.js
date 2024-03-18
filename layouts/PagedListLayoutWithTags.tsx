import { CoreContent } from 'pliny/utils/contentlayer'
import { Blog } from 'contentlayer/generated'
import ListLayoutWithTags from '@/layouts/ListLayoutWithTags'
import { getTotalPages, POSTS_PAGE_POST_COUNT } from '@/core/PagingUtils'
import { notFound } from 'next/navigation'

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
  const totalPages = getTotalPages(posts.length)

  if (pageNumber <= 0 || pageNumber > totalPages) {
    throw notFound()
  }

  const displayPosts = posts.slice(
    POSTS_PAGE_POST_COUNT * (pageNumber - 1),
    POSTS_PAGE_POST_COUNT * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: totalPages,
  }

  return (
    <ListLayoutWithTags
      posts={posts}
      initialDisplayPosts={displayPosts}
      pagination={pagination}
      title={title}
    />
  )
}
