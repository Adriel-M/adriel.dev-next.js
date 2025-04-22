import { imageConfigDefault } from 'next/dist/shared/lib/image-config'
import { zimg } from 'zimg'

const mediaPath = '.next/static/media'

const optimizeImages = async () => {
  await zimg({
    cwd: process.cwd(),
    pattern: `${mediaPath}/*.{jpg,jpeg,png}`,
    sizes: imageConfigDefault.deviceSizes,
    quality: 90,
  })
}

const run = async () => {
  await optimizeImages()
}

run()
