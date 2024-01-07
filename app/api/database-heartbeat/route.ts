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
        website: '163e9f9d-1c0f-4f74-b254-a7d5be036c28',
        hostname: 'adriel.dev',
        url: '/finalAgain',
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
