'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { StarfieldBackground } from '@/components/ui/StarfieldBackground'

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden text-center px-4 sm:px-6 pt-28 pb-16 scroll-mt-24"
    >
      {/* 1. Organic Starfield Background */}
      <StarfieldBackground intensity="medium" className="z-0" />

      {/* 2. Cozy Volumetric Atmospheric Nebula Glows */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] md:h-[700px] md:w-[700px] rounded-full bg-nebula/50 blur-[130px] z-0 animate-nebula-pulse"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/4 left-1/4 h-[250px] w-[250px] md:h-[350px] md:w-[350px] rounded-full bg-comet/15 blur-[90px] z-0 animate-nebula-pulse"
        style={{ animationDelay: '2s' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/4 right-1/4 h-[240px] w-[240px] md:h-[320px] md:w-[320px] rounded-full bg-star/15 blur-[90px] z-0 animate-nebula-pulse"
        style={{ animationDelay: '4s' }}
        aria-hidden="true"
      />

      {/* 3. Celestial Orbital Trajectory Rings */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-35 z-10"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M -50 280 Q 400 90, 800 350 T 1600 220"
          fill="none"
          stroke="var(--color-star)"
          strokeWidth="1.5"
          strokeDasharray="6 8"
        />
        <path
          d="M 80 750 Q 600 420, 1050 580 T 1900 320"
          fill="none"
          stroke="var(--color-comet)"
          strokeWidth="1"
          strokeDasharray="5 7"
        />
      </svg>

      {/* 4. Integrated Cozy Sprites (Rocket & Planet Connected by Orbit) */}
      <div className="pointer-events-none absolute left-[5%] top-[18%] z-10 md:left-[10%] md:top-[16%]">
        <div className="relative">
          <div className="absolute -inset-3 rounded-full bg-comet/25 blur-md animate-pulse" />
          <Image
            src="/sprites/rocketSatu.png"
            alt=""
            width={110}
            height={110}
            priority
            className="h-[70px] w-[70px] md:h-[110px] md:w-[110px] animate-float-slow pixel-asset drop-shadow-[0_0_14px_rgba(255,139,76,0.45)] transform rotate-12"
          />
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-[10%] right-[5%] z-10 md:right-[10%] md:bottom-[8%]">
        <div className="relative">
          <div className="absolute -inset-3 rounded-full bg-star/20 blur-lg animate-pulse" />
          <Image
            src="/sprites/planetMerah.png"
            alt=""
            width={100}
            height={100}
            className="h-[65px] w-[65px] md:h-[100px] md:w-[100px] animate-float-slow pixel-asset drop-shadow-[0_0_14px_rgba(255,200,87,0.35)] transform -rotate-12"
            style={{ animationDelay: '2.5s' }}
          />
        </div>
      </div>

      {/* 5. Center Playful Content */}
      <div className="relative z-30 max-w-3xl mx-auto w-full px-4 flex flex-col items-center">
        {/* Playful Game Level Badge */}
        <motion.div
          className="mb-5 inline-flex items-center gap-2 rounded-full bg-star text-void px-4 py-1.5 font-body font-bold text-xs sm:text-sm shadow-[0_0_14px_rgba(255,200,87,0.35)] border border-star/60 cursor-default select-none"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <svg
            className="w-3.5 h-3.5 fill-void"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span>Lv. 20 Explorer</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          className="mb-4 font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-starchart tracking-wide leading-snug drop-shadow-[2px_2px_0_#1b1235]"
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Hello, I&apos;m{' '}
          <span className="text-comet underline decoration-star decoration-4 underline-offset-8">
            Zxaviers
          </span>
        </motion.h1>

        {/* Subtitle in Warm Rounded Body Font */}
        <motion.p
          className="mb-8 font-body text-lg sm:text-xl md:text-2xl font-medium text-starchart/90 max-w-xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Web Enthusiast &amp; IoT Embedded Explorer
        </motion.p>

        {/* Primary & Secondary Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
        >
          <a
            href="#mission-log"
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-comet text-void font-display text-xs sm:text-sm font-bold shadow-[0_4px_14px_rgba(255,139,76,0.35)] hover:shadow-[0_6px_20px_rgba(255,139,76,0.5)] hover:-translate-y-0.5 active:translate-y-0 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-star"
          >
            🚀 Launch into Mission Log
          </a>

          <a
            href="#send-a-transmission"
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl border-2 border-starchart/80 text-starchart font-display text-xs sm:text-sm font-bold hover:bg-starchart/10 hover:border-starchart hover:-translate-y-0.5 active:translate-y-0 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-star"
          >
            📡 Send a Transmission
          </a>
        </motion.div>
      </div>
    </section>
  )
}
