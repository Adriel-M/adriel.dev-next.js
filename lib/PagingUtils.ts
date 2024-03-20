export const FRONT_PAGE_POST_COUNT = 5
export const POSTS_PAGE_POST_COUNT = 5

export const getTotalPages = (numberOfPosts: number): number => {
  return Math.ceil(numberOfPosts / POSTS_PAGE_POST_COUNT)
}
