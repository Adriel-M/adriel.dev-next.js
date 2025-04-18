import RequireContext = __WebpackModuleApi.RequireContext
const importFromFolder = (context: RequireContext) => {
  const images: Record<string, { default: { src: string } }> = {}

  for (const key of context.keys()) {
    // keys are duplicated in a sense that there are two keys for the same image
    // one with a relative path inside images folder and the other with images
    // folder a prefix
    if (!key.startsWith('bundled-images/')) continue

    const newKey = '/' + key
    images[newKey] = context(key)
  }

  return images
}

const getImages = () => {
  const keyToModule = importFromFolder(
    require.context('../bundled-images', true, /\.(png|jpe?g|svg|webp)$/)
  )
  const keyToPath: Record<string, string> = {}

  for (const [key, value] of Object.entries(keyToModule)) {
    keyToPath[key] = value.default.src
  }

  return keyToPath
}

export default getImages()
