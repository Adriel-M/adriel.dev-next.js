import { generateOgResponse, ogContentType, ogSize } from '@/lib/GenerateOgResponse'

import { Params } from './route-utils'

export const size = ogSize

export const contentType = ogContentType

export default async function Image(props: { params: Promise<Params> }) {
  const params = await props.params

  return generateOgResponse(params.tag)
}
