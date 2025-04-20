import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { ImageResponse } from 'next/og'

export const ogSize = {
  width: 1200,
  height: 600,
}

export const ogContentType = 'image/png'

const libOgPath = 'public/static'

const getBackgroundUrl = async (): Promise<string> => {
  const imageBuffer = await readFile(join(process.cwd(), libOgPath, 'og-bg.png'))
  const base64Image = imageBuffer.toString('base64')
  const mimeType = 'image/png' // or 'image/png' based on your file
  return `data:${mimeType};base64,${base64Image}`
}

export const generateOgResponse = async (title: string): Promise<ImageResponse> => {
  const fontData = await readFile(join(process.cwd(), libOgPath, 'JetBrainsMono-Bold.ttf'))
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
            {title}
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
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
