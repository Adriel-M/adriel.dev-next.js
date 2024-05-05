import octicons from '@primer/octicons'
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic'

const headerIcon = fromHtmlIsomorphic(
  `<span class="content-header-link-placeholder">${octicons.hash.toSVG()}</span>`,
  { fragment: true }
)

const config = {
  behavior: 'prepend',
  headingProperties: {
    className: ['content-header'],
  },
  content: headerIcon,
}

export default config
