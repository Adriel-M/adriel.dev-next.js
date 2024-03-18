import { CoreContent } from 'pliny/utils/contentlayer'
import { Blog } from 'contentlayer/generated'
import ListLayoutWithTags from '@/layouts/ListLayoutWithTags'
import { getTotalPages, POSTS_PAGE_POST_COUNT } from '@/core/PagingUtils'
import { notFound } from 'next/navigation'

interface PagedListLayoutWithTagsProps {
  posts: CoreContent<Blog>[]
  title: string
  pageNumber: number
  currentTag?: string
}

export default function PagedListLayoutWithTags({
  posts,
  title,
  pageNumber,
  currentTag,
}: PagedListLayoutWithTagsProps) {
  const totalPages = getTotalPages(posts.length)

  if (pageNumber <= 0 || pageNumber > totalPages) {
    throw notFound()
  }

  const displayPosts = posts.slice(
    POSTS_PAGE_POST_COUNT * (pageNumber - 1),
    POSTS_PAGE_POST_COUNT * pageNumber
  )

  let basePath: string

  if (currentTag) {
    basePath = `/tags/${currentTag}`
  } else {
    basePath = '/posts'
  }
  const pagination = {
    currentPage: pageNumber,
    totalPages: totalPages,
    basePath,
  }

  return (
    <ListLayoutWithTags
      posts={posts}
      initialDisplayPosts={displayPosts}
      pagination={pagination}
      title={title}
      currentTag={currentTag}
    />
  )
}
