import '@/css/globals.css'

import { Metadata } from 'next'
import { ReactNode } from 'react'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import PostHogProvider from '@/components/posthog'
import ScrollTop from '@/components/ScrollTop'
import SectionContainer from '@/components/SectionContainer'
import siteConfig from '@/lib/siteConfig'
import { URLS } from '@/lib/UrlLibs'

import fonts from './fonts'

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title: {
      default: siteConfig.title,
      template: `%s | ${siteConfig.title}`,
    },
    description: siteConfig.description,
    openGraph: {
      title: siteConfig.title,
      description: siteConfig.description,
      url: './',
      siteName: siteConfig.title,
      locale: 'en_US',
      type: 'website',
    },
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': URLS.RSS,
        'application/atom+xml': URLS.ATOM,
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
  }
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang={siteConfig.language}
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
      <body className="bg-white pl-[calc(100vw-100%)] text-black antialiased">
        <PostHogProvider>
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
        </PostHogProvider>
      </body>
    </html>
  )
}
