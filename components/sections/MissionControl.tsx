'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { PixelPanel } from '@/components/ui/PixelPanel'
import { PixelButton } from '@/components/ui/PixelButton'
import { cn } from '@/lib/utils'

interface Dialogue {
  speaker: 'Headquarters' | 'Zxaviers'
  callsign: string
  channel: string
  signal: string
  text: string
}

const INQUIRIES: { title: string; dialogue: Dialogue[] }[] = [
  {
    title: 'Mission Overview',
    dialogue: [
      {
        speaker: 'Headquarters',
        callsign: 'HQ-COMMAND',
        channel: 'FREQ 142.85 MHz // CH-01',
        signal: '98.8%',
        text: 'Analyzing operator profile... Zxaviers. Mission designation: Zenith. Status: Online and fully operational.',
      },
      {
        speaker: 'Zxaviers',
        callsign: 'PILOT-ZX',
        channel: 'FREQ 142.85 MHz // CH-02',
        signal: '99.9%',
        text: 'Zenith is my personal expedition: bridging modern full-stack web applications with tactile embedded IoT hardware.',
      },
      {
        speaker: 'Headquarters',
        callsign: 'HQ-COMMAND',
        channel: 'FREQ 142.85 MHz // CH-01',
        signal: '98.8%',
        text: 'Objective confirmed: Turn raw data streams into intuitive, human-centered digital experiences. Godspeed, agent.',
      },
    ],
  },
  {
    title: 'Core Specialization',
    dialogue: [
      {
        speaker: 'Zxaviers',
        callsign: 'PILOT-ZX',
        channel: 'FREQ 142.85 MHz // CH-02',
        signal: '99.9%',
        text: 'I study Computer Engineering at Politeknik Kota Malang, mastering microcontrollers (ESP32, Arduino) alongside modern web tech (React, Next.js, TypeScript).',
      },
      {
        speaker: 'Headquarters',
        callsign: 'HQ-COMMAND',
        channel: 'FREQ 142.85 MHz // CH-01',
        signal: '98.8%',
        text: 'Hardware-to-cloud synchronization verified. All telemetry pipelines calibrated.',
      },
    ],
  },
  {
    title: 'Current Directives',
    dialogue: [
      {
        speaker: 'Headquarters',
        callsign: 'HQ-COMMAND',
        channel: 'FREQ 142.85 MHz // CH-01',
        signal: '98.8%',
        text: 'Current mission priorities: Building responsive web tools, custom PCB engineering, and developing high-performance web products.',
      },
      {
        speaker: 'Zxaviers',
        callsign: 'PILOT-ZX',
        channel: 'FREQ 142.85 MHz // CH-02',
        signal: '99.9%',
        text: 'Ready for deployment. Explore the Constellation map or inspect the Mission Log for project details.',
      },
    ],
  },
]

const speakerIcons: Record<string, string> = {
  Headquarters: '/sprites/icon_hq.png',
  Zxaviers: '/sprites/icon_zx.png',
}

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

  return (
    <section id="mission-control" className="relative px-4 sm:px-6 py-24 scroll-mt-24">
      {/* Background Floating Space Decorator */}
      <div
        aria-hidden="true"
        className="absolute right-[6%] top-[12%] z-0 hidden h-28 w-28 animate-float-slow pixel-asset opacity-40 md:block"
      >
        <Image
          src="/sprites/planetUnik.png"
          alt=""
          width={112}
          height={112}
          className="pixel-asset drop-shadow-[0_0_20px_rgba(255,200,87,0.35)] transform rotate-12"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
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
            Operator profile transmission &amp; interactive cutscene terminal
          </p>
        </motion.div>

        <PixelPanel variant="nebula" className="relative shadow-[6px_6px_0_0_#000] border-2 border-star glint-top p-4 md:p-6">
          {/* Terminal HUD Header Bar */}
          <div className="mb-6 flex flex-wrap items-center justify-between border-b-2 border-white/10 pb-4 gap-3">
            <div className="flex items-center gap-3">
              {/* Speaker Portrait Frame */}
              <div className="relative rounded bg-void border-2 border-star p-1.5 shadow-[3px_3px_0_0_#000]">
                <Image
                  src={speakerIcons[currentDialogue.speaker]}
                  alt={currentDialogue.speaker}
                  width={52}
                  height={52}
                  className="h-12 w-12 md:h-14 md:w-14 pixel-asset"
                />
                <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-aurora ring-2 ring-void animate-pulse" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-sm md:text-base text-star">
                    {currentDialogue.speaker}
                  </h3>
                  <span className="font-stat text-xs px-2 py-0.5 rounded bg-void text-comet border border-comet/40 font-bold">
                    {currentDialogue.callsign}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-stat text-xs text-starchart/70">
                    {currentDialogue.channel}
                  </span>
                  <span className="font-stat text-xs text-aurora font-bold">
                    SIGNAL: {currentDialogue.signal}
                  </span>
                </div>
              </div>
            </div>

            {/* Audio Waveform Equalizer Visualizer */}
            <div className="flex items-center gap-2.5 bg-void px-3 py-1.5 rounded border border-white/10 shadow-inner">
              <div className="flex items-end gap-1 h-5">
                <span className="equalizer-bar" />
                <span className="equalizer-bar" />
                <span className="equalizer-bar" />
                <span className="equalizer-bar" />
                <span className="equalizer-bar" />
              </div>
              <span className="font-stat text-xs text-aurora font-bold tracking-widest">
                LIVE COM
              </span>
            </div>
          </div>

          {/* Interactive Dialogue Box */}
          <div className="relative min-h-[140px] rounded-md border-2 border-black bg-void/90 p-5 md:p-6 shadow-[inset_3px_3px_0_0_rgba(0,0,0,0.8)] backdrop-blur-sm">
            <div className="absolute top-2.5 right-3 font-stat text-xs text-starchart/50">
              LOG [{stepIndex + 1}/{currentTopic.dialogue.length}]
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedTopic}-${stepIndex}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="pt-2 font-body text-base md:text-xl text-starchart leading-relaxed"
              >
                &ldquo;{currentDialogue.text}&rdquo;
              </motion.div>
            </AnimatePresence>

            {/* Blinking prompt */}
            <div className="mt-4 flex justify-end">
              <span className="font-display text-xs text-star animate-bounce">
                ▼
              </span>
            </div>
          </div>

          {/* Dialogue Choice Controls */}
          <div className="mt-6 pt-4 border-t-2 border-white/10 space-y-3">
            <span className="font-stat text-xs text-starchart/70 block">
              &gt; SELECT INQUIRY CHANNEL:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {INQUIRIES.map((inq, idx) => (
                <button
                  key={inq.title}
                  onClick={() => handleSelectTopic(idx)}
                  className={cn(
                    'px-3 py-2 text-left font-display text-[11px] rounded border transition-all cursor-pointer',
                    selectedTopic === idx
                      ? 'bg-star text-void font-bold border-star shadow-[2px_2px_0_0_#000]'
                      : 'bg-void/80 text-starchart border-white/10 hover:border-star hover:text-star'
                  )}
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
                  ? '↻ Replay Dialogue'
                  : 'Next Transmission →'}
              </PixelButton>
            </div>
          </div>
        </PixelPanel>
      </div>
    </section>
  )
}
