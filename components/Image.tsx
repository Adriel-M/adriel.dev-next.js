import NextImage, { ImageProps } from 'next/image'
import RequireContext = __WebpackModuleApi.RequireContext

const importFromFolder = (
  context: RequireContext
): { [key: string]: { default: { src: string } } } => {
  const images = {}

  for (const key of context.keys()) {
    // keys are duplicated in a sense that there are two keys for the same image
    // one with a relative path inside images folder and the other with images
    // folder a prefix
    if (key.startsWith('images')) continue

    const newKey = key.replace('./', '/images/')
    images[newKey] = context(key)
  }

  return images
}

const getImages = () => {
  const keyToModule = importFromFolder(require.context('../images', true, /\.(png|jpe?g|svg)$/))
  const keyToPath: { [key: string]: string } = {}

  for (const [key, value] of Object.entries(keyToModule)) {
    keyToPath[key] = value.default.src
  }

  return keyToPath
}

const images = getImages()

const Image = ({ ...rest }: ImageProps) => {
  let imageSrc = rest.src
  if (typeof imageSrc === 'string' && imageSrc.startsWith('/images/')) {
    // do a static import since we're not putting images in the public folder
    imageSrc = images[imageSrc]
  }
  return <NextImage {...rest} src={imageSrc} />
}

export default Image
