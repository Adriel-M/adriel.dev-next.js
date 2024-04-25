import { createHmac } from 'node:crypto'

import siteMetadata from '@/lib/siteMetadata'

export const DEFAULT_OG_TITLE = `Adriel's Thoughts`

const generateTokenForTitle = (title: string): string => {
  const hmac = createHmac('sha256', process.env.OG_SECRET ?? 'my_secret')
  hmac.update(title)
  return hmac.digest('hex')
}

export const generateOgPath = (title: string): string => {
  const token = generateTokenForTitle(title)
  const url = new URL(siteMetadata.siteUrl)
  url.pathname = 'og'
  url.searchParams.append('title', title)
  url.searchParams.append('token', token)
  return `${url.pathname}${url.search}`
}
