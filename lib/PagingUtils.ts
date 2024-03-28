import siteMetadata from '@/data/siteMetadata'

export const getTotalPages = (numberOfPosts: number): number => {
  return Math.ceil(numberOfPosts / siteMetadata.postsInPostsPageCount)
}
