import { existsSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { basename, extname, isAbsolute, join } from 'node:path'

import { Node } from 'unist'
import { visit } from 'unist-util-visit'
import { VFile } from 'vfile'
import XXH from 'xxhashjs'

export type ImageNode = Node & {
  url: string
}

const options = {
  destinationDir: 'bundled-images',
}

const remarkCopyLinkedImage = () => {
  const bundledImageFolder = join(process.cwd(), options.destinationDir)

  return async (tree: Node, file: VFile) => {
    if (!existsSync(bundledImageFolder)) {
      await mkdir(bundledImageFolder)
    }
    const promises: Promise<void>[] = []
    visit(
      tree,
      // only visit p tags that contain an img element
      'image',
      (imageNode: ImageNode) => {
        promises.push(transformNodeToNextImage(file, bundledImageFolder, imageNode))
      }
    )
    await Promise.all(promises)
  }
}

// Hardcoded so images will have the same hash across deploys
const seed = 0xc8052e18

const generateHashFromBuffer = (buffer: Buffer): string => {
  return XXH.h32(seed).update(buffer).digest().toString(16)
}

const transformNodeToNextImage = async (
  file: VFile,
  bundledImageFolder: string,
  imageNode: ImageNode
) => {
  let imagePath: string

  if (isAbsolute(imageNode.url)) {
    imagePath = join(process.cwd(), imageNode.url)
  } else {
    imagePath = join(file.dirname!, imageNode.url)
  }

  const buffer = await readFile(imagePath)
  const hash = generateHashFromBuffer(buffer)

  const extName = extname(imagePath)
  const fileName = basename(imagePath, extName)
  const targetFileName = `${fileName}.${hash}${extName}`
  const targetFilePath = join(bundledImageFolder, targetFileName)

  if (!existsSync(targetFilePath)) {
    await writeFile(targetFilePath, buffer)
  }

  imageNode.url = join('/', options.destinationDir, targetFileName)
}

export default remarkCopyLinkedImage
