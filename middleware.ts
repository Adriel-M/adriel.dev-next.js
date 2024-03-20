import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import images from '@/core/Images'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const newImagePath = images[request.nextUrl.pathname]

  if (!newImagePath) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  const url = request.nextUrl.clone()
  url.pathname = newImagePath
  return NextResponse.redirect(url)
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/images/:path*',
}
