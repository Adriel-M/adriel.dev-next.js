import '@/css/user-content.css'

import { Metadata } from 'next'

import { RouteUtils } from '@/app/posts/[slug]/route-utils'
import { MDXContent } from '@/components/mdx-content'
import PostSimple from '@/components/page-display/BlogPostPage'
import { getAllPosts, getPostBySlug } from '@/lib/CollectionUtils'

export async function generateMetadata(props: { params: Promise<RouteUtils> }): Promise<Metadata> {
  const params = await props.params
  const slug = decodeURI(params.slug)
  const post = getPostBySlug(slug)
  return post.metadata
}

export const dynamicParams = false

export const generateStaticParams = () => {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export default async function Page(props: { params: Promise<RouteUtils> }) {
  const params = await props.params
  const slug = decodeURI(params.slug)

  const post = getPostBySlug(slug)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(post.jsonLd) }}
      />
      <PostSimple content={post}>
        <MDXContent content={post} />
      </PostSimple>
    </>
  )
}
