import siteMetadata from '@/data/siteMetadata'
import ListLayoutWithTags from '@/layouts/ListLayoutWithTags'
import { getTotalPages } from '@/lib/PagingUtils'
import { Post } from '#veliteContent'

interface PagedListLayoutWithTagsProps {
  posts: Post[]
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
    siteMetadata.postsInPostsPageCount * (pageNumber - 1),
    siteMetadata.postsInPostsPageCount * pageNumber
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
