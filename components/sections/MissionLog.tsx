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
        <h2 className="font-display text-2xl text-starchart md:text-3xl">
          Mission Log
        </h2>
        <p className="mt-2 font-body text-base text-starchart/80 md:text-lg">
          Discovered artifacts, production deployments &amp; hardware prototypes
        </p>
      </motion.div>

      <div className="mx-auto max-w-6xl grid gap-8 md:grid-cols-2 lg:grid-cols-3 text-left">
        {projects.map((project, idx) => {
          if (project.comingSoon) {
            return (
              <PixelPanel
                key={project.title}
                variant="void"
                className="opacity-60 border-2 border-dashed border-white/20 flex flex-col justify-between p-5 md:p-6"
              >
                <div>
                  <div className="mb-4 flex w-full aspect-video items-center justify-center rounded bg-void border border-white/10">
                    <span className="font-display text-2xl text-star animate-pulse">?</span>
                  </div>
                  <span className="font-stat text-xs text-star block mb-1">ARTIFACT #03 // ENCRYPTED</span>
                  <h3 className="mb-2 font-display text-sm text-starchart">{project.title}</h3>
                  <p className="font-body text-sm text-starchart/70 leading-relaxed">{project.desc}</p>
                </div>
                <div className="mt-6 pt-3 border-t border-white/10 text-right">
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
                className="flex flex-col justify-between h-full border-2 border-star/40 shadow-[6px_6px_0_0_#000] p-5 md:p-6 glint-top group hover:border-star transition-all duration-300"
              >
                <div>
                  {/* Artifact Preview Screenshot */}
                  {project.preview && (
                    <div className="relative mb-4 flex w-full aspect-video items-center justify-center overflow-hidden rounded border-2 border-white/10 bg-void">
                      <Image
                        src={project.preview}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-2 left-2 rounded bg-void/95 px-2 py-0.5 font-stat text-[11px] text-star border border-star/40 shadow-[1px_1px_0_0_#000]">
                        ARTIFACT // 0{idx + 1}
                      </div>
                      <div className="absolute top-2 right-2 flex items-center gap-1 rounded bg-void/95 px-2 py-0.5 font-stat text-[10px] text-aurora border border-aurora/40">
                        <span className="h-1.5 w-1.5 rounded-full bg-aurora animate-pulse" />
                        <span>LIVE</span>
                      </div>
                    </div>
                  )}

                  <h3 className="mb-2 font-display text-sm md:text-base text-star group-hover:text-comet transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-body text-sm md:text-base text-starchart/90 leading-relaxed mb-4">
                    {project.desc}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t-2 border-white/10">
                  {/* Guaranteed Readable Tech Chips */}
                  {project.techStack && (
                    <div className="mb-4 flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded bg-void px-2 py-0.5 font-stat text-xs text-star border border-star/30 shadow-[1px_1px_0_0_#000]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Dual Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full"
                      >
                        <PixelButton variant="comet" className="w-full text-xs py-2 font-bold justify-center">
                          🚀 Live Demo
                        </PixelButton>
                      </a>
                    ) : (
                      <button disabled className="w-full opacity-50 cursor-not-allowed">
                        <PixelButton variant="ghost" className="w-full text-xs py-2 justify-center">
                          Offline
                        </PixelButton>
                      </button>
                    )}

                    {project.repo ? (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full"
                      >
                        <PixelButton variant="ghost" className="w-full text-xs py-2 justify-center">
                          ⚡ Repo
                        </PixelButton>
                      </a>
                    ) : (
                      <Link href={`/projects/${project.slug}`} className="w-full">
                        <PixelButton variant="ghost" className="w-full text-xs py-2 justify-center">
                          📄 Intel
                        </PixelButton>
                      </Link>
                    )}
                  </div>

                  {/* Inspect Case Study */}
                  <Link
                    href={`/projects/${project.slug}`}
                    className="block text-center font-stat text-xs text-starchart/70 hover:text-star transition-colors pt-2 border-t border-white/5"
                  >
                    [ Inspect Full Mission Intel → ]
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
