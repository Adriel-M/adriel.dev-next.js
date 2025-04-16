import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

const size = {
  width: 1200,
  height: 600,
}

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

  const fontData = await readFile(join(process.cwd(), 'public/static/JetBrainsMono-Bold.ttf'))
  const backgroundImageUrl = await getBackgroundUrl()

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

const getBackgroundUrl = async (): Promise<string> => {
  const imageBuffer = await readFile(join(process.cwd(), 'public/static/og-bg.png'))
  const base64Image = imageBuffer.toString('base64')
  const mimeType = 'image/png' // or 'image/png' based on your file
  return `data:${mimeType};base64,${base64Image}`
}
