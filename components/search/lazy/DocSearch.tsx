'use client'

import { DocSearchButton, DocSearchProps } from '@docsearch/react'
import { useDocSearchKeyboardEvents } from '@docsearch/react'
import dynamic from 'next/dynamic'
import React from 'react'
import { createPortal } from 'react-dom'

const Modal = dynamic(() => import('./LazyModal'))

export function DocSearch(props: DocSearchProps) {
  const searchButtonRef = React.useRef<HTMLButtonElement>(null)
  const [isOpen, setIsOpen] = React.useState(false)
  const [initialQuery, setInitialQuery] = React.useState<string | undefined>(
    props?.initialQuery || undefined
  )

  const onOpen = React.useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  const onClose = React.useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  const onInput = React.useCallback(
    (event: KeyboardEvent) => {
      setIsOpen(true)
      setInitialQuery(event.key)
    },
    [setIsOpen, setInitialQuery]
  )

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen,
    onClose,
    onInput,
    searchButtonRef,
  })

  return (
    <>
      <DocSearchButton ref={searchButtonRef} onClick={onOpen} data-umami-event="Search Button" />

      {isOpen &&
        createPortal(
          <Modal
            {...props}
            initialScrollY={window.scrollY}
            initialQuery={initialQuery}
            onClose={onClose}
          />,
          document.body
        )}
    </>
  )
}
