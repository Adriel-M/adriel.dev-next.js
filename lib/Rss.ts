import { Feed } from 'feed'

import siteConfig from '@/lib/siteConfig'
import { generateTagsPath, URLS } from '@/lib/UrlLibs'
import { Post } from '#veliteContent'

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

const author = {
  name: siteConfig.author,
  email: 'contact@websiteDomain',
}

const copyrightNotice =
  'Copyright Adriel Martinez. Some rights reserved. Licensed under CC BY 4.0: http://creativecommons.org/licenses/by/4.0/'
const getFeed = (posts: Post[]) => {
  const title = siteConfig.title
  const feed = new Feed({
    title,
    description: siteConfig.description,
    id: siteConfig.siteUrl,
    link: siteConfig.siteUrl,
    language: siteConfig.locale,
    favicon: `${siteConfig.siteUrl}/static/images/favicon.ico`,
    updated: posts.length > 0 ? new Date(posts[0].createdAt) : undefined,
    feedLinks: {
      rss: `${siteConfig.siteUrl}${URLS.RSS}`,
      atom: `${siteConfig.siteUrl}${URLS.ATOM}`,
    },
    author: author,
    copyright: copyrightNotice,
  })
  for (const post of posts) {
    feed.addItem({
      title: post.title,
      id: `${siteConfig.siteUrl}/${post.path}`,
      link: `${siteConfig.siteUrl}/${post.path}`,
      description: post.summary,
      date: new Date(post.createdAt),
      author: [author],
      category: post.tags.map((sluggedTag) => ({
        name: sluggedTag.tag,
        domain: `${siteConfig.siteUrl}${generateTagsPath(sluggedTag)}`,
      })),
    })
  }

  return new StyledFeed(feed)
}

export default getFeed
