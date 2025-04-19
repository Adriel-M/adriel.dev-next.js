import { Metadata } from 'next'

import { generateOgPath } from '@/lib/OgUtils'
import siteConfig from '@/lib/siteConfig'

interface PageSEOProps {
  title: string
  description?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export function genPageMetadata({ title, description, ...rest }: PageSEOProps): Metadata {
  const ogImage = [generateOgPath(title)]
  return {
    title,
    description: description ?? siteConfig.description,
    openGraph: {
      title: `${title} | ${siteConfig.title}`,
      description: description ?? siteConfig.description,
      url: './',
      siteName: siteConfig.title,
      images: ogImage,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      title: `${title} | ${siteConfig.title}`,
      card: 'summary_large_image',
      images: ogImage,
    },
    ...rest,
  }
}
