import Logo from '@/components/Logo'
import DocSearchButton from '@/components/search/DocSearchButton'
import headerNavLinks from '@/data/headerNavLinks'
import siteMetadata from '@/data/siteMetadata'

import Link from './Link'
import MobileNav from './MobileNav'

const Header = () => {
  return (
    <header className="flex items-center justify-between py-10">
      <div>
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center justify-between hover:text-primary-500 ">
            <div className="mr-5">
              <Logo />
            </div>
            <div className="hidden h-6 text-xl font-semibold xl:block">
              {siteMetadata.headerTitle}
            </div>
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        {headerNavLinks.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            className="hidden font-medium hover:text-primary-500 sm:block"
          >
            {link.title}
          </Link>
        ))}
        <DocSearchButton />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
