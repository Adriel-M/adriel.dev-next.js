import 'css/prism.css'

import { allPosts } from 'contentlayer/generated'
import { Metadata } from 'next'

import MarkdownRenderer from '@/components/MarkdownRenderer'
import siteMetadata from '@/data/siteMetadata'
import PostSimple from '@/layouts/PostSimple'
import { sortPosts } from '@/lib/PlinyUtils'

interface Params {
  slug: string
}

export function generateMetadata({ params }: { params: Params }): Metadata | undefined {
  const slug = decodeURI(params.slug)
  const post = allPosts.find((p) => p.slug === slug)
  if (!post) {
    return
  }

  const publishedAt = new Date(post.date).toISOString()
  const modifiedAt = new Date(post.lastmod || post.date).toISOString()
  const imageList = [siteMetadata.socialBanner]
  const ogImages = imageList.map((img) => {
    return {
      url: img.includes('http') ? img : siteMetadata.siteUrl + img,
    }
  })

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: './',
      images: ogImages,
      authors: [siteMetadata.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: imageList,
    },
  }
}

export const dynamicParams = false

export const generateStaticParams = () => {
  return allPosts.map((p) => ({ slug: p.slug }))
}

export default function Page({ params }: { params: Params }) {
  const slug = decodeURI(params.slug)

  const sortedPosts = sortPosts(allPosts)
  const postIndex = sortedPosts.findIndex((p) => p.slug === slug)

  const prev = sortedPosts[postIndex + 1]
  const next = sortedPosts[postIndex - 1]
  const post = sortedPosts[postIndex]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(post.structuredData) }}
      />
      <PostSimple content={post} next={next} prev={prev}>
        <MarkdownRenderer content={post} />
      </PostSimple>
    </>
  )
}
