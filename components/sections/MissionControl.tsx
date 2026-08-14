'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { PixelPanel } from '@/components/ui/PixelPanel'
import { PixelButton } from '@/components/ui/PixelButton'
import { cn } from '@/lib/utils'

// Dialogue format kept exactly as instructed (ZENITH_PLAYBOOK.md §0.1):
// Zxaviers = operator/pilot callsign, Zenith = the mission name.
const dialogueLines = [
  {
    speaker: 'Headquarters',
    callsign: 'HQ-COMMAND',
    channel: 'FREQ 142.85 MHz // CH-01',
    signal: '98.4%',
    text: 'Analyzing operator profile... Zxaviers. Mission designation: Zenith. Status: Online and operational.',
  },
  {
    speaker: 'Zxaviers',
    callsign: 'PILOT-ZX',
    channel: 'FREQ 142.85 MHz // CH-02',
    signal: '99.9%',
    text: 'I’m a Computer Engineering student, passionate about the intersection of IoT embedded systems and modern web development.',
  },
  {
    speaker: 'Zxaviers',
    callsign: 'PILOT-ZX',
    channel: 'FREQ 142.85 MHz // CH-02',
    signal: '99.9%',
    text: 'Zenith is my ongoing mission: building efficient, responsive, and visually engaging digital experiences that merge technology and creativity.',
  },
  {
    speaker: 'Headquarters',
    callsign: 'HQ-COMMAND',
    channel: 'FREQ 142.85 MHz // CH-01',
    signal: '98.4%',
    text: 'Objective confirmed: Turn complex data streams into intuitive, human-centered interfaces. Godspeed, agent.',
  },
]

const speakerIcons: Record<string, string> = {
  Headquarters: '/sprites/icon_hq.png',
  Zxaviers: '/sprites/icon_zx.png',
}

export function MissionControl() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % dialogueLines.length)
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + dialogueLines.length) % dialogueLines.length)
  const currentDialogue = dialogueLines[currentIndex]

  return (
    <section id="mission-control" className="relative px-6 py-20 scroll-mt-24">
      {/* Decorative floating planet */}
      <div
        aria-hidden="true"
        className="absolute right-[8%] top-[10%] z-0 hidden h-28 w-28 animate-float-slow pixel-asset opacity-40 md:block"
      >
        <Image
          src="/sprites/planetUnik.png"
          alt=""
          width={112}
          height={112}
          className="pixel-asset drop-shadow-[0_0_20px_rgba(255,200,87,0.3)] transform rotate-12"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl">
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-2xl text-starchart md:text-3xl">
            Mission Control
          </h2>
          <p className="mt-2 font-body text-base text-starchart/80 md:text-lg">
            Operator profile transmission &amp; primary mission logs
          </p>
        </motion.div>

        <PixelPanel variant="nebula" className="relative shadow-2xl border-2 border-star/40 glint-top">
          {/* Terminal HUD Header Bar */}
          <div className="mb-6 flex flex-wrap items-center justify-between border-b border-white/10 pb-4 gap-3">
            <div className="flex items-center gap-3">
              {/* Speaker Portrait Frame */}
              <div className="relative rounded-sm border-2 border-star bg-void/90 p-1.5 shadow-[2px_2px_0_0_#000]">
                <Image
                  src={speakerIcons[currentDialogue.speaker]}
                  alt={currentDialogue.speaker}
                  width={48}
                  height={48}
                  className="h-12 w-12 pixel-asset"
                />
                <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-aurora ring-2 ring-void animate-pulse" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-sm md:text-base text-star">
                    {currentDialogue.speaker}
                  </h3>
                  <span className="font-stat text-xs px-2 py-0.5 rounded bg-void/90 text-comet border border-comet/30 font-bold">
                    {currentDialogue.callsign}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-stat text-xs text-starchart/70">
                    {currentDialogue.channel}
                  </span>
                  <span className="font-stat text-xs text-aurora">
                    SIGNAL // {currentDialogue.signal}
                  </span>
                </div>
              </div>
            </div>

            {/* Audio Waveform Equalizer Visualizer */}
            <div className="flex items-center gap-2 bg-void/80 px-3 py-1.5 rounded border border-white/10">
              <div className="flex items-end gap-1 h-4">
                <span className="equalizer-bar" />
                <span className="equalizer-bar" />
                <span className="equalizer-bar" />
                <span className="equalizer-bar" />
                <span className="equalizer-bar" />
              </div>
              <span className="font-stat text-xs text-aurora font-bold tracking-wider">
                LIVE COM
              </span>
            </div>
          </div>

          {/* Dialogue Text Terminal Box with subtle CRT Scanlines */}
          <div className="relative min-h-[120px] rounded-md bg-void/80 border border-white/10 p-5 md:p-6 shadow-inner overflow-hidden">
            <div className="hud-scanline absolute inset-0 opacity-25" aria-hidden="true" />
            <AnimatePresence mode="wait">
              <motion.p
                key={currentIndex}
                className="relative z-10 font-body text-lg leading-relaxed text-starchart md:text-xl font-normal"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                &ldquo;{currentDialogue.text}&rdquo;
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Terminal Footer & Controls */}
          <div className="mt-6 flex items-center justify-between">
            {/* Step Indicators */}
            <div className="flex items-center gap-1.5">
              {dialogueLines.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to dialogue step ${idx + 1}`}
                  className={cn(
                    'h-2 rounded-full transition-all duration-300 cursor-pointer',
                    idx === currentIndex
                      ? 'w-6 bg-star shadow-[0_0_8px_var(--color-star)]'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  )}
                />
              ))}
              <span className="ml-2 font-stat text-xs text-starchart/70">
                TRANSCRIPT [{currentIndex + 1}/{dialogueLines.length}]
              </span>
            </div>

            <PixelButton
              variant="comet"
              onClick={handleNext}
              aria-label={currentIndex === dialogueLines.length - 1 ? 'Replay dialogue from start' : 'Next dialogue transmission'}
            >
              {currentIndex === dialogueLines.length - 1 ? 'Replay Transmission' : 'Next Transmission →'}
            </PixelButton>
          </div>
        </PixelPanel>
      </div>
    </section>
  )
}
