import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { sortTagsByAlpha } from '@/lib/CollectionUtils'
import { formatDate } from '@/lib/PlinyUtils'
import { Post } from '#veliteContent'

export interface PaginationProps {
  totalPages: number
  currentPage: number
  basePath: string
}

function Pagination({ totalPages, currentPage, basePath }: PaginationProps) {
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            className="hover:text-primary-500"
            href={currentPage - 1 === 1 ? basePath : `${basePath}/page/${currentPage - 1}`}
            rel="prev"
            scroll={false}
          >
            Previous
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            Next
          </button>
        )}
        {nextPage && (
          <Link
            className="hover:text-primary-500"
            href={`${basePath}/page/${currentPage + 1}`}
            rel="next"
            scroll={false}
          >
            Next
          </Link>
        )}
      </nav>
    </div>
  )
}

interface Props {
  postsToDisplay: Post[]
  pagination?: PaginationProps
}

export default function BodyContent({ postsToDisplay, pagination }: Props) {
  return (
    <div>
      <ul>
        {postsToDisplay.map((post) => {
          const { path, date, title, summary, tags } = post
          return (
            <li key={path} className="py-5">
              <article className="flex flex-col space-y-2 xl:space-y-0">
                <dl>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500">
                    <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                  </dd>
                </dl>
                <div className="space-y-3">
                  <div>
                    <h2 className="text-2xl font-bold leading-8 tracking-tight">
                      <Link href={`/${path}`} className="text-gray-900 hover:text-primary-500">
                        {title}
                      </Link>
                    </h2>
                    <div className="flex flex-wrap">
                      {sortTagsByAlpha(tags).map((sluggedTag) => (
                        <Tag key={sluggedTag.tag} sluggedTag={sluggedTag} />
                      ))}
                    </div>
                  </div>
                  <div className="prose max-w-none text-gray-500">{summary}</div>
                </div>
              </article>
            </li>
          )
        })}
      </ul>
      {pagination && pagination.totalPages > 1 && <Pagination {...pagination} />}
    </div>
  )
}
