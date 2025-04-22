import { ImageLoader } from 'next/image'

const svgGifRegex = /\.(svg|gif)$/
const extPattern = /\.[a-z]+$/i

const CustomLoader: ImageLoader = ({ src, width }) => {
  if (process.env.NODE_ENV !== 'production') return src + '?dev'
  // do not optimize svgs and gifs
  if (svgGifRegex.test(src)) return src + '?uo'
  // pre-optimize images with zimg in production build
  return src.replace(extPattern, `.${width}.webp`)
}

export default CustomLoader
