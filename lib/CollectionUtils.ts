import { SluggedTag } from '@/lib/SluggedTag'
import { Post, posts, projects, tags } from '#veliteContent'

export const getAllPosts = (): Post[] => {
  return posts
}

export const getPostBySlug = (slug: string): Post => {
  return posts.find((p) => p.slug === slug)!
}

export const getPostsByTagSlug = (sluggedTag: SluggedTag): Post[] => {
  return getAllPosts().filter((post) => {
    return post.tags.some((t) => t.tag === sluggedTag.tag)
  })
}

export const getAllProjects = () => {
  return projects
}

export const getTagCounts = () => {
  return tags[0].counts
}

const tagSortAlphaFn = (a: SluggedTag, b: SluggedTag) => a.tag.localeCompare(b.tag)

export const sortTagsByAlpha = (tags: SluggedTag[]): SluggedTag[] => {
  return tags.sort(tagSortAlphaFn)
}
