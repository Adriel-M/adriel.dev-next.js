'use client'

import '@docsearch/css/dist/button.css'
import '@docsearch/css/dist/modal.css'
import './variables.css'

import { DocSearch } from '@docsearch/react'
import { AlgoliaConfig } from 'pliny/search/Algolia'

import siteMetadata from '@/data/siteMetadata'

const DocSearchButton = () => {
  const searchConfig = siteMetadata.search as AlgoliaConfig
  const { appId, apiKey, indexName } = searchConfig.algoliaConfig
  return <DocSearch appId={appId} apiKey={apiKey} indexName={indexName} />
}

export default DocSearchButton
