import { CoreContent } from 'pliny/utils/contentlayer'
import { Blog } from 'contentlayer/generated'

const POSTS_PER_PAGE = 5

export interface PaginationProps {
  totalPages: number
  currentPage: number
}

const getDisplayPosts = (posts: CoreContent<Blog>[], pageNumber: number): CoreContent<Blog>[] => {
  return posts.slice(POSTS_PER_PAGE * (pageNumber - 1), POSTS_PER_PAGE * pageNumber)
}

const getPaginationProps = (posts: CoreContent<Blog>[], pageNumber: number): PaginationProps => {
  return {
    currentPage: pageNumber,
    totalPages: getTotalPages(posts),
  }
}

export const getTotalPages = (posts: CoreContent<Blog>[]): number => {
  return posts.length / POSTS_PER_PAGE
}

export const getListLayoutsProps = (
  posts: CoreContent<Blog>[],
  pageNumber: number
): { displayPosts: CoreContent<Blog>[]; pagination: PaginationProps } => {
  const displayPosts = getDisplayPosts(posts, pageNumber)
  const pagination = getPaginationProps(posts, pageNumber)

  return {
    displayPosts,
    pagination,
  }
}
