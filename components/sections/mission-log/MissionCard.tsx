'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { PixelPanel } from '@/components/ui/PixelPanel'
import { PixelButton, PixelLink } from '@/components/ui/PixelButton'
import { portfolioSounds } from '@/lib/audio/retroSounds'
import type { Project } from '@/lib/data/projects'

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

export interface MissionCardProps {
  project: Project
  index: number
  onExpand: (p: Project) => void
  reducedMotion: boolean
  carouselMode?: boolean
}

export function MissionCard({
  project,
  index,
  onExpand,
  reducedMotion,
  carouselMode = false,
}: MissionCardProps) {
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
              <span className="absolute bottom-2 right-2 font-stat text-xs text-[var(--color-comet)] px-2 py-0.5 rounded bg-black/60 border border-[var(--color-comet)]/30">
                WIP
              </span>
            </div>

            <div className="flex items-center justify-between mb-2">
              <span className="font-stat text-xs text-[var(--color-star)] flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-comet)] animate-ping" />
                <span>On Progress</span>
              </span>
              <span className="font-stat text-xs text-[var(--color-ink-muted)]">ORBITAL LAB</span>
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
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded px-2 py-0.5 font-stat text-xs text-[var(--color-star)]"
                    style={{ background: 'var(--color-void-deep)', border: '1px solid rgba(255, 200, 87, 0.25)' }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
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
              className="absolute top-2 right-2 flex items-center gap-1 rounded px-2 py-0.5 font-stat text-xs"
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

          {/* Action links: Live and Repo (min touch height 44px) */}
          {(project.link || project.repo) && (
            <div className="flex items-center gap-2 flex-wrap mb-2.5">
              {project.link && (
                <PixelLink
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => portfolioSounds.playStarSparkle()}
                  variant="comet"
                  className="flex-1 min-w-[70px] text-xs py-2 px-3 min-h-[44px] font-bold"
                >
                  🚀 Live
                </PixelLink>
              )}
              {project.repo && (
                <PixelLink
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => portfolioSounds.playBlip(700)}
                  variant="ghost"
                  className="flex-1 min-w-[70px] text-xs py-2 px-3 min-h-[44px] font-bold"
                >
                  ⚡ Repo
                </PixelLink>
              )}
            </div>
          )}

          {/* Case study ghost button */}
          <PixelButton
            variant="ghost"
            className="w-full text-xs py-2.5 px-3 min-h-[44px] flex items-center justify-center text-[var(--color-star)] font-display hover:text-white"
            onClick={() => {
              portfolioSounds.playSelect()
              onExpand(project)
            }}
            aria-label={`Read full case study for ${project.title}`}
          >
            Case study →
          </PixelButton>
        </div>
      </PixelPanel>
    </motion.div>
  )
}
