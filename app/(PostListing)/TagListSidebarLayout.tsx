import { ReactNode } from 'react'

import Link from '@/components/Link'
import { getTagCounts } from '@/lib/CollectionUtils'
import { SluggedTag } from '@/lib/SluggedTag'
import { generateTagsPath } from '@/lib/UtlLibs'

const ON_CURRENT_PAGE = 'text-primary-500 hover:text-primary-600'
const NOT_CURRENT_PAGE = 'text-gray-700 hover:text-primary-500'

function compareTagsByCountThenAlpha(
  tagCounts: Record<string, number>
): (a: string, b: string) => number {
  return function (a, b): number {
    return tagCounts[b] - tagCounts[a] || a.localeCompare(b)
  }
}

interface Props {
  currentTag?: SluggedTag
  children: ReactNode
}

export default function TagListSidebarLayout({ currentTag = undefined, children }: Props) {
  const tagKeys = Object.keys(getTagCounts())
  const sortedTags = tagKeys
    .sort(compareTagsByCountThenAlpha(getTagCounts()))
    .map((t) => new SluggedTag(t))

  let title: string
  let allPostsCss: string

  if (currentTag) {
    allPostsCss = NOT_CURRENT_PAGE
    title = currentTag.tag[0].toUpperCase() + currentTag.tag.split(' ').join('-').slice(1)
  } else {
    allPostsCss = ON_CURRENT_PAGE
    title = 'All Posts'
  }

  return (
    <>
      <div>
        <div className="pb-6 pt-6">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:hidden sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
        </div>
        <div className="flex sm:space-x-24">
          <div className="shadow-md/70/40 hidden h-full max-h-screen min-w-[280px] max-w-[280px] flex-wrap overflow-auto rounded bg-gray-50 pt-5 sm:flex">
            <div className="px-6 py-4">
              <Link href={`/posts`} className={`${allPostsCss} font-bold uppercase`}>
                All Posts
              </Link>
              <ul>
                {sortedTags.map((t) => {
                  const tagCss = currentTag?.tag === t.tag ? ON_CURRENT_PAGE : NOT_CURRENT_PAGE
                  return (
                    <li key={t.tag} className="my-3">
                      <Link
                        href={generateTagsPath(t)}
                        className={`${tagCss} px-3 py-2 text-sm font-medium uppercase`}
                        aria-label={`View posts tagged ${t.tag}`}
                      >
                        {`${t.tag} (${getTagCounts()[t.tag]})`}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          {children}
        </div>
      </div>
    </>
  )
}
