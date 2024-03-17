import { Parent, Node } from 'unist'
import { visit } from 'unist-util-visit'
import { sync as sizeOf } from 'probe-image-size'
import fs from 'fs'
import { ImageNode } from 'pliny/mdx-plugins/index.js'

// copy of remarkImgToJsx from pliny but changing the path from public... to
// image...
export const remarkImgToJsx = () => {
  return (tree: Node) => {
    visit(
      tree,
      // only visit p tags that contain an img element
      (node: Parent): node is Parent =>
        node.type === 'paragraph' && node.children.some((n) => n.type === 'image'),
      (node: Parent) => {
        const imageNodeIndex = node.children.findIndex((n) => n.type === 'image')
        const imageNode = node.children[imageNodeIndex] as ImageNode

        const path = process.cwd() + imageNode.url
        // only local files
        if (fs.existsSync(path)) {
          const dimensions = sizeOf(fs.readFileSync(path))

          // Convert original node to next/image
          ;(imageNode.type = 'mdxJsxFlowElement'),
            (imageNode.name = 'Image'),
            (imageNode.attributes = [
              { type: 'mdxJsxAttribute', name: 'alt', value: imageNode.alt },
              { type: 'mdxJsxAttribute', name: 'src', value: imageNode.url },
              { type: 'mdxJsxAttribute', name: 'width', value: dimensions!.width },
              { type: 'mdxJsxAttribute', name: 'height', value: dimensions!.height },
            ])
          // Change node type from p to div to avoid nesting error
          node.type = 'div'
          node.children[imageNodeIndex] = imageNode
        }
      }
    )
  }
}
