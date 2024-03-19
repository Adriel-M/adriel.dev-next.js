import { Github, Linkedin, RSS } from './icons'

const components = {
  github: Github,
  linkedin: Linkedin,
  rss: RSS,
}

type SocialIconProps = {
  kind: keyof typeof components
  href: string | undefined
  size?: number
}

const SocialIcon = ({ kind, href, size = 8 }: SocialIconProps) => {
  if (!href) return null

  const SocialSvg = components[kind]

  return (
    <a
      className="text-sm text-gray-500 transition hover:text-gray-600"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      data-umami-event={'Footer ' + kind}
    >
      <span className="sr-only">{kind}</span>
      <SocialSvg
        className={`fill-current text-gray-700 hover:text-primary-500 h-${size} w-${size}`}
      />
    </a>
  )
}

export default SocialIcon
