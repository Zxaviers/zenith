'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { PixelPanel } from '@/components/ui/PixelPanel'
import { PixelButton } from '@/components/ui/PixelButton'
import { projects, type Project } from '@/lib/data/projects'

// ── Targeting Reticle (4 corner L-lines) ────────────────────────────────────
function Reticle({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <>
          {(['tl', 'tr', 'bl', 'br'] as const).map((pos) => (
            <motion.div
              key={pos}
              className="pointer-events-none absolute z-20"
              style={{
                top: pos.startsWith('t') ? 6 : undefined,
                bottom: pos.startsWith('b') ? 6 : undefined,
                left: pos.endsWith('l') ? 6 : undefined,
                right: pos.endsWith('r') ? 6 : undefined,
                width: 14,
                height: 14,
                borderTop: pos.startsWith('t') ? '2px solid var(--color-teal)' : undefined,
                borderBottom: pos.startsWith('b') ? '2px solid var(--color-teal)' : undefined,
                borderLeft: pos.endsWith('l') ? '2px solid var(--color-teal)' : undefined,
                borderRight: pos.endsWith('r') ? '2px solid var(--color-teal)' : undefined,
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.15 }}
            />
          ))}
        </>
      )}
    </AnimatePresence>
  )
}

// ── Detail Panel Overlay ────────────────────────────────────────────────────
function DetailPanel({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(13, 8, 22, 0.85)', backdropFilter: 'blur(6px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        layoutId={`card-${project.slug ?? project.title}`}
        className="relative w-full max-w-2xl overflow-hidden rounded-xl"
        style={{
          background: 'var(--color-void-surface)',
          border: '2px solid var(--color-teal)',
          boxShadow: '0 0 40px rgba(0,245,196,0.25), 8px 8px 0 0 #000',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header image */}
        {project.preview && (
          <div className="relative w-full" style={{ height: 200 }}>
            <Image
              src={project.preview}
              alt={project.title}
              fill
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(180deg, transparent 40%, var(--color-void-surface) 100%)',
              }}
            />
            {/* Live badge */}
            <div
              className="absolute top-3 right-3 flex items-center gap-1 rounded px-2 py-0.5 font-stat text-[10px]"
              style={{ background: 'rgba(13,8,22,0.92)', color: 'var(--color-teal)', border: '1px solid rgba(0,245,196,0.4)' }}
            >
              <motion.span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: 'var(--color-teal)' }}
                animate={{ opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span>Live</span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          <h3 className="font-display text-xl mb-2" style={{ color: 'var(--color-teal)' }}>
            {project.title}
          </h3>
          <p className="font-body text-sm leading-relaxed mb-4" style={{ color: 'var(--color-ink)', opacity: 0.9 }}>
            {project.desc}
          </p>

          {/* Extended details */}
          {project.problem && (
            <div className="mb-3 p-3 rounded-lg" style={{ background: 'var(--color-void-deep)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <p className="font-stat text-[10px] mb-1" style={{ color: 'var(--color-ink-muted)' }}>◉ PROBLEM</p>
              <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--color-ink)', opacity: 0.85 }}>{project.problem}</p>
            </div>
          )}
          {project.solution && (
            <div className="mb-3 p-3 rounded-lg" style={{ background: 'var(--color-void-deep)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <p className="font-stat text-[10px] mb-1" style={{ color: 'var(--color-teal)' }}>◉ SOLUTION</p>
              <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--color-ink)', opacity: 0.85 }}>{project.solution}</p>
            </div>
          )}
          {project.learnings && (
            <div className="mb-4 p-3 rounded-lg" style={{ background: 'var(--color-void-deep)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <p className="font-stat text-[10px] mb-1" style={{ color: 'var(--color-pink)' }}>◉ LEARNINGS</p>
              <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--color-ink)', opacity: 0.85 }}>{project.learnings}</p>
            </div>
          )}

          {/* Tech stack */}
          {project.techStack && (
            <div className="mb-5 flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <motion.span
                  key={tech}
                  className="rounded px-2 py-0.5 font-stat text-xs shadow-[1px_1px_0_0_#000]"
                  style={{ background: 'var(--color-void-deep)', color: 'var(--color-teal)', border: '1px solid rgba(0,245,196,0.25)' }}
                  whileHover={{ y: -2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3">
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <PixelButton variant="comet" className="text-xs py-2 px-4 font-bold">🚀 Live Demo</PixelButton>
              </a>
            )}
            {project.repo && (
              <a href={project.repo} target="_blank" rel="noopener noreferrer">
                <PixelButton variant="ghost" className="text-xs py-2 px-4">⚡ Repo</PixelButton>
              </a>
            )}
            {project.slug && !project.repo && (
              <Link href={`/projects/${project.slug}`}>
                <PixelButton variant="ghost" className="text-xs py-2 px-4">📄 Details</PixelButton>
              </Link>
            )}
            <button
              onClick={onClose}
              className="ml-auto font-stat text-xs transition-opacity hover:opacity-70"
              style={{ color: 'var(--color-ink-muted)' }}
              aria-label="Close panel"
            >
              ✕ Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Mission Card ─────────────────────────────────────────────────────────────
function MissionCard({
  project,
  index,
  onExpand,
  reducedMotion,
}: {
  project: Project
  index: number
  onExpand: (p: Project) => void
  reducedMotion: boolean
}) {
  const [hovered, setHovered] = useState(false)

  if (project.comingSoon) {
    return (
      <motion.div
        className="flex-shrink-0 w-[80vw] max-w-sm md:w-full md:max-w-none md:flex-shrink md:h-full"
        style={{ scrollSnapAlign: 'center' }}
        initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: reducedMotion ? 0 : index * 0.1 }}
        viewport={{ once: true }}
      >
        <PixelPanel
          variant="void"
          className="h-full opacity-60 border-2 border-dashed flex flex-col justify-between p-5"
          style={{ '--pixel-border-color': 'rgba(255,255,255,0.2)' } as React.CSSProperties}
        >
          <div
            className="mb-4 flex w-full items-center justify-center rounded"
            style={{ aspectRatio: '16/9', background: 'var(--color-void-deep)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <motion.span
              className="font-display text-2xl"
              style={{ color: 'var(--color-teal)' }}
              animate={reducedMotion ? {} : { opacity: [0.4, 1, 0.4], scale: [0.95, 1, 0.95] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >?</motion.span>
          </div>
          <span className="font-stat text-xs block mb-1" style={{ color: 'var(--color-teal)' }}>
            Coming soon
          </span>
          <h3 className="mb-2 font-display text-sm" style={{ color: 'var(--color-ink)' }}>{project.title}</h3>
          <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--color-ink-muted)' }}>{project.desc}</p>
          <div className="mt-4 pt-3 border-t border-white/10 text-right">
            <span className="font-stat text-xs" style={{ color: 'var(--color-ink-muted)', opacity: 0.5 }}>In progress...</span>
          </div>
        </PixelPanel>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="relative flex-shrink-0 w-[80vw] max-w-sm md:w-full md:max-w-none md:flex-shrink md:h-full flex flex-col"
      style={{ scrollSnapAlign: 'center' }}
      layoutId={`card-${project.slug ?? project.title}`}
      initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: reducedMotion ? 0 : index * 0.12 }}
      viewport={{ once: true }}
      whileHover={reducedMotion ? {} : { y: -6, scale: 1.02 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Reticle corners */}
      <Reticle visible={hovered && !reducedMotion} />

      <PixelPanel
        variant="nebula"
        className="flex flex-col h-full shadow-[6px_6px_0_0_#000] p-5 group cursor-pointer transition-shadow duration-300"
        style={
          hovered
            ? { boxShadow: '0 0 0 2px var(--color-teal), 6px 6px 0 0 #000' }
            : {}
        }
        onClick={() => onExpand(project)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onExpand(project) }}
        aria-label={`Open details for ${project.title}`}
      >
        {/* Preview image */}
        {project.preview && (
          <div
            className="relative mb-4 w-full overflow-hidden rounded"
            style={{ aspectRatio: '16/9', border: '2px solid rgba(0,245,196,0.2)', background: 'var(--color-void-deep)' }}
          >
            <Image
              src={project.preview}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 80vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(19,13,26,0.6) 100%)' }}
            />
            {/* Live badge with framer pulse */}
            <div
              className="absolute top-2 right-2 flex items-center gap-1 rounded px-2 py-0.5 font-stat text-[10px]"
              style={{ background: 'rgba(19,13,26,0.9)', color: 'var(--color-teal)', border: '1px solid rgba(0,245,196,0.35)' }}
            >
              <motion.span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: 'var(--color-teal)' }}
                animate={reducedMotion ? {} : { opacity: [1, 0.3, 1], scale: [1, 0.75, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span>Live</span>
            </div>
          </div>
        )}

        <h3 className="mb-2 font-display text-sm md:text-base" style={{ color: 'var(--color-teal)' }}>
          {project.title}
        </h3>
        <p className="font-body text-sm leading-relaxed mb-4 flex-1" style={{ color: 'var(--color-ink)', opacity: 0.9 }}>
          {project.desc}
        </p>

        <div className="mt-auto pt-4 border-t border-white/10">
          {/* Tech chips with spring bounce */}
          {project.techStack && (
            <div className="mb-4 flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <motion.span
                  key={tech}
                  className="rounded px-2 py-0.5 font-stat text-xs shadow-[1px_1px_0_0_#000]"
                  style={{ background: 'var(--color-void-deep)', color: 'var(--color-teal)', border: '1px solid rgba(0,245,196,0.25)' }}
                  whileHover={reducedMotion ? {} : { y: -2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          )}
          <button
            className="w-full text-center font-stat text-xs pt-2 border-t border-white/5 transition-colors hover:opacity-80"
            style={{ color: 'var(--color-ink-muted)' }}
            onClick={(e) => { e.stopPropagation(); onExpand(project) }}
            aria-label={`Read full case study for ${project.title}`}
          >
            [ Read full case study → ]
          </button>
        </div>
      </PixelPanel>
    </motion.div>
  )
}

// ── Star-map Dot Indicator ───────────────────────────────────────────────────
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
    <div className="flex items-center justify-center gap-2 mt-6" role="tablist" aria-label="Mission selector position">
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
          {/* Connecting line before (except first) */}
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

// ── Main MissionLog Section ──────────────────────────────────────────────────
export function MissionLog() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [expandedProject, setExpandedProject] = useState<Project | null>(null)
  const reducedMotion = useReducedMotion() ?? false

  const totalCards = projects.length

  // Scroll to a card by index (mobile carousel)
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

  // Keyboard nav on carousel
  const handleCarouselKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); handlePrev() }
    if (e.key === 'ArrowRight') { e.preventDefault(); handleNext() }
  }

  // Detect active card on scroll via IntersectionObserver (mobile)
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
      {/* Section header */}
      <motion.div
        className="mb-10 text-center px-4"
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

      {/* ── Carousel (Mobile) / Grid (Desktop) ── */}
      <div className="relative flex items-center md:block">
        {/* Left arrow (Mobile only) */}
        <button
          onClick={handlePrev}
          disabled={activeIdx === 0}
          aria-label="Previous mission"
          className="md:hidden absolute left-2 z-10 flex items-center justify-center rounded-lg w-9 h-9 transition-all hover:scale-110 active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
          style={{
            background: 'var(--color-void-surface)',
            border: '2px solid rgba(0,245,196,0.35)',
            boxShadow: '2px 2px 0 0 #000',
            color: 'var(--color-teal)',
          }}
        >
          ◀
        </button>

        {/* Responsive Container: flex carousel on mobile, 2/3 col grid on desktop */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto py-4 px-16 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:overflow-visible md:py-0 md:px-6 md:max-w-6xl md:mx-auto text-left"
          style={{
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          onKeyDown={handleCarouselKeyDown}
          tabIndex={0}
          role="region"
          aria-label="Mission Log projects"
        >
          {projects.map((project, idx) => (
            <MissionCard
              key={project.slug ?? project.title}
              project={project}
              index={idx}
              onExpand={setExpandedProject}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>

        {/* Right arrow (Mobile only) */}
        <button
          onClick={handleNext}
          disabled={activeIdx === totalCards - 1}
          aria-label="Next mission"
          className="md:hidden absolute right-2 z-10 flex items-center justify-center rounded-lg w-9 h-9 transition-all hover:scale-110 active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
          style={{
            background: 'var(--color-void-surface)',
            border: '2px solid rgba(0,245,196,0.35)',
            boxShadow: '2px 2px 0 0 #000',
            color: 'var(--color-teal)',
          }}
        >
          ▶
        </button>
      </div>

      {/* Star-map dot indicator (Mobile only) */}
      <div className="md:hidden">
        <StarMapIndicator
          count={totalCards}
          active={activeIdx}
          onDotClick={scrollToIdx}
        />
      </div>

      {/* Detail panel overlay */}
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
