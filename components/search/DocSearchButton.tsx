'use client'

import '@docsearch/css/dist/button.css'
import '@docsearch/css/dist/modal.css'
import './variables.css'

import { DocSearch } from '@docsearch/react'
import {
  DocSearchHit,
  InternalDocSearchHit,
  StoredDocSearchHit,
} from '@docsearch/react/dist/esm/types'
import { AlgoliaConfig } from 'pliny/search/Algolia'

import CustomLink from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'

const TRAILING_ELLIPSIS_PATTERN = /\s+…$/
const transformItems = (items: DocSearchHit[]): DocSearchHit[] => {
  return items.map((item) => {
    // Strip the ellipsis at the end. Add ellipsis via css instead.
    const snippetValue = item._snippetResult?.content?.value
    if (snippetValue) {
      item._snippetResult.content.value = snippetValue.replace(TRAILING_ELLIPSIS_PATTERN, '')
    }
    if (item._snippetResult.hierarchy) {
      for (const value of Object.values(item._snippetResult.hierarchy)) {
        const hierarchyValue = value.value
        if (hierarchyValue && typeof hierarchyValue === 'string') {
          value.value = hierarchyValue.replace(TRAILING_ELLIPSIS_PATTERN, '')
        }
      }
    }

    const url = new URL(item.url)
    return {
      ...item,
      url: url.pathname + url.hash,
    }
  })
}

const Hit = ({
  hit,
  children,
}: {
  hit: InternalDocSearchHit | StoredDocSearchHit
  children: React.ReactNode
}) => {
  return <CustomLink href={hit.url}>{children}</CustomLink>
}

const DocSearchButton = () => {
  const searchConfig = siteMetadata.search as AlgoliaConfig
  const { appId, apiKey, indexName } = searchConfig.algoliaConfig
  return (
    <DocSearch
      appId={appId}
      apiKey={apiKey}
      indexName={indexName}
      placeholder="Search"
      transformItems={transformItems}
      hitComponent={Hit}
      disableUserPersonalization={true}
    />
  )
}

export default DocSearchButton
