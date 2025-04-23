import NextImage, { ImageProps } from 'next/image'

import images from '@/lib/Images'
import siteConfig from '@/lib/siteConfig'

const Image = ({ src, ...rest }: ImageProps) => {
  let imageSrc = src
  // serve the bundled image since we're not serving from the public folder
  if (
    typeof imageSrc === 'string' &&
    imageSrc.startsWith(`/${siteConfig.bundledImagesFolderName}`)
  ) {
    imageSrc = images[imageSrc]
  }
  return <NextImage {...rest} src={imageSrc} />
}

export default Image
