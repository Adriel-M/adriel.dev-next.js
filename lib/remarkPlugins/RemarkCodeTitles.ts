/**
 * MIT License
 *
 * Copyright (c) 2021 Timothy Lin
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { Node, Parent } from 'unist'
import { visit } from 'unist-util-visit'

/**
 * Parses title from code block and inserts it as a sibling title node.
 *
 */

interface CodeNode {
  lang?: string
}
const remarkCodeTitles = () => {
  return (tree: Node) =>
    visit(tree, 'code', (node: Node, index: number, parent: Parent) => {
      const codeNode = node as CodeNode
      const nodeLang = codeNode.lang || ''
      let language = ''
      let title = ''

      if (nodeLang.includes(':')) {
        language = nodeLang.slice(0, nodeLang.search(':'))
        title = nodeLang.slice(nodeLang.search(':') + 1, nodeLang.length)
      }

      if (!title) {
        return
      }

      const className = 'remark-code-title'

      const titleNode = {
        type: 'mdxJsxFlowElement',
        name: 'div',
        attributes: [{ type: 'mdxJsxAttribute', name: 'className', value: className }],
        children: [{ type: 'text', value: title }],
        data: { _xdmExplicitJsx: true },
      }

      parent.children.splice(index, 0, titleNode)
      codeNode.lang = language
    })
}

export default remarkCodeTitles
