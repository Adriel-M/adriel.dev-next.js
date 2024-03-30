import { allBlogs } from 'contentlayer/generated'
import { Feed } from 'feed'

import siteMetadata from '@/data/siteMetadata'
import { sortPosts } from '@/lib/PlinyUtils'

class StyledFeed {
  private readonly feedObject: Feed
  constructor(feedObject: Feed) {
    this.feedObject = feedObject
  }

  rss2() {
    const rssContent = this.feedObject.rss2()
    return this.addStyleToFeedContent(rssContent, 'rss.xslt')
  }

  atom1() {
    const rssContent = this.feedObject.atom1()
    return this.addStyleToFeedContent(rssContent, 'atom.xslt')
  }

  addStyleToFeedContent(content: string, styleFileName: string) {
    return content.replace(
      this.#XML_CONTENT_TO_REPLACE,
      this.#XML_CONTENT_TO_REPLACE + '\n' + this.generateRssImportContent(styleFileName)
    )
  }

  generateRssImportContent(fileName: string) {
    return `<?xml-stylesheet href="/static/feed/${fileName}" type="text/xsl"?>`
  }

  #XML_CONTENT_TO_REPLACE = '<?xml version="1.0" encoding="utf-8"?>'
}

const copyrightNotice =
  'Copyright Adriel Martinez. Some rights reserved. Licensed under CC BY 4.0: http://creativecommons.org/licenses/by/4.0/'
const getFeed = () => {
  const posts = sortPosts(allBlogs)
  const feedPathWithSiteUrl = siteMetadata.siteUrl + '/'
  const title = siteMetadata.title
  const feed = new Feed({
    title,
    description: siteMetadata.description,
    id: siteMetadata.siteUrl,
    link: siteMetadata.siteUrl,
    language: 'en',
    favicon: `${siteMetadata.siteUrl}/static/images/favicon.ico`,
    updated: posts.length > 0 ? new Date(posts[0].date) : undefined,
    feedLinks: {
      rss: feedPathWithSiteUrl + 'rss.xml',
      atom: feedPathWithSiteUrl + 'feed.xml',
    },
    author: {
      name: siteMetadata.author,
      email: 'contact@websiteDomain',
    },
    copyright: copyrightNotice,
  })
  for (const post of posts) {
    feed.addItem({
      title: post.title,
      id: `${siteMetadata.siteUrl}/${post.path}`,
      link: `${siteMetadata.siteUrl}/${post.path}`,
      description: post.summary,
      date: new Date(post.date),
      author: [
        {
          name: siteMetadata.author,
          email: 'contact@websiteDomain',
        },
      ],
      category: post.tags.map((tag) => ({
        name: tag,
        domain: `${siteMetadata.siteUrl}/tags/${tag}`,
      })),
    })
  }

  return new StyledFeed(feed)
}

export default getFeed
