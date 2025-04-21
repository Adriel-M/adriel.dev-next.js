import { BlogPosting, WithContext } from 'schema-dts'
import { titleCase } from 'title-case'
import { defineCollection, s } from 'velite'

import { generateSummary } from '@/lib/generate-summary'
import siteConfig from '@/lib/siteConfig'
import { SluggedTag } from '@/lib/SluggedTag'

const PostCollection = defineCollection({
  name: 'Post',
  pattern: 'posts/**/*.mdx',
  schema: s
    .object({
      title: s.string().transform((title) => titleCase(title)),
      createdAt: s.isodate(),
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
      updatedAt: s.isodate().optional(),
      filePath: s.path(),
      code: s.mdx(),
      summary: s.raw().transform(generateSummary),
      toc: s.toc(),
    })
    .transform((data) => {
      const parts = data.filePath.split('/')
      const slug = parts[parts.length - 1]
      const path = `posts/${slug}`

      const modifiedDate = data.updatedAt ?? data.createdAt

      const jsonLd: WithContext<BlogPosting> = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: data.title,
        datePublished: data.createdAt,
        dateModified: modifiedDate,
        description: data.summary,
        image: `${siteConfig.siteUrl}/${path}/opengraph-image`,
        url: `${siteConfig.siteUrl}/${path}`,
        author: {
          '@type': 'Person',
          name: siteConfig.author,
        },
      }

      const metadata = {
        title: data.title,
        description: data.summary,
        openGraph: {
          title: data.title,
          description: data.summary,
          siteName: siteConfig.title,
          locale: 'en_US',
          type: 'article',
          publishedTime: data.createdAt,
          modifiedTime: modifiedDate,
          url: './',
          authors: [siteConfig.author],
        },
      }

      return {
        ...data,
        slug,
        path,
        jsonLd,
        metadata,
      }
    }),
})

export default PostCollection
