import { genPageMetadata } from 'app/seo'

import Card from '@/components/Card'
import NormalPageHeading from '@/components/NormalPageHeading'
import { getAllProjects } from '@/lib/CollectionUtils'

import { title } from './route-utils'

export const metadata = genPageMetadata({ title })

export default function Projects() {
  return (
    <>
      <div className="divide-y divide-gray-200">
        <NormalPageHeading title="Projects" tagline="Some projects I worked on 🧑‍💻" />
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {getAllProjects().map((project) => (
              <Card
                key={project.title}
                title={project.title}
                description={project.description}
                href={project.href}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
