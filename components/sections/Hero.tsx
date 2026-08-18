'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { useTypewriter } from '@/lib/hooks/useTypewriter'
import { portfolioSounds } from '@/lib/audio/retroSounds'
import { siteConfig } from '@/lib/config/siteConfig'

/** Rotating subtitle phrases (typed out one at a time). */
const PHRASES = [
  siteConfig.role,
  'Building web apps & embedded systems',
  'React · Next.js · TypeScript · Tailwind',
  'ESP32 · Arduino · Custom PCB design',
]

interface Star {
  id: number
  left: string
  top: string
  size: number
  opacity: number
  dur: string
  delay: string
}

/** Organic starfield, generated client-side (no SSR/hydration mismatch). */
function useStars(count: number): Star[] {
  const [stars, setStars] = useState<Star[]>([])
  useEffect(() => {
    setStars(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 2.5 + 1,
        opacity: Math.random() * 0.5 + 0.3,
        dur: `${Math.random() * 3 + 2}s`,
        delay: `${Math.random() * 4}s`,
      }))
    )
  }, [count])
  return stars
}

export function Hero() {
  const reduce = useReducedMotion() ?? false
  const stars = useStars(70)
  const { displayed: subtitle, isTyping } = useTypewriter(PHRASES, {
    reducedMotion: reduce,
    typeSpeed: 45,
    deleteSpeed: 25,
    pauseDuration: 1800,
  })

  const enter = (delay: number) =>
    reduce
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.3 } }
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay },
        }

  return (
    <section
      id="home"
      className="relative flex min-h-[92vh] items-center overflow-hidden px-6 pb-20 pt-32 scroll-mt-24"
      style={{ background: 'var(--color-void)', color: 'var(--color-starchart)' }}
    >
      {/* ── Atmospheric nebula glows ── */}
      <div
        className="pointer-events-none absolute -left-48 -top-48 h-[800px] w-[800px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(62,42,99,0.35) 0%, rgba(27,18,53,0) 70%)' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-40 top-1/4 h-[600px] w-[600px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(255,139,76,0.12) 0%, rgba(27,18,53,0) 65%)' }}
        aria-hidden="true"
      />

      {/* ── Twinkling starfield ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {stars.map((s) => (
          <span
            key={s.id}
            className="absolute rounded-full"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              opacity: s.opacity,
              backgroundColor: 'var(--color-star)',
              boxShadow: '0 0 5px rgba(255,200,87,0.8)',
              animation: reduce ? undefined : `twinkle ${s.dur} ease-in-out infinite`,
              animationDelay: s.delay,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* ── Left: content ── */}
        <div className="flex flex-col items-start gap-6">
          {/* Badge Group */}
          <div className="flex flex-wrap items-center gap-3">
            <motion.div
              {...enter(0)}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 font-headline text-sm font-bold shadow-[0_0_15px_rgba(255,200,87,0.4)]"
              style={{
                background: 'var(--color-star)',
                color: 'var(--color-void)',
              }}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              {siteConfig.level}
            </motion.div>

            <motion.div {...enter(0.05)}>
              <Link
                href="/arcade"
                onClick={() => portfolioSounds.playStarSparkle()}
                className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-stat text-xs text-[var(--color-star)] bg-[var(--color-nebula)]/60 border border-[var(--color-star)]/40 shadow-[0_0_12px_rgba(255,200,87,0.25)] hover:scale-105 transition-transform"
              >
                <span>🕹️</span>
                <span>ARCADE READY: Play Void Miner →</span>
              </Link>
            </motion.div>
          </div>

          {/* Headline */}
          <motion.h1
            {...enter(0.1)}
            className="font-display text-3xl leading-tight sm:text-4xl md:text-5xl"
            style={{ color: 'var(--color-starchart)' }}
          >
            Hello, I&apos;m <br />
            <span style={{ color: 'var(--color-comet)' }}>{siteConfig.name.split(' ')[0]}</span>
          </motion.h1>

          {/* Subtitle — rotating typewriter */}
          <motion.div {...enter(0.2)} className="min-h-[3.25rem] max-w-lg">
            <p className="font-cozy text-lg" style={{ color: 'var(--color-starchart)', opacity: 0.9 }}>
              {subtitle || '\u00A0'}
              {!reduce && (
                <motion.span
                  className="ml-0.5 inline-block font-stat"
                  style={{ color: 'var(--color-comet)' }}
                  animate={{ opacity: isTyping ? [1, 0] : 1 }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  aria-hidden="true"
                >
                  |
                </motion.span>
              )}
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div {...enter(0.3)} className="mt-2 flex flex-wrap gap-4">
            <a
              href="#mission-log"
              onClick={() => portfolioSounds.playBlip(700)}
              className="rounded-lg px-6 py-3 font-headline font-bold transition-all hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer"
              style={{
                background: 'var(--color-comet)',
                color: 'var(--color-void)',
                boxShadow: '0 0 18px rgba(255,139,76,0.4)',
                outlineColor: 'var(--color-star)',
              }}
            >
              Launch into Mission Log
            </a>
            <a
              href="#send-a-transmission"
              onClick={() => portfolioSounds.playBlip(600)}
              className="rounded-lg border-2 px-6 py-3 font-headline font-bold transition-all hover:bg-white/5 hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer"
              style={{
                borderColor: 'var(--color-starchart)',
                color: 'var(--color-starchart)',
                outlineColor: 'var(--color-star)',
              }}
            >
              Send a Transmission
            </a>
          </motion.div>
        </div>

        {/* ── Right: illustration ── */}
        <div
          className="relative mx-auto flex h-[420px] w-full max-w-md items-center justify-center lg:h-[500px]"
          aria-hidden="true"
        >
          {/* Orbit ring */}
          <div
            className="absolute aspect-square w-[85%] max-w-[400px] rounded-full border border-dashed"
            style={{
              borderColor: 'rgba(255,200,87,0.3)',
              animation: reduce ? undefined : 'spin 40s linear infinite',
            }}
          />
          {/* Cozy planet (Stitch illustration, hi-res) with interactive hover tilt */}
          <motion.div
            className="relative z-10 h-52 w-52 overflow-hidden rounded-full sm:h-64 sm:w-64 cursor-pointer"
            whileHover={reduce ? {} : { scale: 1.06, rotate: 3 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{
              boxShadow: '0 0 55px rgba(62,42,99,0.7), inset -18px -18px 40px rgba(27,18,53,0.7)',
              border: '2px solid rgba(245,233,214,0.25)',
            }}
          >
            <Image
              src="/sprites/cozy/planet.jpg"
              alt=""
              fill
              sizes="(min-width: 640px) 256px, 208px"
              quality={90}
              className="object-cover"
              priority
            />
          </motion.div>
          {/* Friendly rocket (Foozle sprite) */}
          <div
            className="absolute z-20"
            style={{
              top: '4%',
              right: '2%',
              animation: reduce ? undefined : 'float-slow 6s ease-in-out infinite',
            }}
          >
            <Image
              src="/sprites/rocketSatu.png"
              alt=""
              width={120}
              height={120}
              className="h-24 w-24 object-contain sm:h-28 sm:w-28"
              style={{ filter: 'drop-shadow(0 0 15px rgba(255,139,76,0.5))' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
