import { SluggedTag } from '@/lib/SluggedTag'

const TAGS_BASE_PATH = '/tags/'

export const generateTagsPath = (sluggedTag: SluggedTag): string => {
  return `${TAGS_BASE_PATH}${sluggedTag.tag}`
}
