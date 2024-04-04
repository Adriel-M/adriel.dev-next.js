import { ImageLoader } from 'next/image'

const CustomLoader: ImageLoader = ({ src, width, quality }) => {
  if (process.env.NODE_ENV !== 'production') return src + '?dev'
  // do not optimize svgs and gifs
  if (/\.(svg|gif)$/.test(src)) return src + '?uo'
  // pre-optimize images with zimg in production build
  if (/^\//.test(src)) return src.replace(/\.[a-z]+$/i, `.${width}.webp`)
  return `${src}?w=${width}&q=${quality ?? 75}`
}

export default CustomLoader
