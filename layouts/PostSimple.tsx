import { ReactNode } from 'react'

import PageTitle from '@/components/PageTitle'
import ScrollTop from '@/components/ScrollTop'
import SectionContainer from '@/components/SectionContainer'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { sortTagsByAlpha } from '@/lib/CollectionUtils'
import { formatDate } from '@/lib/PlinyUtils'
import { Post } from '#veliteContent'

interface LayoutProps {
  content: Post
  children: ReactNode
}

export default function PostLayout({ content, children }: LayoutProps) {
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
              <div id="article-body" className="prose max-w-none pb-8 pt-10">
                {children}
              </div>
            </div>
            <footer>
              {tags && tags.length > 0 && (
                <div className="py-4 xl:py-8">
                  <h2 className="text-xs uppercase tracking-wide text-gray-500">Tags</h2>
                  <div className="flex flex-wrap">
                    {sortTagsByAlpha(tags).map((sluggedTag) => (
                      <Tag key={sluggedTag.tag} sluggedTag={sluggedTag} />
                    ))}
                  </div>
                </div>
              )}
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
