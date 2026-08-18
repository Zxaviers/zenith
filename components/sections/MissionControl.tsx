'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { PixelPanel } from '@/components/ui/PixelPanel'
import { PixelButton } from '@/components/ui/PixelButton'
import { useTypewriter } from '@/lib/hooks/useTypewriter'
import { portfolioSounds } from '@/lib/audio/retroSounds'

// ── Data (unchanged) ──────────────────────────────────────────────────────────
interface Dialogue {
  speaker: 'Rizky' | 'Zenith'
  text: string
}

const INQUIRIES: { title: string; dialogue: Dialogue[] }[] = [
  {
    title: 'About Me',
    dialogue: [
      {
        speaker: 'Rizky',
        text: "Hey! I'm Rizky Mardhani — welcome to Zenith. I build things at the intersection of modern web apps and embedded IoT hardware.",
      },
      {
        speaker: 'Zenith',
        text: 'Zenith is the central hub: full-stack applications, custom firmware, and tactile hardware engineering. One platform, two worlds.',
      },
      {
        speaker: 'Rizky',
        text: 'The goal? Turn raw sensor telemetry and responsive web interfaces into experiences that feel seamless and delightful.',
      },
    ],
  },
  {
    title: 'What I Study',
    dialogue: [
      {
        speaker: 'Zenith',
        text: 'Rizky is studying Computer Engineering at Brawijaya University — mastering microcontrollers (ESP32, Arduino) alongside modern web tech (React, Next.js, TypeScript).',
      },
      {
        speaker: 'Rizky',
        text: 'Focused on Embedded Systems, wireless sensor networks, and building fast, responsive full-stack applications.',
      },
    ],
  },
  {
    title: 'Right Now',
    dialogue: [
      {
        speaker: 'Rizky',
        text: "Right now I'm focused on shipping performant web tools, developing custom PCB architectures, and refining interactive user interfaces.",
      },
      {
        speaker: 'Zenith',
        text: 'If you want the specifics — explore the Constellation skill tree or inspect the Mission Log below.',
      },
    ],
  },
]

