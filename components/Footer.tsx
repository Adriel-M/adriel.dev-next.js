import SocialIcon from '@/components/social-icons'
import siteMetadata from '@/data/siteMetadata'

import Link from './Link'

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <SocialIcon kind="github" href={siteMetadata.github} size={6} />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
          <SocialIcon kind="rss" href="/rss.xml" size={6} />
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500">
          <div>
            Logo from{' '}
            <Link className="hover:text-primary-500" href="https://github.com/twitter/twemoji">
              Twemoji
            </Link>
          </div>
          <div>{` • `}</div>
          <Link
            className="hover:text-primary-500"
            href="https://creativecommons.org/licenses/by/4.0/"
          >
            CC BY 4.0
          </Link>
        </div>
        <div className="mb-8 flex space-x-2 text-sm text-gray-500">
          <div>{`© ${new Date().getFullYear()}`}</div>
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
