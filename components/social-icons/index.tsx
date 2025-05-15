import Link from '@/components/Link'

import { Github, Linkedin, RSS } from './icons'

const components = {
  github: Github,
  linkedin: Linkedin,
  rss: RSS,
}

interface SocialIconProps {
  kind: keyof typeof components
  href: string | undefined
  size?: number
}

const SocialIcon = ({ kind, href, size = 8 }: SocialIconProps) => {
  if (!href) return null

  const SocialSvg = components[kind]

  return (
    <Link className="text-sm text-gray-500 transition hover:text-gray-600" href={href}>
      <span className="sr-only">{kind}</span>
      <SocialSvg
        className={`fill-current text-gray-700 hover:text-primary-500 h-${size} w-${size}`}
      />
    </Link>
  )
}

export default SocialIcon
