import { titleCase } from 'title-case'
import { defineCollection, s } from 'velite'

const ProjectCollection = defineCollection({
  name: 'Project',
  pattern: 'projects/**/*.yaml',
  schema: s.object({
    title: s.string().transform((title) => titleCase(title)),
    description: s.string(),
    href: s.string().url(),
  }),
})

export default ProjectCollection
