import { Text } from 'hast'
import { titleCase } from 'title-case'
import { Node, Parent } from 'unist'
import { visit } from 'unist-util-visit'

const remarkTitleCase = () => {
  return (tree: Node) => {
    visit(tree, 'heading', (node: Parent) => {
      const textNode = node.children.find((n) => n.type === 'text') as Text | undefined

      if (textNode) {
        textNode.value = titleCase(textNode.value)
      }
    })
  }
}

export default remarkTitleCase
