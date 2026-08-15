'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PixelPanel } from '@/components/ui/PixelPanel'
import { PixelButton } from '@/components/ui/PixelButton'
import { cn } from '@/lib/utils'

interface Dialogue {
  speaker: 'Rizky' | 'Zxaviers'
  text: string
}

const INQUIRIES: { title: string; dialogue: Dialogue[] }[] = [
  {
    title: 'About Me',
    dialogue: [
      {
        speaker: 'Rizky',
        text: 'Hey! I\'m Rizky Mardhani — you can call me Zxaviers online. I build things at the intersection of web and embedded hardware.',
      },
      {
        speaker: 'Zxaviers',
        text: 'Zenith is my personal space: full-stack web apps, custom IoT firmware, and the occasional PCB layout. One portfolio, two worlds.',
      },
      {
        speaker: 'Rizky',
        text: 'The goal? Turn raw sensor data and user interfaces into experiences that actually feel good to use.',
      },
    ],
  },
  {
    title: 'What I Study',
    dialogue: [
      {
        speaker: 'Zxaviers',
        text: 'I\'m studying Computer Engineering at Politeknik Kota Malang — microcontrollers (ESP32, Arduino) on weekdays, React and Next.js on weekends.',
      },
      {
        speaker: 'Rizky',
        text: 'Current GPA: 3.73. Not the number I lead with, but it reflects the effort that goes into both the coursework and the side projects.',
      },
    ],
  },
  {
    title: 'Right Now',
    dialogue: [
      {
        speaker: 'Rizky',
        text: 'Right now I\'m focused on building responsive web tools, finishing up a custom PCB project, and shipping cleaner, faster interfaces.',
      },
      {
        speaker: 'Zxaviers',
        text: 'If you want the specifics — check the Constellation map or flip through the Mission Log below.',
      },
    ],
  },
]

export function MissionControl() {
  const [selectedTopic, setSelectedTopic] = useState(0)
  const [stepIndex, setStepIndex] = useState(0)

  const currentTopic = INQUIRIES[selectedTopic]
  const currentDialogue = currentTopic.dialogue[stepIndex]

  const handleNext = () => {
    setStepIndex((prev) => (prev + 1) % currentTopic.dialogue.length)
  }

  const handleSelectTopic = (index: number) => {
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
          {/* Speaker header */}
          <div className="mb-6 flex flex-wrap items-center justify-between border-b border-white/10 pb-4 gap-3">
            <div className="flex items-center gap-3">
              {/* Avatar circle */}
              <div
                className="flex items-center justify-center w-12 h-12 rounded-xl text-xl font-bold select-none"
                style={{
                  background: isRizky
                    ? 'rgba(0,245,196,0.15)'
                    : 'rgba(255,107,157,0.15)',
                  border: `2px solid ${isRizky ? 'rgba(0,245,196,0.5)' : 'rgba(255,107,157,0.5)'}`,
                  color: isRizky ? 'var(--color-teal)' : 'var(--color-pink)',
                }}
                aria-hidden="true"
              >
                {isRizky ? 'R' : 'Z'}
              </div>

              <div>
                <h3
                  className="font-display text-sm md:text-base"
                  style={{ color: isRizky ? 'var(--color-teal)' : 'var(--color-pink)' }}
                >
                  {currentDialogue.speaker}
                </h3>
                <p className="font-body text-xs mt-0.5" style={{ color: 'var(--color-ink-muted)' }}>
                  {isRizky ? 'Rizky Mardhani · Malang, ID' : 'Zxaviers · online alias'}
                </p>
              </div>
            </div>

            {/* Equalizer visualizer — kept as accent, no fake freq readout */}
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
              <span className="font-stat text-xs font-bold tracking-widest" style={{ color: 'var(--color-teal)' }}>
                LIVE
              </span>
            </div>
          </div>

          {/* Dialogue box */}
          <div
            className="relative min-h-[140px] rounded-md p-5 md:p-6"
            style={{
              background: 'var(--color-void-deep)',
              border: '2px solid rgba(0,0,0,0.6)',
              boxShadow: 'inset 3px 3px 0 0 rgba(0,0,0,0.8)',
            }}
          >
            {/* Step dots instead of "LOG [x/n]" */}
            <div className="absolute top-2.5 right-3 flex gap-1" aria-label={`Message ${stepIndex + 1} of ${currentTopic.dialogue.length}`}>
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
                transition={{ duration: 0.2 }}
                className="pt-2 font-body text-base md:text-xl leading-relaxed"
                style={{ color: 'var(--color-ink)' }}
              >
                &ldquo;{currentDialogue.text}&rdquo;
              </motion.div>
            </AnimatePresence>

            <div className="mt-4 flex justify-end">
              <span className="font-display text-xs animate-bounce" style={{ color: 'var(--color-teal)' }}>▼</span>
            </div>
          </div>

          {/* Topic selector */}
          <div className="mt-6 pt-4 border-t border-white/10 space-y-3">
            <span className="font-stat text-xs block" style={{ color: 'var(--color-ink-muted)' }}>
              &gt; What do you want to know?
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {INQUIRIES.map((inq, idx) => (
                <button
                  key={inq.title}
                  onClick={() => handleSelectTopic(idx)}
                  className={cn(
                    'px-3 py-2 text-left font-display text-[11px] rounded border transition-all cursor-pointer',
                  )}
                  style={
                    selectedTopic === idx
                      ? {
                          background: 'var(--color-teal)',
                          color: 'var(--color-void-deep)',
                          border: '1px solid var(--color-teal)',
                          fontWeight: 'bold',
                          boxShadow: '2px 2px 0 0 #000',
                        }
                      : {
                          background: 'var(--color-void-deep)',
                          color: 'var(--color-ink)',
                          border: '1px solid rgba(255,255,255,0.1)',
                        }
                  }
                >
                  [{idx + 1}] {inq.title}
                </button>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <PixelButton
                variant="comet"
                onClick={handleNext}
                className="text-xs px-5 py-2.5 font-bold"
              >
                {stepIndex === currentTopic.dialogue.length - 1
                  ? '↻ Read Again'
                  : 'Continue →'}
              </PixelButton>
            </div>
          </div>
        </PixelPanel>
      </div>
    </section>
  )
}
