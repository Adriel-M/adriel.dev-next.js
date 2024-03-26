import './algolia.css'

import { AlgoliaConfig, AlgoliaSearchProvider } from 'pliny/search/Algolia'
import { AlgoliaButton } from 'pliny/search/AlgoliaButton'

import siteMetadata from '@/data/siteMetadata'

const SearchButton = () => {
  const searchConfig = siteMetadata.search as AlgoliaConfig
  return (
    <AlgoliaSearchProvider algoliaConfig={searchConfig.algoliaConfig}>
      <AlgoliaButton aria-label="Search">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6 text-gray-900"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </AlgoliaButton>
    </AlgoliaSearchProvider>
  )
}

export default SearchButton