// ── Typing indicator (3-dot bounce) ──────────────────────────────────────────
function TypingDots() {
  return (
    <span className="inline-flex items-end gap-[3px] h-5 ml-1" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: 'var(--color-ink-muted)' }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
        />
      ))}
    </span>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export function MissionControl() {
  const [selectedTopic, setSelectedTopic] = useState(0)
  const [stepIndex, setStepIndex] = useState(0)
  const reducedMotion = useReducedMotion() ?? false

  const currentTopic = INQUIRIES[selectedTopic]
  const currentDialogue = currentTopic.dialogue[stepIndex]

  const { displayed, isWaiting, isTyping } = useTypewriter(currentDialogue.text, {
    reducedMotion,
    typeSpeed: 28,
    initialDelay: 300,
    loop: false,
  })

  const handleNext = () => {
    portfolioSounds.playBlip(750)
    setStepIndex((prev) => (prev + 1) % currentTopic.dialogue.length)
  }

  const handleSelectTopic = (index: number) => {
    if (index === selectedTopic) return
    portfolioSounds.playSelect()
    setSelectedTopic(index)
    setStepIndex(0)
  }

  const isRizky = currentDialogue.speaker === 'Rizky'

  return (
    <section id="mission-control" className="relative px-4 sm:px-6 py-24 scroll-mt-24">
      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full border border-[var(--color-star)]/30 bg-[var(--color-nebula)]/40 font-stat text-xs text-[var(--color-star)] shadow-[0_0_12px_rgba(255,200,87,0.25)]">
            <span>📡</span>
            <span>SYSTEM COMMS ACTIVE</span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl text-[var(--color-starchart)]">
            Mission Control
          </h2>
          <p className="mt-2 font-body text-base md:text-lg text-[var(--color-ink-muted)]">
            A quick introduction — who I am, what I study, and what I&apos;m building right now
          </p>
        </motion.div>

        <PixelPanel variant="nebula" className="relative shadow-[6px_6px_0_0_#000] p-4 md:p-6">
          {/* ── Speaker header ── */}
          <div className="mb-6 flex flex-wrap items-center justify-between border-b border-white/10 pb-4 gap-3">
            <div className="flex items-center gap-3">
              {/* Avatar with pulse */}
              <motion.div
                className="flex items-center justify-center w-12 h-12 rounded-xl text-xl font-bold select-none"
                style={{
                  background: isRizky ? 'rgba(255, 200, 87, 0.15)' : 'rgba(255, 139, 76, 0.15)',
                  border: `2px solid ${isRizky ? 'var(--color-star)' : 'var(--color-comet)'}`,
                  color: isRizky ? 'var(--color-star)' : 'var(--color-comet)',
                }}
                aria-hidden="true"
                animate={reducedMotion ? {} : {
                  boxShadow: isRizky
                    ? ['0 0 0px rgba(255, 200, 87, 0)', '0 0 14px rgba(255, 200, 87, 0.5)', '0 0 0px rgba(255, 200, 87, 0)']
                    : ['0 0 0px rgba(255, 139, 76, 0)', '0 0 14px rgba(255, 139, 76, 0.5)', '0 0 0px rgba(255, 139, 76, 0)'],
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                {isRizky ? 'R' : 'Z'}
              </motion.div>

              <div>
                <h3
                  className="font-display text-sm md:text-base"
                  style={{ color: isRizky ? 'var(--color-star)' : 'var(--color-comet)' }}
                >
                  {currentDialogue.speaker}
                </h3>
                <p className="font-body text-xs mt-0.5 text-[var(--color-ink-muted)]">
                  {isRizky ? 'Rizky Mardhani · Engineer' : 'Zenith · System AI'}
                </p>
              </div>
            </div>

            {/* LIVE badge with framer pulse */}
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded"
              style={{ background: 'var(--color-void-deep)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div className="flex items-end gap-1 h-5">
                <span className="equalizer-bar" />
                <span className="equalizer-bar" />
                <span className="equalizer-bar" />
                <span className="equalizer-bar" />
                <span className="equalizer-bar" />
              </div>
              <motion.span
                className="font-stat text-xs font-bold tracking-widest text-[var(--color-star)]"
                animate={reducedMotion ? {} : { opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              >
                LIVE
              </motion.span>
            </div>
          </div>

          {/* ── Dialogue box ── */}
          <div
            className="relative min-h-[140px] rounded-md p-5 md:p-6"
            style={{
              background: 'var(--color-void-deep)',
              border: '2px solid rgba(0,0,0,0.6)',
              boxShadow: 'inset 3px 3px 0 0 rgba(0,0,0,0.8)',
            }}
          >
            {/* Step dots */}
            <div
              className="absolute top-2.5 right-3 flex gap-1"
              aria-label={`Message ${stepIndex + 1} of ${currentTopic.dialogue.length}`}
            >
              {currentTopic.dialogue.map((_, i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full transition-all"
                  style={{ background: i === stepIndex ? 'var(--color-star)' : 'rgba(255,255,255,0.15)' }}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedTopic}-${stepIndex}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="pt-2 font-body text-base md:text-xl leading-relaxed text-[var(--color-starchart)]"
              >
                {/* Phase 1: waiting → show typing indicator */}
                {isWaiting ? (
                  <span className="flex items-center text-[var(--color-ink-muted)]">
                    <span className="font-stat text-xs">typing</span>
                    <TypingDots />
                  </span>
                ) : (
                  /* Phase 2+: typewriter reveal (or full text if reducedMotion) */
                  <>
                    &ldquo;{displayed}
                    {/* Blinking cursor while still typing */}
                    {isTyping && (
                      <motion.span
                        className="inline-block ml-px text-[var(--color-star)]"
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      >▌</motion.span>
                    )}
                    {!isTyping && displayed.length > 0 && <>&rdquo;</>}
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-4 flex justify-end">
              <motion.span
                className="font-display text-xs text-[var(--color-star)]"
                animate={reducedMotion ? {} : { y: [0, 4, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              >▼</motion.span>
            </div>
          </div>

          {/* ── Topic selector ── */}
          <div className="mt-6 pt-4 border-t border-white/10 space-y-3">
            <span className="font-stat text-xs block text-[var(--color-ink-muted)]">
              &gt; What do you want to know?
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {INQUIRIES.map((inq, idx) => {
                const isActive = selectedTopic === idx
                return (
                  <motion.button
                    key={inq.title}
                    onClick={() => handleSelectTopic(idx)}
                    className="px-3 py-2.5 text-left font-display text-[11px] rounded cursor-pointer transition-all"
                    style={
                      isActive
                        ? {
                            background: 'var(--color-star)',
                            color: 'var(--color-void-deep)',
                            border: '2px solid var(--color-star)',
                            boxShadow: '0 0 14px rgba(255, 200, 87, 0.45), 2px 2px 0 0 #000',
                            fontWeight: 'bold',
                          }
                        : {
                            background: 'var(--color-void-deep)',
                            color: 'var(--color-ink-muted)',
                            border: '2px solid rgba(255,255,255,0.1)',
                          }
                    }
                    whileHover={reducedMotion ? {} : { scale: isActive ? 1 : 1.02 }}
                    whileTap={reducedMotion ? {} : { scale: 0.97 }}
                    aria-pressed={isActive}
                  >
                    [{idx + 1}] {inq.title}
                  </motion.button>
                )
              })}
            </div>

            <div className="flex justify-end pt-2">
              <PixelButton
                variant="comet"
                onClick={handleNext}
                className="text-xs px-5 py-2.5 font-bold"
              >
                {stepIndex === currentTopic.dialogue.length - 1 ? '↻ Read Again' : 'Continue →'}
              </PixelButton>
            </div>
          </div>
        </PixelPanel>
      </div>
    </section>
  )
}
