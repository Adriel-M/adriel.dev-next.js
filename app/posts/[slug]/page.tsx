import '@/css/user-content.css'

import { Metadata } from 'next'

import PostSimple from '@/app/posts/[slug]/PostSimple'
import { MDXContent } from '@/components/mdx-content'
import { getAllPosts, getPostBySlug } from '@/lib/CollectionUtils'
import siteMetadata from '@/lib/siteMetadata'

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

  const ogImage = [`/og?title=${encodeURI(post.title)}`]

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
      images: ogImage,
      authors: [siteMetadata.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: ogImage,
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
        <MDXContent content={post} />
      </PostSimple>
    </>
  )
}
