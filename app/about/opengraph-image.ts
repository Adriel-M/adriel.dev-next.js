import { generateOgResponse, ogContentType, ogSize } from '@/lib/GenerateOgResponse'

import { title } from './route-utils'

export const size = ogSize

export const contentType = ogContentType

export default async function Image() {
  return generateOgResponse(title)
}
