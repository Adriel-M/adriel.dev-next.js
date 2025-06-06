import { existsSync, mkdirSync } from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises'
import { basename, extname, isAbsolute, join } from 'node:path'

import { Node } from 'unist'
import { visit } from 'unist-util-visit'
import { VFile } from 'vfile'
import XXH from 'xxhashjs'

export type ImageNode = Node & {
  url: string
}

export interface RemarkCopyLinkedImagesOptions {
  destinationDir: string
}

// Hardcoded so images will have the same hash across deploys
const seed = 0xc8052e18

const generateHashFromBuffer = (buffer: Buffer): string => {
  return XXH.h64(seed).update(buffer).digest().toString(16)
}

const remarkCopyLinkedImages = (options: RemarkCopyLinkedImagesOptions) => {
  const bundledImageFolder = join(process.cwd(), options.destinationDir)

  if (!existsSync(bundledImageFolder)) {
    mkdirSync(bundledImageFolder)
  }

  const processImage = async (file: VFile, imageNode: ImageNode) => {
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

  return async (tree: Node, file: VFile) => {
    const promises: Promise<void>[] = []
    visit(tree, 'image', (imageNode: ImageNode) => {
      promises.push(processImage(file, imageNode))
    })
    await Promise.all(promises)
  }
}

export default remarkCopyLinkedImages
