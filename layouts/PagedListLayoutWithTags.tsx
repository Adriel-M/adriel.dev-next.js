import { Blog } from 'contentlayer/generated'

import ListLayoutWithTags from '@/layouts/ListLayoutWithTags'
import { getTotalPages, POSTS_PAGE_POST_COUNT } from '@/lib/PagingUtils'

interface PagedListLayoutWithTagsProps {
  posts: Blog[]
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
    totalPages: getTotalPages(posts.length),
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
