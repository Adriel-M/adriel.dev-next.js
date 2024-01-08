import { writeFileSync, mkdirSync } from 'fs'
import path from 'path'
import GithubSlugger from 'github-slugger'
import siteMetadata from '../data/siteMetadata.js'
import tagData from '../app/tag-data.json' assert { type: 'json' }
import { allBlogs } from '../.contentlayer/generated/index.mjs'
import { sortPosts } from 'pliny/utils/contentlayer.js'
import { Feed } from "feed";

const copyrightNotice = "Copyright Adriel Martinez. Some rights reserved. Licensed under CC BY 4.0: http://creativecommons.org/licenses/by/4.0/"
const generateFeedObject = (config, posts, feedPath = '/') => {
  let feedPathWithSitUrl = config.siteUrl + feedPath
  const feed = new Feed({
    title: config.title,
    description: config.description,
    id: config.siteUrl,
    link: `${config.siteUrl}/blog`,
    language: "en",
    favicon: `${config.siteUrl}/static/images/favicon.ico`,
    updated: posts.length > 0 ? new Date(posts[0].date) : undefined,
    feedLinks: {
      rss: feedPathWithSitUrl + 'rss.xml',
      atom: feedPathWithSitUrl + 'feed.xml',
    },
    author: {
      name: config.author,
      email: "<contact>@<websiteDomain>",
    },
    copyright: copyrightNotice,
  })
  posts.forEach(post => {
    feed.addItem(
      {
        title: post.title,
        id: `${config.siteUrl}/blog/${post.slug}`,
        link: `${config.siteUrl}/blog/${post.slug}`,
        description: post.summary,
        date: new Date(post.date),
        author: [
          {
            name: config.author,
            email: "<contact>@<websiteDomain>"
          }
        ],
        category: post.tags.map(tag => ({
          name: tag,
          domain: `${siteMetadata.siteUrl}/tags/${tag}`
        })),
      }
    )
  })

  return feed
}

async function generateFeed(config, allBlogs) {
  const publishPosts = allBlogs.filter((post) => post.draft !== true)
  // RSS for blog post
  if (publishPosts.length > 0) {
    const feedObject = generateFeedObject(config, sortPosts(publishPosts))

    writeFileSync(`./public/rss.xml`, feedObject.rss2())
    writeFileSync(`./public/feed.xml`, feedObject.atom1())
    writeFileSync(`./public/feed.json`, feedObject.json1())
  }

  if (publishPosts.length > 0) {
    for (const tag of Object.keys(tagData)) {
      const filteredPosts = allBlogs.filter((post) =>
        post.tags.map((t) => GithubSlugger.slug(t)).includes(tag)
      )
      const feedObject = generateFeedObject(config, filteredPosts, `/tags/${tag}/`)
      const rssPath = path.join('public', 'tags', tag)
      mkdirSync(rssPath, { recursive: true })
      writeFileSync(path.join(rssPath, "rss.xml"), feedObject.rss2())
      writeFileSync(path.join(rssPath, "feed.xml"), feedObject.atom1())
      writeFileSync(path.join(rssPath, "feed.json"), feedObject.json1())
    }
  }
}

const rss = () => {
  generateFeed(siteMetadata, allBlogs)
  console.log('RSS feed generated...')
}
export default rss
