import NextImage, { ImageProps } from 'next/image'
import RequireContext = __WebpackModuleApi.RequireContext

const importAll = (context: RequireContext): { [key: string]: { default: { src: string } } } => {
  const images = {}

  for (const key of context.keys()) {
    const newKey = '/images/' + key.replace('./', '')
    images[newKey] = context(key)
  }

  return images
}

const getImages = () => {
  const keyToModule = importAll(require.context('../images', true, /\.(png|jpe?g|svg)$/))
  const keyToPath: { [key: string]: string } = {}

  for (const [key, value] of Object.entries(keyToModule)) {
    keyToPath[key] = value.default.src
  }

  return keyToPath
}

const images = getImages()

const Image = ({ ...rest }: ImageProps) => {
  const imageSrc = images[rest.src as string]
  return <NextImage {...rest} src={imageSrc} />
}

export default Image
