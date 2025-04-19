import { RemarkCopyLinkedImagesOptions } from '@/lib/remarkPlugins/RemarkCopyLinkedImages'
import siteConfig from '@/lib/siteConfig'

const config: RemarkCopyLinkedImagesOptions = {
  destinationDir: siteConfig.bundledImagesFolderName,
}

export default config
