import { MetadataRoute } from 'next'

import { getAllPosts } from '@/lib/CollectionUtils'
import siteMetadata from '@/lib/siteMetadata'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl

  const blogRoutes = getAllPosts().map((post) => ({
    url: `${siteUrl}/${post.path}`,
    lastModified: post.updatedAt ?? post.createdAt,
  }))

  const now = new Date().toISOString().split('T')[0]

  const routes = ['', 'posts', 'projects', 'about'].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: now,
  }))

  return [...routes, ...blogRoutes]
}
