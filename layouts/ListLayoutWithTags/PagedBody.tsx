import siteMetadata from '@/data/siteMetadata'
import BodyContent from '@/layouts/ListLayoutWithTags/BodyContent'
import { getTotalPages } from '@/lib/PagingUtils'
import { SluggedTag } from '@/lib/SluggedTag'
import { generateTagsPath } from '@/lib/UtlLibs'
import { Post } from '#veliteContent'

interface Props {
  posts: Post[]
  pageNumber: number
  currentTag?: SluggedTag
}
export default function PagedBody({ posts, pageNumber, currentTag }: Props) {
  const displayPosts = posts.slice(
    siteMetadata.postsInPostsPageCount * (pageNumber - 1),
    siteMetadata.postsInPostsPageCount * pageNumber
  )

  let basePath: string

  if (currentTag) {
    basePath = generateTagsPath(currentTag)
  } else {
    basePath = '/posts'
  }
  const pagination = {
    currentPage: pageNumber,
    totalPages: getTotalPages(posts.length),
    basePath,
  }

  return <BodyContent postsToDisplay={displayPosts} pagination={pagination} />
}
