import { zimg } from 'zimg'

const mediaPath = '.next/static/media'

const optimizeImages = async () => {
  await zimg({
    cwd: process.cwd(),
    pattern: `${mediaPath}/*.{jpg,jpeg,png}`,
    sizes: [160, 320, 480, 640, 960, 1280, 2560, 3840],
    quality: 100,
  })
}

const run = async () => {
  await optimizeImages()
}

run()
