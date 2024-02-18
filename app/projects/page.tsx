import { genPageMetadata } from 'app/seo'
import { allProjects, Projects } from 'contentlayer/generated'
import PageSimple from '@/layouts/PageSimple'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { components } from '@/components/MDXComponents'

const title = 'Projects'

export const metadata = genPageMetadata({ title: title })

export default function Projects() {
  const projects = allProjects.find((p) => p.slug === 'projects') as Projects
  return (
    <>
      <PageSimple title={title}>
        <MDXLayoutRenderer code={projects.body.code} components={components} />
      </PageSimple>
    </>
  )
}
