'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { PixelPanel } from '@/components/ui/PixelPanel'
import { PixelButton } from '@/components/ui/PixelButton'
import { projects } from '@/lib/data/projects'

export function MissionLog() {
  return (
    <section id="mission-log" className="relative px-6 py-20 text-center overflow-hidden scroll-mt-24">
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="font-display text-2xl text-starchart md:text-3xl">Mission Log</h2>
        <p className="mt-2 font-body text-base text-starchart/80 md:text-lg">
          Discovered artifacts, production deployments & experimental systems
        </p>
      </motion.div>

      <div className="mx-auto max-w-6xl grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, idx) => {
          if (project.comingSoon) {
            return (
              <PixelPanel
                key={project.title}
                variant="void"
                className="opacity-60 border-dashed border-white/20 flex flex-col justify-between"
              >
                <div className="mb-4 flex w-full aspect-video items-center justify-center rounded-lg bg-void/60 border border-white/5 py-6">
                  <svg viewBox="0 0 64 72" className="h-16 w-16 opacity-40 animate-pulse" aria-hidden="true">
                    <rect x="16" y="0" width="32" height="8" fill="var(--color-star)" />
                    <rect x="16" y="0" width="8" height="24" fill="var(--color-star)" />
                    <rect x="40" y="0" width="8" height="24" fill="var(--color-star)" />
                    <rect x="8" y="24" width="48" height="40" fill="var(--color-star)" />
                    <rect x="12" y="28" width="40" height="32" fill="var(--color-void)" />
                    <rect x="28" y="38" width="8" height="8" fill="var(--color-star)" />
                    <rect x="30" y="46" width="4" height="8" fill="var(--color-star)" />
                  </svg>
                </div>
                <span className="font-stat text-xs text-star block mb-1">ARTIFACT #03 // ENCRYPTED</span>
                <h3 className="mb-2 font-display text-sm text-starchart">{project.title}</h3>
                <p className="font-body text-sm text-starchart/70 leading-relaxed">{project.desc}</p>
                <div className="mt-6 pt-3 border-t border-white/5">
                  <span className="font-stat text-xs text-starchart/50">[SCANNING DEEP SPACE...]</span>
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
                className="flex flex-col justify-between h-full text-left border border-star/30 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] group transition-all duration-300 hover:border-star glint-top"
              >
                <div>
                  {/* Artifact Preview Image */}
                  {project.preview && (
                    <div className="relative mb-4 flex w-full aspect-video items-center justify-center overflow-hidden rounded-md border border-white/10 bg-void">
                      <Image
                        src={project.preview}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-2 left-2 rounded bg-void/90 px-2 py-0.5 font-stat text-[11px] text-star border border-star/40">
                        {project.title.split(' ')[0].toUpperCase()}
                      </div>
                      <div className="absolute top-2 right-2 flex items-center gap-1.5 rounded bg-void/90 px-2 py-0.5 font-stat text-[10px] text-aurora border border-aurora/40">
                        <span className="h-1.5 w-1.5 rounded-full bg-aurora animate-pulse" />
                        <span>LIVE</span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-stat text-[11px] text-comet">ARTIFACT // SEC-0{idx + 1}</span>
                    <span className="font-stat text-[11px] text-starchart/60">VERIFIED</span>
                  </div>

                  <h3 className="mb-2 font-display text-base text-starchart group-hover:text-star transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-body text-sm text-starchart/85 leading-relaxed">
                    {project.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  {project.techStack && (
                    <div className="mb-4 flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-sm bg-void/90 px-2 py-0.5 font-stat text-xs text-star border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-3 pt-1">
                    <Link href={`/projects/${project.slug}`} className="w-full">
                      <PixelButton variant="ghost" className="w-full text-xs py-2">
                        Inspect Case Study →
                      </PixelButton>
                    </Link>
                  </div>
                </div>
              </PixelPanel>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
