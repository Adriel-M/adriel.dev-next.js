import { Metadata } from 'next'

import siteConfig from '@/lib/siteConfig'

interface PageSEOProps {
  title: string
  description?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export function genPageMetadata({ title, description, ...rest }: PageSEOProps): Metadata {
  return {
    title,
    description: description ?? siteConfig.description,
    openGraph: {
      title: `${title} | ${siteConfig.title}`,
      description: description ?? siteConfig.description,
      url: './',
      siteName: siteConfig.title,
      locale: 'en_US',
      type: 'website',
    },
    ...rest,
  }
}
