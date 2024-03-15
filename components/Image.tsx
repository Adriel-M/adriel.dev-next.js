import NextImage, { ImageProps, StaticImageData } from 'next/image'

const Image = ({ ...rest }: ImageProps) => {
  const src: StaticImageData = {
    src: rest.src as string,
    height: rest.height as number,
    width: rest.width as number,
  }
  const newProps: ImageProps = {
    ...rest,
    src,
  }
  return <NextImage {...newProps} />
}

export default Image
