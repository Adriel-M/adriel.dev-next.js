import siteMetadata from '@/data/siteMetadata'
import ListLayoutWithTags from '@/layouts/ListLayoutWithTags'
import { getTotalPages } from '@/lib/PagingUtils'
import { SluggedTag } from '@/lib/SluggedTag'
import { Post } from '#veliteContent'

interface PagedListLayoutWithTagsProps {
  posts: Post[]
  title: string
  pageNumber: number
  currentTag?: SluggedTag
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
    basePath = `/tags/${currentTag.tag}`
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
