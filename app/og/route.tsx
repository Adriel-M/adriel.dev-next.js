import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

const size = {
  width: 1200,
  height: 600,
}

const isProduction = process.env.NODE_ENV === 'production'

export async function GET(req: NextRequest) {
  const postTitle = getTitle(req)
  const backgroundImageUrl = getBackgroundUrl(req)

  const font = fetch(new URL('./JetBrainsMono-Bold.ttf', import.meta.url)).then((res) =>
    res.arrayBuffer()
  )
  const fontData = await font

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
            {postTitle}
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

const getTitle = (req: NextRequest): string => {
  const { searchParams } = req.nextUrl
  const fromParams = searchParams.get('title')
  if (fromParams) {
    return decodeURI(fromParams)
  }

  return `Adriel's Thoughts`
}

const getBackgroundUrl = (req: NextRequest): string => {
  const host = req.headers.get('host')

  const protocol = isProduction ? 'https' : 'http'
  return `${protocol}://${host}/static/images/og-bg.png`
}
