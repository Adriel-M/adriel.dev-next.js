import { RemarkCopyLinkedImageOptions } from '@/lib/remarkPlugins/RemarkCopyLinkedImage'
import siteConfig from '@/lib/siteConfig'

const config: RemarkCopyLinkedImageOptions = {
  destinationDir: siteConfig.bundledImagesFolderName,
}

export default config
