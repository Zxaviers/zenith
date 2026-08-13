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
    channel: 'CH-01',
    text: 'Analyzing operator profile... Zxaviers. Mission designation: Zenith. Status: Online and operational.',
  },
  {
    speaker: 'Zxaviers',
    callsign: 'PILOT-ZX',
    channel: 'CH-02',
    text: 'I’m a Computer Engineering student, passionate about the intersection of IoT embedded systems and modern web development.',
  },
  {
    speaker: 'Zxaviers',
    callsign: 'PILOT-ZX',
    channel: 'CH-02',
    text: 'Zenith is my ongoing mission: building efficient, responsive, and visually engaging digital experiences that merge technology and creativity.',
  },
  {
    speaker: 'Headquarters',
    callsign: 'HQ-COMMAND',
    channel: 'CH-01',
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
  const currentDialogue = dialogueLines[currentIndex]

  return (
    <section id="mission-control" className="relative px-6 py-20 scroll-mt-24">
      {/* Decorative planet */}
      <div
        aria-hidden="true"
        className="absolute right-[8%] top-[10%] z-0 hidden h-24 w-24 animate-float-slow pixel-asset opacity-40 md:block"
        style={{
          backgroundImage: "url('/sprites/planet_pixel.png')",
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          transform: 'rotate(10deg)',
        }}
      />

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
            Operator profile transmission & primary mission logs
          </p>
        </motion.div>

        <PixelPanel variant="nebula" className="relative shadow-2xl">
          {/* Terminal HUD Header Bar */}
          <div className="mb-6 flex flex-wrap items-center justify-between border-b border-white/10 pb-4 gap-2">
            <div className="flex items-center gap-3">
              <div className="relative rounded-sm border border-star/40 bg-void/80 p-1">
                <Image
                  src={speakerIcons[currentDialogue.speaker]}
                  alt={currentDialogue.speaker}
                  width={44}
                  height={44}
                  className="h-11 w-11 pixel-asset"
                />
                <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-aurora ring-2 ring-void animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-sm text-comet">{currentDialogue.speaker}</h3>
                  <span className="font-stat text-xs px-1.5 py-0.5 rounded bg-void/80 text-star border border-star/20">
                    {currentDialogue.callsign}
                  </span>
                </div>
                <span className="font-stat text-xs text-starchart/70">
                  FREQ 142.85 MHz // {currentDialogue.channel}
                </span>
              </div>
            </div>

            {/* Audio wave frequency & signal visualizer */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col text-right font-stat text-[11px] text-starchart/70">
                <span>SIGNAL // 98.4%</span>
                <span className="text-aurora">ENCRYPTION: AES-256</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-void/80 border border-star/20" aria-hidden="true">
                {[40, 75, 100, 60, 90, 45, 80].map((height, i) => (
                  <motion.div
                    key={i}
                    className="w-1 rounded-full bg-star"
                    animate={{ height: [`${height * 0.2}%`, `${height}%`, `${height * 0.3}%`] }}
                    transition={{
                      duration: 0.8 + i * 0.1,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    style={{ height: `${height}%`, maxHeight: '18px', minHeight: '4px' }}
                  />
                ))}
                <span className="ml-2 font-stat text-[11px] text-aurora font-bold">LIVE COM</span>
              </div>
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
