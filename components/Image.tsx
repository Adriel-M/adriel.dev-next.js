import NextImage, { ImageProps } from 'next/image'
import test from './main.png'

const Image = ({ ...rest }: ImageProps) => {
  return <NextImage {...rest} src={test} />
}

export default Image
