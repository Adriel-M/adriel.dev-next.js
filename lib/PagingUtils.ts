import siteMetadata from '@/lib/siteMetadata'

export const getTotalPages = (numberOfPosts: number): number => {
  return Math.ceil(numberOfPosts / siteMetadata.postsInPostsPageCount)
}
