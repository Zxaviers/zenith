'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { PixelPanel } from '@/components/ui/PixelPanel'
import { PixelButton } from '@/components/ui/PixelButton'
import { projects, type Project } from '@/lib/data/projects'
import { portfolioSounds } from '@/lib/audio/retroSounds'

// ── Targeting Reticle (4 corner L-lines) ────────────────────────────────────
function Reticle({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <>
          {(['tl', 'tr', 'bl', 'br'] as const).map((pos) => (
            <motion.div
              key={pos}
              className="pointer-events-none absolute z-30"
              style={{
                top: pos.startsWith('t') ? 6 : undefined,
                bottom: pos.startsWith('b') ? 6 : undefined,
                left: pos.endsWith('l') ? 6 : undefined,
                right: pos.endsWith('r') ? 6 : undefined,
                width: 14,
                height: 14,
                borderTop: pos.startsWith('t') ? '2px solid var(--color-star)' : undefined,
                borderBottom: pos.startsWith('b') ? '2px solid var(--color-star)' : undefined,
                borderLeft: pos.endsWith('l') ? '2px solid var(--color-star)' : undefined,
                borderRight: pos.endsWith('r') ? '2px solid var(--color-star)' : undefined,
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.12, ease: 'easeOut' }}
            />
          ))}
        </>
      )}
    </AnimatePresence>
  )
}

