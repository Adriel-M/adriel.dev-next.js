import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

import images from '@/lib/Images'

export const runtime = 'edge'

const size = {
  width: 1200,
  height: 600,
}

const isProduction = process.env.NODE_ENV === 'production'

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

  const backgroundImageUrl = getBackgroundUrl(req)

  const response = await fetch(new URL('./JetBrainsMono-Bold.ttf', import.meta.url))
  const fontData = await response.arrayBuffer()

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          backgroundImage: `url(${backgroundImageUrl})`,
        }}
      >
        <div
          style={{
            width: '800px',
            height: '350px',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            display: 'flex',
          }}
        >
          <div
            style={{
              fontSize: 50,
              fontFamily: 'Jetbrains Mono',
              letterSpacing: '-0.05em',
              fontStyle: 'normal',
              color: 'black',
              whiteSpace: 'pre-wrap',
              display: 'flex',
              marginLeft: 100,
              marginRight: 100,
            }}
          >
            {decodedTitle}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Jetbrains Mono',
          data: fontData,
          style: 'normal',
          weight: 900,
        },
      ],
    }
  )
}

const verifyTitleAndToken = async (title: string, token: string): Promise<boolean> => {
  const decrypted = toHex(
    await crypto.subtle.sign('HMAC', await key, new TextEncoder().encode(title))
  )
  return decrypted === token
}

const getBackgroundUrl = (req: NextRequest): string => {
  const host = req.headers.get('host')
  const path = images['/images/og-bg.png']

  const protocol = isProduction ? 'https' : 'http'
  return `${protocol}://${host}${path}`
}
