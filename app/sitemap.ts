import { MetadataRoute } from 'next'

import { getAllPosts } from '@/lib/CollectionUtils'
import { getDateString } from '@/lib/DateUtils'
import siteConfig from '@/lib/siteConfig'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteConfig.siteUrl

  const blogRoutes = getAllPosts().map((post) => ({
    url: `${siteUrl}/${post.path}`,
    lastModified: post.updatedAt ?? post.createdAt,
  }))

  const now = getDateString(new Date())

  const routes = ['', 'posts', 'projects', 'about'].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: now,
  }))

  return [...routes, ...blogRoutes]
}
