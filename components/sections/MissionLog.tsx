'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { PixelPanel } from '@/components/ui/PixelPanel'
import { projects } from '@/lib/data/projects'

/** Ported from src/Sections/Projects.jsx onto next/link + PixelPanel. */
export function MissionLog() {
  return (
    <section id="mission-log" className="relative px-6 py-12 text-center overflow-hidden">
      <motion.h2
        className="mb-8 font-display text-2xl text-starchart"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Mission Log
      </motion.h2>

      <div className="grid gap-8 md:grid-cols-3">
        {projects.map((project) => {
          const cardBody = (
            <>
              {project.preview && (
                <div className="mb-4 flex w-full items-center justify-center overflow-hidden rounded-lg bg-void/40">
                  <img
                    src={project.preview}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="h-auto max-w-full rounded-lg transition-transform duration-500 hover:scale-105"
                  />
                </div>
              )}

              {project.comingSoon && (
                <div className="mb-4 flex w-full items-center justify-center rounded-lg bg-void/40 py-6">
                  <svg viewBox="0 0 64 72" className="h-16 w-16" aria-hidden="true">
                    <rect x="16" y="0" width="32" height="8" fill="var(--color-star)" />
                    <rect x="16" y="0" width="8" height="24" fill="var(--color-star)" />
                    <rect x="40" y="0" width="8" height="24" fill="var(--color-star)" />
                    <rect x="8" y="24" width="48" height="40" fill="var(--color-star)" />
                    <rect x="12" y="28" width="40" height="32" fill="var(--color-void)" />
                    <rect x="28" y="38" width="8" height="8" fill="var(--color-star)" />
                    <rect x="30" y="46" width="4" height="8" fill="var(--color-star)" />
                  </svg>
                </div>
              )}

              <h3 className="mb-2 font-display text-sm text-starchart">{project.title}</h3>
              <p className="font-body text-base text-starchart/70">{project.desc}</p>

              {project.techStack && (
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-sm bg-nebula px-2 py-1 font-stat text-xs text-star"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </>
          )

          if (project.comingSoon) {
            return (
              <PixelPanel key={project.title} variant="nebula" className="opacity-50">
                {cardBody}
              </PixelPanel>
            )
          }

          return (
            <motion.div key={project.slug} whileHover={{ y: -5 }}>
              <Link href={`/projects/${project.slug}`} className="block">
                <PixelPanel
                  variant="nebula"
                  className="cursor-pointer transition-transform hover:scale-[1.02]"
                >
                  {cardBody}
                </PixelPanel>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
