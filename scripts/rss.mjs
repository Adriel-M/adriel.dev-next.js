import { Feed } from 'feed'
import { mkdirSync, writeFileSync } from 'fs'
import { slug } from 'github-slugger'
import path from 'path'
import { sortPosts } from 'pliny/utils/contentlayer.js'

import siteMetadata from '@/data/siteMetadata.ts'

import { allBlogs } from '../.contentlayer/generated/index.mjs'
import tagData from '../app/tag-data.json' assert { type: 'json' }

class FeedFileWriter {
  constructor(folderPath, feedObject) {
    this.folderPath = folderPath
    this.feedObject = feedObject
  }

  writeRssFile() {
    const rssContent = this.feedObject.rss2()
    const styledContent = this.addStyleToFeedContent(rssContent, 'rss.xslt')
    writeFileSync(path.join(this.folderPath, this.#RSS_FILE_NAME), styledContent)
  }

  writeAtomFile() {
    const rssContent = this.feedObject.atom1()
    const styledContent = this.addStyleToFeedContent(rssContent, 'atom.xslt')
    writeFileSync(path.join(this.folderPath, this.#ATOM_FILE_NAME), styledContent)
  }

  writeJsonFile() {
    writeFileSync(path.join(this.folderPath, this.#JSON_FILE_NAME), this.feedObject.json1())
  }

  addStyleToFeedContent(content, styleFileName) {
    return content.replace(
      this.#XML_CONTENT_TO_REPLACE,
      this.#XML_CONTENT_TO_REPLACE + '\n' + this.generateRssImportContent(styleFileName)
    )
  }

  generateRssImportContent(fileName) {
    return `<?xml-stylesheet href="/static/feed/${fileName}" type="text/xsl"?>`
  }

  #XML_CONTENT_TO_REPLACE = '<?xml version="1.0" encoding="utf-8"?>'
  #RSS_FILE_NAME = 'rss.xml'
  #ATOM_FILE_NAME = 'feed.xml'
  #JSON_FILE_NAME = 'feed.json'
}

const copyrightNotice =
  'Copyright Adriel Martinez. Some rights reserved. Licensed under CC BY 4.0: http://creativecommons.org/licenses/by/4.0/'
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
    link: config.siteUrl,
    language: 'en',
    favicon: `${config.siteUrl}/static/images/favicon.ico`,
    updated: posts.length > 0 ? new Date(posts[0].date) : undefined,
    feedLinks: {
      rss: feedPathWithSiteUrl + 'rss.xml',
      atom: feedPathWithSiteUrl + 'feed.xml',
    },
    author: {
      name: config.author,
      email: 'contact@websiteDomain',
    },
    copyright: copyrightNotice,
  })
  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${config.siteUrl}/${post.path}`,
      link: `${config.siteUrl}/${post.path}`,
      description: post.summary,
      date: new Date(post.date),
      author: [
        {
          name: config.author,
          email: 'contact@websiteDomain',
        },
      ],
      category: post.tags.map((tag) => ({
        name: tag,
        domain: `${siteMetadata.siteUrl}/tags/${tag}`,
      })),
    })
  })

  return feed
}

function generateFeed(config, allBlogs) {
  // RSS for blog post
  if (allBlogs.length > 0) {
    const feedObject = generateFeedObject(config, sortPosts(allBlogs))
    const feedFileWriter = new FeedFileWriter(path.join('public'), feedObject)

    feedFileWriter.writeRssFile()
    feedFileWriter.writeAtomFile()
    feedFileWriter.writeJsonFile()
  }

  if (allBlogs.length > 0) {
    for (const tag of Object.keys(tagData)) {
      const filteredPosts = allBlogs.filter((post) => post.tags.map((t) => slug(t)).includes(tag))
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
