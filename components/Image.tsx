import NextImage, { ImageProps } from 'next/image'

import images from '@/lib/Images'
import siteMetadata from '@/lib/siteMetadata'

const Image = ({ ...rest }: ImageProps) => {
  let imageSrc = rest.src
  if (
    typeof imageSrc === 'string' &&
    imageSrc.startsWith(`/${siteMetadata.bundledImagesFolderName}`)
  ) {
    // do a static import since we're not putting images in the public folder
    imageSrc = images[imageSrc]
  }
  return <NextImage {...rest} src={imageSrc} />
}

export default Image
