import { notFound, redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

import images from '@/lib/Images'

export const runtime = 'edge'

export function GET(_: NextRequest, { params }: { params: { slug: string[] } }) {
  const imagePath = ['/images', ...params.slug].join('/')
  const newImagePath = images[imagePath]

  if (!newImagePath) {
    throw notFound()
  }

  redirect(newImagePath)
}
