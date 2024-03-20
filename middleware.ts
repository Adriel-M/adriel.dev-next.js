import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import images from '@/core/Images'

export function middleware(request: NextRequest) {
  const newImagePath = images[request.nextUrl.pathname]

  if (!newImagePath) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  url.pathname = newImagePath
  return NextResponse.redirect(url, 301)
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/images/:path*',
}
