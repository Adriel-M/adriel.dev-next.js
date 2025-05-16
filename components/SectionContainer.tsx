import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function SectionContainer({ children }: Props) {
  return <section className="mx-auto max-w-2xl px-6 md:px-2 xl:max-w-5xl">{children}</section>
}
