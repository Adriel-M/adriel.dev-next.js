import NextImage, { ImageProps } from 'next/image'
import test from '../public/static/images/cockroach-multiregion-demo/client.png'

const Image = ({ ...rest }: ImageProps) => {
  return <NextImage {...rest} src={test} />
}

export default Image
