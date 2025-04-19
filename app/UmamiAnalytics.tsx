import Script from 'next/script'

import siteConfig from '@/lib/siteConfig'

const isProduction = process.env.NODE_ENV === 'production'

const UmamiAnalytics = () => {
  const { umamiWebsiteId, src } = siteConfig.analytics.umamiAnalytics
  return (
    <>
      {isProduction && umamiWebsiteId && src && (
        <Script defer data-website-id={umamiWebsiteId} src={src} />
      )}
    </>
  )
}

export default UmamiAnalytics
