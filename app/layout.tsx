import '@/css/globals.css'

import { Metadata } from 'next'
import { ReactNode } from 'react'

import RUM from '@/app/RUM'
import ScrollTop from '@/app/ScrollTop'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import SectionContainer from '@/components/SectionContainer'
import siteMetadata from '@/lib/siteMetadata'
import { URLS } from '@/lib/UrlLibs'

import fonts from './fonts'
import UmamiAnalytics from './UmamiAnalytics'

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: ['/og'],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/rss.xml`,
      'application/atom+xml': `${siteMetadata.siteUrl}/atom.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: ['/og'],
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang={siteMetadata.language}
      className={`${fonts.className} scroll-smooth`}
      suppressHydrationWarning
    >
      <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png" />
      <link rel="manifest" href="/static/favicons/site.webmanifest" />
      <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
      <link rel="alternate" type="application/rss+xml" href={URLS.RSS} />
      <link rel="alternate" type="application/atom+xml" href={URLS.ATOM} />
      <body className="bg-white pl-[calc(100vw-100%)] text-black antialiased">
        <RUM />
        <UmamiAnalytics />
        <SectionContainer>
          <div className="flex h-screen flex-col justify-between">
            <Header />
            <main className="mb-auto">
              {children}
              <ScrollTop />
            </main>
            <Footer />
          </div>
        </SectionContainer>
      </body>
    </html>
  )
}
