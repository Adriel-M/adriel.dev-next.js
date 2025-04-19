import siteConfig from '@/lib/siteConfig'

export const getTotalPages = (numberOfPosts: number): number => {
  return Math.ceil(numberOfPosts / siteConfig.postsInPostsPageCount)
}
