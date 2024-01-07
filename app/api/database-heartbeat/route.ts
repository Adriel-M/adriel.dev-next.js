import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const runtime = 'edge' // 'nodejs' is the default

export async function GET(request: NextRequest) {
  const statsPath = 'https://' + request.nextUrl.hostname + '/stats/api/send'
  const response = await fetch(statsPath, {
    method: 'POST',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0a',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: 'event',
      payload: {
        website: process.env.NEXT_UMAMI_ID,
        hostname: request.nextUrl.hostname,
        url: '/databaseHeartbeat',
      },
    }),
  })
  const body = await response.text()
  return NextResponse.json(
    {
      body,
      nextUrl: request.nextUrl.basePath,
      query: request.nextUrl.search,
      cookies: request.cookies.getAll(),
    },
    {
      status: 200,
    }
  )
}
