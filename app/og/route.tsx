import { NextRequest } from 'next/server'

import { generateOgResponse } from '@/lib/og/GenerateOgResponse'

const key = crypto.subtle.importKey(
  'raw',
  new TextEncoder().encode(process.env.OG_SECRET ?? 'my_secret'),
  { name: 'HMAC', hash: { name: 'SHA-256' } },
  false,
  ['sign']
)

const toHex = (arrayBuffer: ArrayBuffer): string => {
  return Array.prototype.map
    .call(new Uint8Array(arrayBuffer), (n) => n.toString(16).padStart(2, '0'))
    .join('')
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const title = searchParams.get('title')
  const token = searchParams.get('token')
  if (!title || !token) {
    return new Response('Missing parameters', { status: 400 })
  }
  const decodedTitle = decodeURI(title)
  const decodedToken = decodeURI(token)

  if (!(await verifyTitleAndToken(decodedTitle, decodedToken))) {
    return new Response('Invalid token', { status: 401 })
  }

  return generateOgResponse(decodedTitle)
}

const verifyTitleAndToken = async (title: string, token: string): Promise<boolean> => {
  const decrypted = toHex(
    await crypto.subtle.sign('HMAC', await key, new TextEncoder().encode(title))
  )
  return decrypted === token
}
