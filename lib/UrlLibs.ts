import { SluggedTag } from '@/lib/SluggedTag'
import { Post } from '#veliteContent'

const TAGS_BASE_PATH = '/tags/'

export const generateTagsPath = (sluggedTag: SluggedTag): string => {
  return `${TAGS_BASE_PATH}${sluggedTag.tag}`
}

export const generatePostsPath = (post: Post): string => {
  return `/${post.path}`
}

export const URLS = {
  HOME: '/',
  POSTS: '/posts',
  PROJECTS: '/projects',
  ABOUT: '/about',
  RSS: '/rss.xml',
  ATOM: '/atom.xml',
}
