import '@docsearch/css/dist/modal.css'

import { DocSearchModal, DocSearchModalProps } from '@docsearch/react'

export default async function LazyModal(props: DocSearchModalProps) {
  return <DocSearchModal {...props} />
}
