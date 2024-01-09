import { writeFileSync, mkdirSync } from 'fs'
import path from 'path'
import GithubSlugger from 'github-slugger'
import siteMetadata from '../data/siteMetadata.js'
import tagData from '../app/tag-data.json' assert { type: 'json' }
import { allBlogs } from '../.contentlayer/generated/index.mjs'
import { sortPosts } from 'pliny/utils/contentlayer.js'
import { Feed } from "feed";

// TODO: Figure out how to style these feeds
class FeedFileWriter {
  constructor(folderPath, feedObject) {
    this.folderPath = folderPath
    this.feedObject = feedObject
  }

  writeRssFile() {
    writeFileSync(path.join(this.folderPath, this.RSS_FILE_NAME), this.feedObject.rss2())
  }

  writeAtomFile() {
    writeFileSync(path.join(this.folderPath, this.ATOM_FILE_NAME), this.feedObject.atom1())
  }

  writeJsonFile() {
    writeFileSync(path.join(this.folderPath, this.JSON_FILE_NAME), this.feedObject.json1())
  }

  RSS_FILE_NAME = 'rss.xml'
  ATOM_FILE_NAME = 'feed.xml'
  JSON_FILE_NAME = 'feed.json'
}

const copyrightNotice = "Copyright Adriel Martinez. Some rights reserved. Licensed under CC BY 4.0: http://creativecommons.org/licenses/by/4.0/"
const generateFeedObject = (config, posts, tagName = '') => {
  let feedPathWithSiteUrl = config.siteUrl + '/'
  if (tagName) {
    feedPathWithSiteUrl += `tags/${tagName}/`
  }
  let title = config.title
  if (tagName) {
    title += ' ' + `[tag: ${tagName}]`
  }
  const feed = new Feed({
    title,
    description: config.description,
    id: config.siteUrl,
    link: `${config.siteUrl}/blog`,
    language: "en",
    favicon: `${config.siteUrl}/static/images/favicon.ico`,
    updated: posts.length > 0 ? new Date(posts[0].date) : undefined,
    feedLinks: {
      rss: feedPathWithSiteUrl + 'rss.xml',
      atom: feedPathWithSiteUrl + 'feed.xml',
    },
    author: {
      name: config.author,
      email: "contact@[websiteDomain]",
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
            email: "contact@[websiteDomain]"
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
    const feedFileWriter = new FeedFileWriter(path.join('public'), feedObject)

    feedFileWriter.writeRssFile()
    feedFileWriter.writeAtomFile()
    feedFileWriter.writeJsonFile()
  }

  if (publishPosts.length > 0) {
    for (const tag of Object.keys(tagData)) {
      const filteredPosts = allBlogs.filter((post) =>
        post.tags.map((t) => GithubSlugger.slug(t)).includes(tag)
      )
      const feedObject = generateFeedObject(config, filteredPosts, tag)
      const rssPath = path.join('public', 'tags', tag)
      mkdirSync(rssPath, { recursive: true })
      const feedFileWriter = new FeedFileWriter(rssPath, feedObject)

      feedFileWriter.writeRssFile()
      feedFileWriter.writeAtomFile()
      feedFileWriter.writeJsonFile()
    }
  }
}

const rss = () => {
  generateFeed(siteMetadata, allBlogs)
  console.log('RSS feed generated...')
}
export default rss
