import PageTitle from '@/components/PageTitle'

interface Props {
  title: string
  tagline: string
}

export default function NormalPageHeading({ title, tagline }: Props) {
  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <PageTitle>{title}</PageTitle>
      <p className="text-lg leading-7 text-gray-500">{tagline}</p>
    </div>
  )
}
