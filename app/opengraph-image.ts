import { generateOgResponse, ogContentType, ogSize } from '@/lib/GenerateOgResponse'
import siteConfig from '@/lib/siteConfig'

export const size = ogSize

export const contentType = ogContentType

export default async function Image() {
  return generateOgResponse(siteConfig.title)
}
