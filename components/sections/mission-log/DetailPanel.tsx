'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { PixelButton } from '@/components/ui/PixelButton'
import { portfolioSounds } from '@/lib/audio/retroSounds'
import type { Project } from '@/lib/data/projects'

export interface DetailPanelProps {
  project: Project
  onClose: () => void
}

export function DetailPanel({ project, onClose }: DetailPanelProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
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
              <Image src={project.preview} alt={project.title} fill sizes="(max-width: 768px) 100vw, 672px" className="object-cover" />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(180deg, transparent 40%, var(--color-void-surface) 100%)' }}
              />
              <div
                className="absolute top-3 left-3 flex items-center gap-1.5 rounded px-2.5 py-1 font-stat text-xs"
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
              <p className="font-stat text-xs mb-1 text-[var(--color-ink-muted)]">◉ PROBLEM</p>
              <p className="font-body text-xs sm:text-sm leading-relaxed text-[var(--color-starchart)] opacity-85">{project.problem}</p>
            </div>
          )}

          {project.solution && (
            <div className="p-3 rounded-lg" style={{ background: 'var(--color-void-deep)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <p className="font-stat text-xs mb-1 text-[var(--color-star)]">◉ SOLUTION</p>
              <p className="font-body text-xs sm:text-sm leading-relaxed text-[var(--color-starchart)] opacity-85">{project.solution}</p>
            </div>
          )}

          {project.learnings && (
            <div className="p-3 rounded-lg" style={{ background: 'var(--color-void-deep)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <p className="font-stat text-xs mb-1 text-[var(--color-comet)]">◉ LEARNINGS</p>
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
