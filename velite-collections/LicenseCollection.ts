import { defineCollection, s } from 'velite'

const LicenseCollection = defineCollection({
  name: 'License',
  pattern: 'license/index.mdx',
  schema: s.object({
    code: s.mdx(),
  }),
  single: true,
})

export default LicenseCollection
