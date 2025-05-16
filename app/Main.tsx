import Link from '@/components/Link'
import NormalPageHeading from '@/components/NormalPageHeading'
import { formatDate } from '@/lib/PlinyUtils'
import siteConfig from '@/lib/siteConfig'
import { generatePostsPath, URLS } from '@/lib/UrlLibs'
import { Post } from '#veliteContent'

interface Props {
  posts: Post[]
}

export default function Home({ posts }: Props) {
  return (
    <>
      <div className="divide-y divide-gray-200">
        <NormalPageHeading title={siteConfig.description} tagline="Latest posts" />
        <ul>
          {!posts.length && 'No posts found.'}
          {posts.slice(0, siteConfig.postsInFrontPageCount).map((post) => {
            const { slug, createdAt, title } = post
            return (
              <li key={slug} className="py-4">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500">
                        <time dateTime={createdAt}>{formatDate(createdAt, siteConfig.locale)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-xl font-bold leading-8 tracking-tight">
                            <Link
                              href={generatePostsPath(post)}
                              className="text-gray-900 hover:text-primary-500"
                            >
                              {title}
                            </Link>
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > siteConfig.postsInFrontPageCount && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link href={URLS.POSTS} className="hover:text-primary-500" aria-label="All posts">
            All Posts &rarr;
          </Link>
        </div>
      )}
    </>
  )
}
