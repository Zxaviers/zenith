'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { PixelPanel } from '@/components/ui/PixelPanel'
import { PixelButton } from '@/components/ui/PixelButton'

// Ported from src/Sections/About.jsx. Dialogue format kept exactly as
// instructed (ZENITH_PLAYBOOK.md §0.1): Zxaviers = operator/pilot
// callsign, Zenith = the mission name.
const dialogueLines = [
  {
    speaker: 'Headquarters',
    text: 'Analyzing operator profile... Zxaviers. Mission designation: Zenith. Status: Online.',
  },
  {
    speaker: 'Zxaviers',
    text: 'I’m a Computer Engineering student, passionate about the intersection of IoT systems and modern web development.',
  },
  {
    speaker: 'Zxaviers',
    text: 'Zenith is my ongoing mission: building efficient, responsive, and visually engaging digital experiences that merge technology and creativity.',
  },
  {
    speaker: 'Headquarters',
    text: 'Objective confirmed: Turn complex data streams into intuitive interfaces. Good luck, agent.',
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
      <div
        aria-hidden="true"
        className="absolute right-[10%] top-[10%] z-0 hidden h-20 w-20 animate-float-slow pixel-asset opacity-50 md:block"
        style={{
          backgroundImage: "url('/sprites/planet_pixel.png')",
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          transform: 'rotate(10deg)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl">
        <motion.h2
          className="mb-8 text-center font-display text-2xl text-starchart md:text-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Mission Control
        </motion.h2>

        <PixelPanel variant="nebula">
          <div className="mb-4 flex items-center gap-4">
            <Image
              src={speakerIcons[currentDialogue.speaker]}
              alt={currentDialogue.speaker}
              width={48}
              height={48}
              className="h-12 w-12 pixel-asset"
            />
            <h3 className="font-display text-sm text-comet">{`> ${currentDialogue.speaker}`}</h3>
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={currentIndex}
              className="min-h-[100px] font-body text-lg leading-relaxed text-starchart/90 md:text-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {currentDialogue.text}
            </motion.p>
          </AnimatePresence>

          <div className="mt-6 text-right">
            <PixelButton variant="ghost" onClick={handleNext}>
              {currentIndex === dialogueLines.length - 1 ? 'Replay' : 'Next'}
            </PixelButton>
          </div>
        </PixelPanel>
      </div>
    </section>
  )
}
