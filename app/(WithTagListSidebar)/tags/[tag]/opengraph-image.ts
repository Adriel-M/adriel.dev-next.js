import { titleCase } from 'title-case'

import { getTagCounts } from '@/lib/CollectionUtils'
import { generateOgResponse, ogContentType, ogSize } from '@/lib/GenerateOgResponse'

import { Params } from './route-utils'

export const size = ogSize

export const contentType = ogContentType

export const dynamicParams = false

export const generateStaticParams = () => {
  return Object.keys(getTagCounts()).map((tag) => ({
    tag,
  }))
}

export default async function Image(props: { params: Promise<Params> }) {
  const params = await props.params

  return generateOgResponse(titleCase(params.tag))
}
