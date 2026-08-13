import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PixelPanel } from '@/components/ui/PixelPanel'
import { PixelButton } from '@/components/ui/PixelButton'
import { projects } from '@/lib/data/projects'

export async function generateStaticParams() {
  return projects.filter((p) => p.slug && !p.comingSoon).map((p) => ({ slug: p.slug! }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return {}
  return { title: `${project.title} — ${project.desc} | Zenith` }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)

  if (!project || project.comingSoon) notFound()

  return (
    <section className="relative px-6 py-24">
      <PixelPanel variant="nebula" className="mx-auto max-w-4xl text-left">
        <Link
          href="/#mission-log"
          className="mb-6 inline-block font-display text-xs text-comet hover:text-starchart"
        >
          {'< Back to Mission Log'}
        </Link>

        {project.preview && (
          <div className="relative mb-8 w-full max-w-4xl mx-auto aspect-video overflow-hidden rounded-lg bg-void/40 pixel-frame">
            <Image src={project.preview} alt={project.title} fill sizes="100vw" className="object-cover" />
          </div>
        )}

        <h1 className="mb-2 font-display text-xl text-starchart md:text-2xl">{project.desc}</h1>
        <p className="mb-8 font-stat text-sm text-starchart/80">{project.title}</p>

        {project.techStack && (
          <div className="mb-8 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span key={tech} className="rounded-sm bg-void px-2 py-1 font-stat text-xs text-star">
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="space-y-8">
          {project.problem && (
            <div>
              <h2 className="mb-2 font-display text-xs text-comet">Problem</h2>
              <p className="font-body text-lg leading-relaxed text-starchart/90 md:text-xl">
                {project.problem}
              </p>
            </div>
          )}
          {project.solution && (
            <div>
              <h2 className="mb-2 font-display text-xs text-comet">Solution</h2>
              <p className="font-body text-lg leading-relaxed text-starchart/90 md:text-xl">
                {project.solution}
              </p>
            </div>
          )}
          {project.learnings && (
            <div>
              <h2 className="mb-2 font-display text-xs text-comet">Learnings</h2>
              <p className="font-body text-lg leading-relaxed text-starchart/90 md:text-xl">
                {project.learnings}
              </p>
            </div>
          )}
        </div>

        {project.link && (
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="mt-10 inline-block">
            <PixelButton variant="comet">Visit Live Site →</PixelButton>
          </a>
        )}
      </PixelPanel>
    </section>
  )
}
