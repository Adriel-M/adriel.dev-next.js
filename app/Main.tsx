import Link from '@/components/Link'
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
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Latest
          </h1>
          <p className="text-lg leading-7 text-gray-500">{siteConfig.description}</p>
        </div>
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
