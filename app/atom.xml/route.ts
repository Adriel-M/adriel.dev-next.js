import getFeed from '@/lib/Rss'

export async function GET() {
  const feed = getFeed()
  return new Response(feed.atom1(), {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
