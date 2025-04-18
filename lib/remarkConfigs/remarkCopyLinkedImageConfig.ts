import { RemarkCopyLinkedImageOptions } from '@/lib/remarkPlugins/RemarkCopyLinkedImage'
import siteMetadata from '@/lib/siteMetadata'

const config: RemarkCopyLinkedImageOptions = {
  destinationDir: siteMetadata.bundledImagesFolderName,
}

export default config