// ── Detail Panel Overlay ─────────────────────────────────────────────────────
function DetailPanel({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = originalOverflow
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto overscroll-contain"
      style={{ background: 'rgba(13, 8, 22, 0.88)', backdropFilter: 'blur(8px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        layoutId={`card-${project.slug ?? project.title}`}
        className="relative w-full max-w-2xl max-h-[90dvh] sm:max-h-[85vh] flex flex-col rounded-xl overflow-hidden my-auto"
        style={{
          background: 'var(--color-void-surface)',
          border: '2px solid var(--color-star)',
          boxShadow: '0 0 45px rgba(255, 200, 87, 0.3), 6px 6px 0 0 #000',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating prominent close button (always accessible on mobile) */}
        <button
          type="button"
          onClick={() => {
            portfolioSounds.playBlip(500)
            onClose()
          }}
          aria-label="Close dialog"
          className="absolute top-3 right-3 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-void)]/90 text-[var(--color-star)] border border-[var(--color-star)]/50 shadow-lg hover:scale-110 active:scale-95 transition-transform cursor-pointer"
        >
          <span className="font-headline text-sm font-bold leading-none">✕</span>
        </button>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-4">
          {project.preview && (
            <div
              className="relative w-full h-40 sm:h-52 rounded-lg overflow-hidden flex-shrink-0"
              style={{ border: '1px solid rgba(255, 200, 87, 0.3)', background: 'var(--color-void-deep)' }}
            >
              <Image src={project.preview} alt={project.title} fill className="object-cover" />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(180deg, transparent 40%, var(--color-void-surface) 100%)' }}
              />
              <div
                className="absolute top-3 left-3 flex items-center gap-1.5 rounded px-2.5 py-1 font-stat text-[11px]"
                style={{ background: 'rgba(13,8,22,0.92)', color: 'var(--color-star)', border: '1px solid rgba(255, 200, 87, 0.4)' }}
              >
                <motion.span
                  className="h-2 w-2 rounded-full bg-[var(--color-star)]"
                  animate={{ opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span>Active Mission</span>
              </div>
            </div>
          )}

          <div>
            <h3 className="font-display text-lg sm:text-xl text-[var(--color-star)] pr-10 mb-1.5">
              {project.title}
            </h3>
            <p className="font-body text-xs sm:text-sm leading-relaxed text-[var(--color-starchart)] opacity-90">
              {project.desc}
            </p>
          </div>

          {project.problem && (
            <div className="p-3 rounded-lg" style={{ background: 'var(--color-void-deep)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <p className="font-stat text-[10px] sm:text-xs mb-1 text-[var(--color-ink-muted)]">◉ PROBLEM</p>
              <p className="font-body text-xs sm:text-sm leading-relaxed text-[var(--color-starchart)] opacity-85">{project.problem}</p>
            </div>
          )}

          {project.solution && (
            <div className="p-3 rounded-lg" style={{ background: 'var(--color-void-deep)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <p className="font-stat text-[10px] sm:text-xs mb-1 text-[var(--color-star)]">◉ SOLUTION</p>
              <p className="font-body text-xs sm:text-sm leading-relaxed text-[var(--color-starchart)] opacity-85">{project.solution}</p>
            </div>
          )}

          {project.learnings && (
            <div className="p-3 rounded-lg" style={{ background: 'var(--color-void-deep)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <p className="font-stat text-[10px] sm:text-xs mb-1 text-[var(--color-comet)]">◉ LEARNINGS</p>
              <p className="font-body text-xs sm:text-sm leading-relaxed text-[var(--color-starchart)] opacity-85">{project.learnings}</p>
            </div>
          )}

          {project.techStack && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded px-2.5 py-1 font-stat text-xs shadow-[1px_1px_0_0_#000] text-[var(--color-star)]"
                  style={{ background: 'var(--color-void-deep)', border: '1px solid rgba(255, 200, 87, 0.25)' }}
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Sticky Action Footer (Always visible on mobile & desktop) */}
        <div className="sticky bottom-0 z-20 flex items-center justify-between gap-2.5 p-3 sm:p-4 bg-[var(--color-void-deep)]/95 border-t border-white/10 backdrop-blur-md flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => portfolioSounds.playStarSparkle()}
              >
                <PixelButton variant="comet" className="text-xs sm:text-sm py-2.5 px-4 font-bold min-h-[44px]">
                  🚀 Live Demo
                </PixelButton>
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => portfolioSounds.playBlip(700)}
              >
                <PixelButton variant="ghost" className="text-xs sm:text-sm py-2.5 px-4 min-h-[44px]">
                  ⚡ Repo
                </PixelButton>
              </a>
            )}
            {project.slug && !project.repo && (
              <Link href={`/projects/${project.slug}`} onClick={() => portfolioSounds.playBlip(700)}>
                <PixelButton variant="ghost" className="text-xs sm:text-sm py-2.5 px-4 min-h-[44px]">
                  📄 Details
                </PixelButton>
              </Link>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              portfolioSounds.playBlip(500)
              onClose()
            }}
            className="font-stat text-xs sm:text-sm px-3 py-2 rounded transition-colors hover:text-white text-[var(--color-ink-muted)] hover:bg-white/5 cursor-pointer ml-auto"
            aria-label="Close dialog"
          >
            ✕ Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Shared Project Card ───────────────────────────────────────────────────────
// `carouselMode` controls scroll-snap sizing (mobile only)
function MissionCard({
  project,
  index,
  onExpand,
  reducedMotion,
  carouselMode = false,
}: {
  project: Project
  index: number
  onExpand: (p: Project) => void
  reducedMotion: boolean
  carouselMode?: boolean
}) {
  const [hovered, setHovered] = useState(false)

  // Scroll-snap sizing only in carousel (mobile)
  const snapClasses = carouselMode ? 'flex-shrink-0 w-[80vw] max-w-sm' : ''
  const snapStyle: React.CSSProperties = carouselMode ? { scrollSnapAlign: 'center' } : {}

  if (project.comingSoon) {
    return (
      <motion.div
        className={`${snapClasses} flex flex-col`}
        style={snapStyle}
        initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: reducedMotion ? 0 : index * 0.1 }}
        viewport={{ once: true }}
      >
        <PixelPanel
          variant="nebula"
          className="h-full border-2 border-dashed border-[var(--color-star)]/35 flex flex-col justify-between p-5 bg-[var(--color-void-surface)]/70 hover:border-[var(--color-star)]/70 transition-colors"
        >
          <div>
            <div
              className="mb-4 flex w-full items-center justify-center rounded overflow-hidden relative"
              style={{ aspectRatio: '16/9', background: 'var(--color-void-deep)', border: '1px solid rgba(255, 200, 87, 0.25)' }}
            >
              <div
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,200,87,0.3) 1px, transparent 0)',
                  backgroundSize: '12px 12px',
                }}
              />
              <motion.span
                className="font-display text-2xl z-10 text-[var(--color-star)]"
                animate={reducedMotion ? {} : { opacity: [0.5, 1, 0.5], scale: [0.95, 1.05, 0.95] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                ⚙️
              </motion.span>
              <span className="absolute bottom-2 right-2 font-stat text-[10px] text-[var(--color-comet)] px-2 py-0.5 rounded bg-black/60 border border-[var(--color-comet)]/30">
                WIP
              </span>
            </div>

            <div className="flex items-center justify-between mb-2">
              <span className="font-stat text-xs text-[var(--color-star)] flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-comet)] animate-ping" />
                <span>On Progress</span>
              </span>
              <span className="font-stat text-[10px] text-[var(--color-ink-muted)]">ORBITAL LAB</span>
            </div>

            <h3 className="mb-2 font-display text-sm md:text-base text-[var(--color-star)]">
              {project.title}
            </h3>
            <p className="font-body text-xs sm:text-sm leading-relaxed mb-4 text-[var(--color-starchart)] opacity-85">
              {project.desc}
            </p>
          </div>

          <div className="mt-auto pt-3 border-t border-white/10">
            {project.techStack && (
              <div className="mb-3 flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded px-2 py-0.5 font-stat text-[11px] text-[var(--color-star)]"
                    style={{ background: 'var(--color-void-deep)', border: '1px solid rgba(255, 200, 87, 0.25)' }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
            <div className="text-right">
              <span className="font-stat text-xs text-[var(--color-comet)]">
                ⚡ Deployment in progress...
              </span>
            </div>
          </div>
        </PixelPanel>
      </motion.div>
    )
  }

  return (
    <motion.div
      className={`relative ${snapClasses} flex flex-col h-full`}
      style={snapStyle}
      layoutId={`card-${project.slug ?? project.title}`}
      initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: reducedMotion ? 0 : index * 0.12 }}
      viewport={{ once: true }}
      whileHover={reducedMotion ? {} : { y: -6, scale: 1.02 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <Reticle visible={hovered && !reducedMotion} />

      <PixelPanel
        variant="nebula"
        className="flex flex-col h-full shadow-[6px_6px_0_0_#000] p-5 group transition-shadow duration-300"
        style={hovered ? { boxShadow: '0 0 0 2px var(--color-star), 6px 6px 0 0 #000' } : {}}
      >
        {project.preview && (
          <div
            className="relative mb-4 w-full overflow-hidden rounded"
            style={{ aspectRatio: '16/9', border: '2px solid rgba(255, 200, 87, 0.25)', background: 'var(--color-void-deep)' }}
          >
            <Image
              src={project.preview}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 80vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(27, 18, 53, 0.6) 100%)' }}
            />
            <div
              className="absolute top-2 right-2 flex items-center gap-1 rounded px-2 py-0.5 font-stat text-[10px]"
              style={{ background: 'rgba(27, 18, 53, 0.9)', color: 'var(--color-star)', border: '1px solid rgba(255, 200, 87, 0.35)' }}
            >
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-[var(--color-star)]"
                animate={reducedMotion ? {} : { opacity: [1, 0.3, 1], scale: [1, 0.75, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span>Live</span>
            </div>
          </div>
        )}

        <h3 className="mb-2 font-display text-sm md:text-base text-[var(--color-star)]">
          {project.title}
        </h3>
        <p className="font-body text-sm leading-relaxed mb-4 flex-1 text-[var(--color-starchart)] opacity-90">
          {project.desc}
        </p>

        <div className="mt-auto pt-4 border-t border-white/10">
          {project.techStack && (
            <div className="mb-4 flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <motion.span
                  key={tech}
                  className="rounded px-2 py-0.5 font-stat text-xs shadow-[1px_1px_0_0_#000] text-[var(--color-star)]"
                  style={{ background: 'var(--color-void-deep)', border: '1px solid rgba(255, 200, 87, 0.25)' }}
                  whileHover={reducedMotion ? {} : { y: -2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          )}
          <button
            type="button"
            className="w-full text-center font-stat text-xs pt-2 border-t border-white/5 transition-colors hover:text-[var(--color-star)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-star rounded cursor-pointer text-[var(--color-ink-muted)]"
            onClick={() => {
              portfolioSounds.playSelect()
              onExpand(project)
            }}
            aria-label={`Read full case study for ${project.title}`}
          >
            [ Read full case study → ]
          </button>
        </div>
      </PixelPanel>
    </motion.div>
  )
}

// ── Star-map Dot Indicator (mobile only) ─────────────────────────────────────
function StarMapIndicator({
  count,
  active,
  onDotClick,
}: {
  count: number
  active: number
  onDotClick: (i: number) => void
}) {
  return (
    // md:hidden — only shown on mobile where carousel is active
    <div className="md:hidden flex items-center justify-center gap-2 mt-6" role="tablist" aria-label="Mission selector position">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          role="tab"
          aria-selected={i === active}
          aria-label={`Go to mission ${i + 1}`}
          onClick={() => onDotClick(i)}
          className="relative flex items-center justify-center transition-all focus-visible:outline-none"
          style={{ width: 28, height: 12 }}
        >
          {i > 0 && (
            <div
              className="absolute right-full top-1/2 -translate-y-1/2 h-px"
              style={{
                width: 10,
                background: i <= active ? 'var(--color-teal)' : 'rgba(255,255,255,0.2)',
                transition: 'background 0.3s',
              }}
            />
          )}
          <motion.div
            className="rounded-full"
            style={{ background: i === active ? 'var(--color-teal)' : 'rgba(255,255,255,0.25)' }}
            animate={{ width: i === active ? 12 : 6, height: i === active ? 12 : 6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          />
          {i === active && (
            <motion.div
              className="absolute rounded-full"
              style={{ width: 18, height: 18, border: '1px solid var(--color-teal)', opacity: 0.4 }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </button>
      ))}
    </div>
  )
}

// ── Main MissionLog Section ───────────────────────────────────────────────────
export function MissionLog() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [expandedProject, setExpandedProject] = useState<Project | null>(null)
  const reducedMotion = useReducedMotion() ?? false

  const totalCards = projects.length

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
          {projects.map((project, idx) => (
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
        {projects.map((project, idx) => (
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
