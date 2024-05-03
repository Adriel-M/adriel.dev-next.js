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

interface Props {
  toc: TocEntry[]
}

const TocEntryList = ({ isNested, level }: { isNested?: boolean; level?: TocEntry[] }) => {
  if (!level?.length) return

  const borderCss = isNested ? 'pl-2 border-l-2 border-gray-200/25' : ''

  return (
    <ul className={borderCss}>
      {level.map((entry) => {
        return (
          <li className="list-inside list-disc" key={entry.url}>
            <Link className="no-underline hover:text-primary-500" href={entry.url}>
              {entry.title}
            </Link>
            <TocEntryList isNested={true} level={entry.items} />
          </li>
        )
      })}
    </ul>
  )
}

const FloatingTOC = ({ toc }: Props) => {
  return (
    <div className="sticky top-20 hidden h-0 px-8 text-xs w-toc-2xl lg:block xl:w-toc-4xl">
      <div className="pb-2 text-sm underline underline-offset-4">Table of Contents</div>
      <TocEntryList level={toc} />
    </div>
  )
}

export default FloatingTOC
