import { ReactNode } from 'react'

import FloatingTOC from '@/app/posts/[slug]/FloatingTOC'
import PageTitle from '@/components/PageTitle'
import Tag from '@/components/Tag'
import { sortTagsByAlpha } from '@/lib/CollectionUtils'
import { formatDate } from '@/lib/PlinyUtils'
import siteMetadata from '@/lib/siteMetadata'
import { Post } from '#veliteContent'

interface LayoutProps {
  content: Post
  children: ReactNode
}

export default function PostLayout({ content, children }: LayoutProps) {
  const { date, title, tags, toc } = content

  return (
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
              {tags.length > 0 && (
                <div className="align-center flex flex-wrap justify-center pt-2">
                  {sortTagsByAlpha(tags).map((sluggedTag) => (
                    <Tag key={sluggedTag.tag} sluggedTag={sluggedTag} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>
        <FloatingTOC toc={toc} />
        <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 xl:divide-y-0">
          <div className="divide-y divide-gray-200 xl:col-span-3 xl:row-span-2 xl:pb-0">
            <div id="article-body" className="prose max-w-none pb-4 pt-10">
              {children}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
