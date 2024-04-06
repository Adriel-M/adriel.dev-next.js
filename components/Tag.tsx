import Link from '@/components/Link'
import { SluggedTag } from '@/lib/SluggedTag'

interface Props {
  sluggedTag: SluggedTag
}

const Tag = ({ sluggedTag }: Props) => {
  return (
    <Link
      href={`/tags/${sluggedTag.tag}`}
      className="mr-3 mt-1 text-sm font-medium uppercase text-primary-500 underline hover:text-primary-600"
    >
      #{sluggedTag.tag}
    </Link>
  )
}

export default Tag
