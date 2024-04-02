import { genPageMetadata } from 'app/seo'

import Card from '@/components/Card'
import { getAllProjects } from '@/lib/CollectionUtils'

export const metadata = genPageMetadata({ title: 'Projects' })

export default function Projects() {
  return (
    <>
      <div className="divide-y divide-gray-200">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Projects
          </h1>
          <p className="text-lg leading-7 text-gray-500">Some projects I worked on 🧑‍💻</p>
        </div>
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
