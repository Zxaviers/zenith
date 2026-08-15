'use client'

import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { PixelPanel } from '@/components/ui/PixelPanel'
import { PixelButton } from '@/components/ui/PixelButton'

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
        text: 'Rizky is studying Computer Engineering at Politeknik Kota Malang — mastering microcontrollers (ESP32, Arduino) alongside modern web tech (React, Next.js, TypeScript).',
      },
      {
        speaker: 'Rizky',
        text: 'Current GPA: 3.73. Not the number I lead with, but it reflects the dedication that goes into both coursework and real-world engineering.',
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

// ── Typewriter hook ───────────────────────────────────────────────────────────
// Returns: { displayed, isTyping, isWaiting }
// isWaiting = ~400ms "typing..." indicator before text starts
// isTyping  = character-by-character reveal phase
function useTypewriter(text: string, reducedMotion: boolean) {
  const [displayed, setDisplayed] = useState('')
  const [isWaiting, setIsWaiting] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const rafRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // Clear any running timers from previous render
    if (rafRef.current) clearTimeout(rafRef.current)

    if (reducedMotion) {
      // Skip animation entirely — show full text immediately
      setDisplayed(text)
      setIsWaiting(false)
      setIsTyping(false)
      return
    }

    // Reset
    setDisplayed('')
    setIsWaiting(true)
    setIsTyping(false)

    // Phase 1: Show "typing..." for ~400ms
    rafRef.current = setTimeout(() => {
      setIsWaiting(false)
      setIsTyping(true)

      // Phase 2: Typewriter character reveal
      let i = 0
      const charSpeed = Math.max(18, Math.min(35, Math.round(4000 / text.length)))
      const tick = () => {
        i++
        setDisplayed(text.slice(0, i))
        if (i < text.length) {
          rafRef.current = setTimeout(tick, charSpeed)
        } else {
          setIsTyping(false)
        }
      }
      rafRef.current = setTimeout(tick, charSpeed)
    }, 400)

    return () => { if (rafRef.current) clearTimeout(rafRef.current) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, reducedMotion])

  return { displayed, isWaiting, isTyping }
}

// ── Typing indicator (3-dot bounce) ──────────────────────────────────────────
function TypingDots() {
  return (
    <span className="inline-flex items-end gap-[3px] h-5 ml-1">
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

  const { displayed, isWaiting, isTyping } = useTypewriter(
    currentDialogue.text,
    reducedMotion
  )

  const handleNext = () => {
    setStepIndex((prev) => (prev + 1) % currentTopic.dialogue.length)
  }

  const handleSelectTopic = (index: number) => {
    if (index === selectedTopic) return
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
          <h2 className="font-display text-2xl md:text-3xl" style={{ color: 'var(--color-ink)' }}>
            Mission Control
          </h2>
          <p className="mt-2 font-body text-base md:text-lg" style={{ color: 'var(--color-ink-muted)' }}>
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
                  background: isRizky ? 'rgba(0,245,196,0.15)' : 'rgba(255,107,157,0.15)',
                  border: `2px solid ${isRizky ? 'rgba(0,245,196,0.5)' : 'rgba(255,107,157,0.5)'}`,
                  color: isRizky ? 'var(--color-teal)' : 'var(--color-pink)',
                }}
                aria-hidden="true"
                animate={reducedMotion ? {} : {
                  boxShadow: isRizky
                    ? ['0 0 0px rgba(0,245,196,0)', '0 0 12px rgba(0,245,196,0.4)', '0 0 0px rgba(0,245,196,0)']
                    : ['0 0 0px rgba(255,107,157,0)', '0 0 12px rgba(255,107,157,0.4)', '0 0 0px rgba(255,107,157,0)'],
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                {isRizky ? 'R' : 'Z'}
              </motion.div>

              <div>
                <h3
                  className="font-display text-sm md:text-base"
                  style={{ color: isRizky ? 'var(--color-teal)' : 'var(--color-pink)' }}
                >
                  {currentDialogue.speaker}
                </h3>
                <p className="font-body text-xs mt-0.5" style={{ color: 'var(--color-ink-muted)' }}>
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
                className="font-stat text-xs font-bold tracking-widest"
                style={{ color: 'var(--color-teal)' }}
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
                  style={{ background: i === stepIndex ? 'var(--color-teal)' : 'rgba(255,255,255,0.15)' }}
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
                className="pt-2 font-body text-base md:text-xl leading-relaxed"
                style={{ color: 'var(--color-ink)' }}
              >
                {/* Phase 1: waiting → show typing indicator */}
                {isWaiting ? (
                  <span className="flex items-center" style={{ color: 'var(--color-ink-muted)' }}>
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
                        className="inline-block ml-px"
                        style={{ color: 'var(--color-teal)' }}
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
              <span className="font-display text-xs animate-bounce" style={{ color: 'var(--color-teal)' }}>▼</span>
            </div>
          </div>

          {/* ── Topic selector ── */}
          <div className="mt-6 pt-4 border-t border-white/10 space-y-3">
            <span className="font-stat text-xs block" style={{ color: 'var(--color-ink-muted)' }}>
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
                            background: 'var(--color-teal)',
                            color: 'var(--color-void-deep)',
                            border: '2px solid var(--color-teal)',
                            boxShadow: '0 0 12px rgba(0,245,196,0.45), 2px 2px 0 0 #000',
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
