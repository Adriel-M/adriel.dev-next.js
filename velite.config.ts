import { writeFileSync } from 'fs'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { rehypeGithubAlerts } from 'rehype-github-alerts'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGemoji from 'remark-gemoji'
import { defineConfig } from 'velite'

import { sortPosts } from '@/lib/PlinyUtils'
import rehypeAutolinkHeadingsConfig from '@/lib/rehypeConfigs/RehypeAutolinkHeadingsConfig'
import rehypePrettyCodeConfig from '@/lib/rehypeConfigs/RehypePrettyCodeConfig'
import remarkCopyLinkedImageConfig from '@/lib/remarkConfigs/remarkCopyLinkedImageConfig'
import remarkCopyLinkedImage from '@/lib/remarkPlugins/RemarkCopyLinkedImage'
import remarkImgToJsx from '@/lib/remarkPlugins/RemarkImgToJsx'
import remarkTitleCase from '@/lib/remarkPlugins/RemarkTitleCase'
import getFeed from '@/lib/Rss'
import AuthorCollection from '@/veliteCollections/AuthorCollection'
import PostCollection from '@/veliteCollections/PostCollection'
import ProjectCollection from '@/veliteCollections/ProjectCollection'
import TagCollection from '@/veliteCollections/TagCollection'

const config = defineConfig({
  strict: true,
  collections: {
    author: AuthorCollection,
    posts: PostCollection,
    projects: ProjectCollection,
    tags: TagCollection,
  },
  mdx: {
    gfm: true,
    remarkPlugins: [
      [remarkCopyLinkedImage, remarkCopyLinkedImageConfig],
      remarkGemoji,
      remarkImgToJsx,
      remarkTitleCase,
    ],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, rehypeAutolinkHeadingsConfig],
      [rehypePrettyCode, rehypePrettyCodeConfig],
      [rehypeGithubAlerts],
    ],
    copyLinkedFiles: false,
    removeComments: true,
    minify: true,
  },
  output: {
    assets: 'public/velite',
    base: '/velite/',
  },
  prepare: (collections) => {
    // sort posts on content build time so we don't have to manually sort
    // in the actual page implementation.
    Object.assign(collections, {
      posts: sortPosts(collections.posts),
    })
    const { posts, tags } = collections
    const tagCount: Record<string, number> = {}

    for (const post of posts) {
      for (const sluggedTag of post.tags) {
        tagCount[sluggedTag.tag] = (tagCount[sluggedTag.tag] ?? 0) + 1
      }
    }

    tags.push({
      counts: tagCount,
    })
  },
  complete: ({ posts }) => {
    const feed = getFeed(posts)

    writeFileSync('./public/rss.xml', feed.rss2())
    writeFileSync('./public/atom.xml', feed.atom1())
  },
})

export default config
