import type { Blog } from 'contentlayer/generated'
import { formatDate } from 'pliny/utils/formatDate'
import { ReactNode } from 'react'

import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import ScrollTop from '@/components/ScrollTop'
import SectionContainer from '@/components/SectionContainer'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'

interface LayoutProps {
  content: Blog
  children: ReactNode
  next?: { path: string; title: string; shortenedTitle: string }
  prev?: { path: string; title: string; shortenedTitle: string }
}

export default function PostLayout({ content, next, prev, children }: LayoutProps) {
  const { date, title, tags } = content

  return (
    <SectionContainer>
      <ScrollTop />
      <article>
        <div>
          <header>
            <div className="space-y-1 border-b border-gray-200 pb-10 text-center">
              <dl>
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500">
                    <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 xl:divide-y-0">
            <div className="divide-y divide-gray-200 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pb-8 pt-10">{children}</div>
            </div>
            <footer>
              {tags && tags.length > 0 && (
                <div className="py-4 xl:py-8">
                  <h2 className="text-xs uppercase tracking-wide text-gray-500">Tags</h2>
                  <div className="flex flex-wrap">
                    {tags.sort().map((tag) => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>
                </div>
              )}
              <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
                <div>
                  {prev && prev.path && (
                    <>
                      <div className="flex flex-col items-start">
                        <h2 className="text-xs uppercase tracking-wide text-gray-500">Previous</h2>
                        <Link
                          href={`/${prev.path}`}
                          className="hover:text-primary-500"
                          aria-label={`Previous post: ${prev.title}`}
                        >
                          &larr; {prev.shortenedTitle}
                        </Link>
                      </div>
                    </>
                  )}
                </div>
                <div>
                  {next && next.path && (
                    <>
                      <div className="flex flex-col items-start pt-3 sm:items-end sm:pt-0">
                        <h2 className="text-xs uppercase tracking-wide text-gray-500">Next</h2>
                        <Link
                          href={`/${next.path}`}
                          className="hover:text-primary-500"
                          aria-label={`Next post: ${next.title}`}
                        >
                          {next.shortenedTitle} &rarr;
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
