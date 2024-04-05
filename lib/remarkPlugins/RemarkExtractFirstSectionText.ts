import { Node, Parent } from 'unist'
import { visit } from 'unist-util-visit'
const remarkExtractFirstSectionText = () => {
  return (tree: Parent) => {
    const paragraphNodes: Node[] = []
    visit(tree, 'paragraph', (node: Node, index: number, parent: Parent) => {
      if (paragraphNodes.length > 0) return

      // get me all the children until the next heading
      for (let i = index; i < parent.children.length; i++) {
        if (parent.children[i].type === 'heading') break

        paragraphNodes.push(parent.children[i])
      }
    })

    if (paragraphNodes) {
      tree.type = 'root'
      tree.children = paragraphNodes
    }
  }
}

export default remarkExtractFirstSectionText
