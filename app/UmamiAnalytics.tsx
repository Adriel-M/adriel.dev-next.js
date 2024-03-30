import Script from 'next/script'

const isProduction = process.env.NODE_ENV === 'production'

interface Props {
  websiteId?: string
  scriptPath?: string
}
const UmamiAnalytics = ({ websiteId, scriptPath }: Props) => {
  return (
    <>
      {isProduction && websiteId && scriptPath && (
        <Script defer data-website-id={websiteId} src={scriptPath} />
      )}
    </>
  )
}

export default UmamiAnalytics
