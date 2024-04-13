import Script from 'next/script'

import siteMetadata from '@/lib/siteMetadata'

const isProduction = process.env.NODE_ENV === 'production'

const UmamiAnalytics = () => {
  const { umamiWebsiteId, src } = siteMetadata.analytics.umamiAnalytics
  return (
    <>
      {isProduction && umamiWebsiteId && src && (
        <Script defer data-website-id={umamiWebsiteId} src={src} />
      )}
    </>
  )
}

export default UmamiAnalytics
