import { slug } from 'github-slugger'

import { Post, posts, projects, tags } from '#veliteContent'

export const getAllPosts = (): Post[] => {
  return posts
}

export const getPostBySlug = (slug: string): Post => {
  return posts.find((p) => p.slug === slug)!
}

export const getPostsByTagSlug = (tagSlug: string): Post[] => {
  return getAllPosts().filter((post) => post.tags.map((t) => slug(t)).includes(tagSlug))
}

export const getAllProjects = () => {
  return projects
}

export const getTagCounts = () => {
  return tags[0].counts
}
