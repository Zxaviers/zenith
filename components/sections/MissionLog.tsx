'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { PixelPanel } from '@/components/ui/PixelPanel'
import { portfolioSounds } from '@/lib/audio/retroSounds'
import { projects, type Project } from '@/lib/data/projects'
import { MissionCard } from '@/components/sections/mission-log/MissionCard'
import { DetailPanel } from '@/components/sections/mission-log/DetailPanel'
import { StarMapIndicator } from '@/components/sections/mission-log/StarMapIndicator'

export function MissionLog() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [expandedProject, setExpandedProject] = useState<Project | null>(null)
  const reducedMotion = useReducedMotion() ?? false

  const shippedProjects = projects.filter((p) => !p.comingSoon)
  const buildingProjects = projects.filter((p) => p.comingSoon)
  const totalCards = shippedProjects.length

  const scrollToIdx = useCallback((idx: number) => {
    const container = carouselRef.current
    if (!container) return
    const card = container.children[idx] as HTMLElement
    if (!card) return
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    setActiveIdx(idx)
  }, [])

  const handlePrev = () => scrollToIdx(Math.max(0, activeIdx - 1))
  const handleNext = () => scrollToIdx(Math.min(totalCards - 1, activeIdx + 1))

  const handleCarouselKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); handlePrev() }
    if (e.key === 'ArrowRight') { e.preventDefault(); handleNext() }
  }

  // Track active card via IntersectionObserver (carousel only)
  useEffect(() => {
    const container = carouselRef.current
    if (!container) return
    const cards = Array.from(container.children) as HTMLElement[]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = cards.indexOf(entry.target as HTMLElement)
            if (idx !== -1) setActiveIdx(idx)
          }
        })
      },
      { root: container, threshold: 0.5 }
    )
    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="mission-log" className="relative py-24 scroll-mt-24 overflow-hidden">
      {/* ── Section header ── */}
      <motion.div
        className="mb-10 text-center px-4 sm:px-6"
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

      {/* ════════════════════════════════════════════════════════════════
          MOBILE — Horizontal scroll-snap carousel (<768px / below md:)
          Hidden at md: and above.
          ════════════════════════════════════════════════════════════════ */}
      <div className="md:hidden relative flex items-center">
        {/* Left arrow */}
        <button
          onClick={handlePrev}
          disabled={activeIdx === 0}
          aria-label="Previous mission"
          className="absolute left-2 z-10 flex items-center justify-center rounded-lg w-9 h-9 transition-all hover:scale-110 active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
          style={{
            background: 'var(--color-void-surface)',
            border: '2px solid rgba(255, 200, 87,0.35)',
            boxShadow: '2px 2px 0 0 #000',
            color: 'var(--color-teal)',
          }}
        >
          ◀
        </button>

        {/* Carousel scroll container */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto py-4 px-16"
          style={{
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          } as React.CSSProperties}
          onKeyDown={handleCarouselKeyDown}
          tabIndex={0}
          role="region"
          aria-label="Mission Log carousel"
        >
          {shippedProjects.map((project, idx) => (
            <MissionCard
              key={project.slug ?? project.title}
              project={project}
              index={idx}
              onExpand={setExpandedProject}
              reducedMotion={reducedMotion}
              carouselMode={true}
            />
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={handleNext}
          disabled={activeIdx === totalCards - 1}
          aria-label="Next mission"
          className="absolute right-2 z-10 flex items-center justify-center rounded-lg w-9 h-9 transition-all hover:scale-110 active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
          style={{
            background: 'var(--color-void-surface)',
            border: '2px solid rgba(255, 200, 87,0.35)',
            boxShadow: '2px 2px 0 0 #000',
            color: 'var(--color-teal)',
          }}
        >
          ▶
        </button>
      </div>

      {/* Star-map dot indicator (mobile only) */}
      <StarMapIndicator
        count={totalCards}
        active={activeIdx}
        onDotClick={scrollToIdx}
      />

      {/* ════════════════════════════════════════════════════════════════
          DESKTOP — Regular grid (md: and above)
          Hidden below md:, shown as grid-cols-2 / lg:grid-cols-3.
          No scroll-snap, no arrows, no dot indicator.
          ════════════════════════════════════════════════════════════════ */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 px-6 mx-auto max-w-6xl">
        {shippedProjects.map((project, idx) => (
          <MissionCard
            key={project.slug ?? project.title}
            project={project}
            index={idx}
            onExpand={setExpandedProject}
            reducedMotion={reducedMotion}
            carouselMode={false}
          />
        ))}
      </div>

      {/* ════════════════════════════════════════════════════════════════
          "Building now" block (under main list)
          Compact strip for WIP projects
          ════════════════════════════════════════════════════════════════ */}
      {buildingProjects.length > 0 && (
        <div className="mt-16 px-4 sm:px-6 mx-auto max-w-6xl">
          <div className="mb-6 flex items-center gap-3">
            <span className="font-stat text-sm text-[var(--color-comet)] animate-pulse" aria-hidden="true">
              ▶
            </span>
            <h3 className="font-display text-base md:text-lg text-[var(--color-star)]">
              Building now
            </h3>
            <span className="font-stat text-xs text-[var(--color-ink-muted)]">
              IN ACTIVE DEVELOPMENT
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {buildingProjects.map((project) => (
              <motion.button
                type="button"
                key={project.slug ?? project.title}
                onClick={() => {
                  portfolioSounds.playSelect()
                  setExpandedProject(project)
                }}
                className="cursor-pointer group text-left w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-star)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-void-deep)] rounded"
                aria-label={`View project details for ${project.title}`}
                whileHover={reducedMotion ? {} : { y: -3 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              >
                <PixelPanel
                  variant="nebula"
                  className="p-5 h-full border border-dashed border-[var(--color-star)]/35 group-hover:border-[var(--color-star)]/70 transition-colors shadow-[4px_4px_0_0_#000] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h4 className="font-display text-sm md:text-base text-[var(--color-star)] group-hover:text-white transition-colors">
                        {project.title}
                      </h4>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-stat text-xs text-[var(--color-comet)] bg-[var(--color-void-deep)] border border-[var(--color-comet)]/30 shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-comet)] animate-ping" />
                        <span>In progress</span>
                      </span>
                    </div>

                    <p className="font-body text-xs sm:text-sm text-[var(--color-starchart)]/85 line-clamp-2 leading-relaxed mb-4">
                      {project.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2 flex-wrap">
                    {project.techStack && (
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="rounded px-2 py-0.5 font-stat text-xs text-[var(--color-star)] bg-[var(--color-void-deep)] border border-[var(--color-star)]/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    <span className="font-stat text-xs text-[var(--color-star)] group-hover:underline ml-auto flex items-center gap-1">
                      Details →
                    </span>
                  </div>
                </PixelPanel>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* ── Detail panel overlay (both breakpoints) ── */}
      <AnimatePresence>
        {expandedProject && (
          <DetailPanel
            project={expandedProject}
            onClose={() => setExpandedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
