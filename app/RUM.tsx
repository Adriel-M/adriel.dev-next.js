import Script from 'next/script'

const isProduction = process.env.NODE_ENV === 'production'
const cfBeacon = process.env.CF_BEACON

const RUM = () => {
  return isProduction && cfBeacon && <Script defer src="/rum" data-cf-beacon={cfBeacon} />
}

export default RUM
