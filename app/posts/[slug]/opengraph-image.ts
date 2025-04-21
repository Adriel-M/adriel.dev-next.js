import { getAllPosts, getPostBySlug } from '@/lib/CollectionUtils'
import { generateOgResponse, ogContentType, ogSize } from '@/lib/GenerateOgResponse'

import { Params } from './route-utils'

export const size = ogSize

export const contentType = ogContentType

export const dynamicParams = false

export const generateStaticParams = () => {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export default async function Image(props: { params: Promise<Params> }) {
  const params = await props.params
  const slug = decodeURI(params.slug)

  const post = getPostBySlug(slug)

  return generateOgResponse(post.title)
}
