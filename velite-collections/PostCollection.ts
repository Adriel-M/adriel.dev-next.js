import { titleCase } from 'title-case'
import { defineCollection, s } from 'velite'

import { DEFAULT_OG_TITLE, generateOgPath } from '@/lib/OgUtils'
import siteMetadata from '@/lib/siteMetadata'
import { SluggedTag } from '@/lib/SluggedTag'
import { generateSummary } from '@/lib/VeliteUtils'

const PostCollection = defineCollection({
  name: 'Post',
  pattern: 'posts/**/*.mdx',
  schema: s
    .object({
      title: s.string().transform((title) => titleCase(title)),
      date: s.isodate(),
      tags: s
        .array(s.string())
        .superRefine((tags, { addIssue }) => {
          const seenTags = new Set<string>()
          const duplicateTags = new Set<string>()

          for (const tag of tags) {
            if (seenTags.has(tag)) {
              duplicateTags.add(tag)
            }
            seenTags.add(tag)
          }

          if (duplicateTags.size > 0) {
            addIssue({
              code: 'custom',
              message: `Duplicate tags found: ${[...duplicateTags]}`,
            })

            return s.NEVER
          }
        })
        .transform((tags) => {
          return tags.map((t) => new SluggedTag(t))
        }),
      lastmod: s.isodate().optional(),
      path: s.path(),
      code: s.mdx(),
      summary: s.raw().transform(generateSummary),
    })
    .transform((data) => {
      return {
        ...data,
        slug: data.path.replace(/^.+?(\/)/, ''),
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: data.title,
          datePublished: data.date,
          dateModified: data.lastmod ?? data.date,
          description: data.summary,
          image: generateOgPath(DEFAULT_OG_TITLE),
          url: `${siteMetadata.siteUrl}/${data.path}`,
          author: [
            {
              '@type': 'Person',
              name: siteMetadata.author,
            },
          ],
        },
      }
    }),
})

export default PostCollection
