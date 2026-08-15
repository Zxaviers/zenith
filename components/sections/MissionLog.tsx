'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { PixelPanel } from '@/components/ui/PixelPanel'
import { PixelButton } from '@/components/ui/PixelButton'
import { projects } from '@/lib/data/projects'

export function MissionLog() {
  return (
    <section id="mission-log" className="relative px-4 sm:px-6 py-24 text-center scroll-mt-24">
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="font-display text-2xl md:text-3xl" style={{ color: 'var(--color-ink)' }}>
          Mission Log
        </h2>
        <p className="mt-2 font-body text-base md:text-lg" style={{ color: 'var(--color-ink-muted)' }}>
          Projects I&apos;ve shipped — web apps, hardware prototypes, and more
        </p>
      </motion.div>

      <div className="mx-auto max-w-6xl grid gap-8 md:grid-cols-2 lg:grid-cols-3 text-left">
        {projects.map((project, idx) => {
          if (project.comingSoon) {
            return (
              <PixelPanel
                key={project.title}
                variant="void"
                className="opacity-60 border-2 border-dashed flex flex-col justify-between p-5 md:p-6"
                style={{ '--pixel-border-color': 'rgba(255,255,255,0.2)' } as React.CSSProperties}
              >
                <div>
                  <div
                    className="mb-4 flex w-full aspect-video items-center justify-center rounded"
                    style={{ background: 'var(--color-void-deep)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <span className="font-display text-2xl animate-pulse" style={{ color: 'var(--color-teal)' }}>?</span>
                  </div>
                  {/* Removed "ARTIFACT #03 // ENCRYPTED" — kept simple label */}
                  <span className="font-stat text-xs block mb-1" style={{ color: 'var(--color-teal)' }}>Coming soon</span>
                  <h3 className="mb-2 font-display text-sm" style={{ color: 'var(--color-ink)' }}>{project.title}</h3>
                  <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--color-ink-muted)' }}>{project.desc}</p>
                </div>
                <div className="mt-6 pt-3 border-t border-white/10 text-right">
                  <span className="font-stat text-xs" style={{ color: 'var(--color-ink-muted)', opacity: 0.5 }}>In progress...</span>
                </div>
              </PixelPanel>
            )
          }

          return (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="flex flex-col h-full"
            >
              <PixelPanel
                variant="nebula"
                className="flex flex-col justify-between h-full shadow-[6px_6px_0_0_#000] p-5 md:p-6 group transition-all duration-300"
              >
                <div>
                  {/* Project preview */}
                  {project.preview && (
                    <div
                      className="relative mb-4 flex w-full aspect-video items-center justify-center overflow-hidden rounded"
                      style={{
                        border: '2px solid rgba(0,245,196,0.2)',
                        background: 'var(--color-void-deep)',
                        /* Bagian 4 fix: dark border frame prevents white-thumbnail contrast clash */
                      }}
                    >
                      <Image
                        src={project.preview}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Overlay gradient on white thumbnails for contrast */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(19,13,26,0.6) 100%)' }}
                      />
                      {/* Simple "Live" badge */}
                      <div
                        className="absolute top-2 right-2 flex items-center gap-1 rounded px-2 py-0.5 font-stat text-[10px]"
                        style={{ background: 'rgba(19,13,26,0.9)', color: 'var(--color-teal)', border: '1px solid rgba(0,245,196,0.35)' }}
                      >
                        <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: 'var(--color-teal)' }} />
                        <span>Live</span>
                      </div>
                    </div>
                  )}

                  <h3
                    className="mb-2 font-display text-sm md:text-base transition-colors"
                    style={{ color: 'var(--color-teal)' }}
                  >
                    {project.title}
                  </h3>
                  <p className="font-body text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--color-ink)', opacity: 0.9 }}>
                    {project.desc}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10">
                  {/* Tech stack chips */}
                  {project.techStack && (
                    <div className="mb-4 flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded px-2 py-0.5 font-stat text-xs shadow-[1px_1px_0_0_#000]"
                          style={{ background: 'var(--color-void-deep)', color: 'var(--color-teal)', border: '1px solid rgba(0,245,196,0.25)' }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {project.link ? (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="w-full">
                        <PixelButton variant="comet" className="w-full text-xs py-2 font-bold justify-center">
                          🚀 Live Demo
                        </PixelButton>
                      </a>
                    ) : (
                      <button disabled className="w-full opacity-50 cursor-not-allowed">
                        <PixelButton variant="ghost" className="w-full text-xs py-2 justify-center">Offline</PixelButton>
                      </button>
                    )}

                    {project.repo ? (
                      <a href={project.repo} target="_blank" rel="noopener noreferrer" className="w-full">
                        <PixelButton variant="ghost" className="w-full text-xs py-2 justify-center">⚡ Repo</PixelButton>
                      </a>
                    ) : (
                      <Link href={`/projects/${project.slug}`} className="w-full">
                        <PixelButton variant="ghost" className="w-full text-xs py-2 justify-center">📄 Details</PixelButton>
                      </Link>
                    )}
                  </div>

                  <Link
                    href={`/projects/${project.slug}`}
                    className="block text-center font-stat text-xs pt-2 border-t border-white/5 transition-colors hover:opacity-80"
                    style={{ color: 'var(--color-ink-muted)' }}
                  >
                    [ Read full case study → ]
                  </Link>
                </div>
              </PixelPanel>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
