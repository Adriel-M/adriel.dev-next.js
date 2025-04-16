import { notFound, redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

import images from '@/lib/Images'

export async function GET(_: NextRequest, props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params
  const imagePath = ['/images', ...params.slug].join('/')
  const newImagePath = images[imagePath]

  if (!newImagePath) {
    notFound()
  }

  redirect(newImagePath)
}
