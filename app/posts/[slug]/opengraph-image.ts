import { RouteUtils } from '@/app/posts/[slug]/route-utils'
import { getPostBySlug } from '@/lib/CollectionUtils'
import { generateOgResponse, ogContentType, ogSize } from '@/lib/og/GenerateOgResponse'

export const size = ogSize

export const contentType = ogContentType

export default async function Image(props: { params: Promise<RouteUtils> }) {
  const params = await props.params
  const slug = decodeURI(params.slug)

  const post = getPostBySlug(slug)

  return generateOgResponse(post.title)
}
