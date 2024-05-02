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

const TocEntryList = ({ level }: { level?: TocEntry[] }) => {
  if (!level?.length) return

  return (
    <ul className="pl-2">
      {level.map((entry) => {
        return (
          <li className="list-disc" key={entry.url}>
            <Link className="no-underline hover:text-primary-500" href={entry.url}>
              {entry.title}
            </Link>
            <TocEntryList level={entry.items} />
          </li>
        )
      })}
    </ul>
  )
}

const FloatingTOC = ({ toc }: Props) => {
  return (
    <div className="sticky top-20 hidden h-0 w-52 text-xs lg:block">
      <TocEntryList level={toc} />
    </div>
  )
}

export default FloatingTOC
