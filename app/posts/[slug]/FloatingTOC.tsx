'use client'

import { useEffect, useState } from 'react'

import Link from '@/components/Link'

interface TocEntry {
  /**
   * Title of the entry
   */
  title: string
  /**
   * URL that can be used to reach
   * the content
   */
  url: string
  /**
   * Nested items
   */
  items: TocEntry[]
}

const TocEntryList = ({
  activeHeadingUrl,
  isNested,
  level,
}: {
  activeHeadingUrl: string
  isNested?: boolean
  level?: TocEntry[]
}) => {
  if (!level?.length) return

  const borderCss = isNested ? 'pl-2 border-l-2 border-gray-200/25' : ''

  return (
    <ul className={borderCss}>
      {level.map((entry, index) => {
        // (if no active [say from page load], set the first as active
        // else set the active when matching the section url
        const isActive =
          (!activeHeadingUrl && !isNested && index === 0) || entry.url === activeHeadingUrl

        const activeCss = isActive ? 'text-primary-500' : ''
        return (
          <li className="list-inside list-disc" key={entry.url}>
            <Link className={'no-underline hover:text-primary-600 ' + activeCss} href={entry.url}>
              {entry.title}
            </Link>
            <TocEntryList activeHeadingUrl={activeHeadingUrl} isNested={true} level={entry.items} />
          </li>
        )
      })}
    </ul>
  )
}

const FloatingTOC = ({ toc }: { toc: TocEntry[] }) => {
  const [activeHeadingId, setActiveHeadingId] = useState('')

  const handleScroll = () => {
    const headers = document.querySelectorAll('.content-header')
    let headerId = ''
    for (const header of headers) {
      if (header.id === 'footnote-label') continue

      const rect = header.getBoundingClientRect()

      if (rect.top <= 10) {
        headerId = header.id
      }
    }

    if (headerId) {
      setActiveHeadingId(`#${headerId}`)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <div className="sticky top-20 float-right hidden h-0 px-8 text-xs w-toc-2xl lg:block xl:w-toc-4xl">
      <div className="pb-2 text-sm">Table of Contents</div>
      <TocEntryList activeHeadingUrl={activeHeadingId} level={toc} />
    </div>
  )
}

export default FloatingTOC
