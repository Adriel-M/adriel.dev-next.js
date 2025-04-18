import { zimg } from 'zimg'

const mediaPath = '.next/static/media'

const optimizeImages = async () => {
  await zimg({
    cwd: process.cwd(),
    pattern: `${mediaPath}/*.{jpg,jpeg,png}`,
    sizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    quality: 100,
  })
}

const run = async () => {
  await optimizeImages()
}

run()
