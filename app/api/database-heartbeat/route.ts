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
        url: '/databaseHeartbeatCron',
      },
    }),
  })
  return NextResponse.json(
    {
      heartbeatStatusCode: response.status,
    },
    {
      status: 200,
    }
  )
}
