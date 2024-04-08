import '@/css/user-content.css'

import { Metadata } from 'next'

import { VeliteMarkdownRenderer } from '@/components/VeliteMarkdownRenderer'
import siteMetadata from '@/data/siteMetadata'
import PostSimple from '@/layouts/PostSimple'
import { getAllPosts, getPostBySlug } from '@/lib/CollectionUtils'

interface Params {
  slug: string
}

export function generateMetadata({ params }: { params: Params }): Metadata | undefined {
  const slug = decodeURI(params.slug)
  const post = getPostBySlug(slug)
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
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export default function Page({ params }: { params: Params }) {
  const slug = decodeURI(params.slug)

  const post = getPostBySlug(slug)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(post.structuredData) }}
      />
      <PostSimple content={post}>
        <VeliteMarkdownRenderer content={post} />
      </PostSimple>
    </>
  )
}
