import FooterYear from '@/components/FooterYear'
import SocialIcon from '@/components/social-icons'
import siteConfig from '@/lib/siteConfig'
import { URLS } from '@/lib/UrlLibs'

import Link from './Link'

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-4 flex space-x-4">
          <SocialIcon kind="github" href={siteConfig.github} size={6} />
          <SocialIcon kind="linkedin" href={siteConfig.linkedin} size={6} />
          <SocialIcon kind="rss" href={URLS.RSS} size={6} />
        </div>
        <div className="mb-8 flex space-x-2 text-sm text-gray-500">
          <FooterYear />
          <div>{` • `}</div>
          <div>Adriel Martinez</div>
          <div>{` • `}</div>
          <Link
            className="hover:text-primary-500"
            href="https://creativecommons.org/licenses/by/4.0/"
          >
            CC BY 4.0
          </Link>
        </div>
      </div>
    </footer>
  )
}
