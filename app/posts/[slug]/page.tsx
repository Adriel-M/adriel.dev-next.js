import '@/css/user-content.css'

import { Metadata } from 'next'

import PostSimple from '@/app/posts/[slug]/PostSimple'
import { MDXContent } from '@/components/mdx-content'
import { getAllPosts, getPostBySlug } from '@/lib/CollectionUtils'

interface Params {
  slug: string
}

export async function generateMetadata(props: { params: Promise<Params> }): Promise<Metadata> {
  const params = await props.params
  const slug = decodeURI(params.slug)
  const post = getPostBySlug(slug)
  return post.metadata
}

export const dynamicParams = false

export const generateStaticParams = () => {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export default async function Page(props: { params: Promise<Params> }) {
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
