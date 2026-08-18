'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Volume2, VolumeX } from 'lucide-react'
import { cn } from '@/lib/utils'
import { portfolioSounds } from '@/lib/audio/retroSounds'
import { siteConfig } from '@/lib/config/siteConfig'

const NAV_LINKS = [
  { label: 'Home',            id: 'home',                hint: 'Home' },
  { label: 'Mission Control', id: 'mission-control',     hint: 'About' },
  { label: 'Constellation',   id: 'constellation',       hint: 'Skills' },
  { label: 'Flight Path',     id: 'flight-path',         hint: 'Experience' },
  { label: 'Mission Log',     id: 'mission-log',         hint: 'Projects' },
  { label: 'Hardware Lab',    id: 'iot-workbench',       hint: 'IoT Lab' },
  { label: 'Transmission',    id: 'send-a-transmission', hint: 'Contact' },
]

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-star focus-visible:outline-offset-2'

export function Navbar() {
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [orbitTime, setOrbitTime] = useState('')
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const updateTime = () => {
      const d = new Date()
      // Calculate UTC+7 (Western Indonesia Time / WIB)
      const utcMs = d.getTime() + d.getTimezoneOffset() * 60000
      const wib = new Date(utcMs + 7 * 3600000)
      const hours = wib.getHours().toString().padStart(2, '0')
      const minutes = wib.getMinutes().toString().padStart(2, '0')
      const seconds = wib.getSeconds().toString().padStart(2, '0')
      setOrbitTime(`${hours}:${minutes}:${seconds}`)
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const toggleSound = () => {
    const next = !soundEnabled
    portfolioSounds.enabled = next
    setSoundEnabled(next)
    if (next) portfolioSounds.playStarSparkle()
  }

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    portfolioSounds.playBlip(700)
    setMobileMenuOpen(false)
    if (pathname === '/') scrollToSection(id)
    else router.push(`/#${id}`)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.3 }
    )
    document.querySelectorAll('section[id]').forEach((sec) => observer.observe(sec))
    return () => observer.disconnect()
  }, [pathname])

  const ariaFor = (label: string, hint: string) => (label === hint ? label : `${label} — ${hint}`)

  return (
    <header className="pointer-events-none fixed left-0 right-0 top-0 z-50 px-4 py-4 md:px-6">
      <div className="pointer-events-auto mx-auto max-w-7xl">
        <nav
          aria-label="Zenith navigation"
          className="flex items-center justify-between rounded-xl border border-starchart/10 bg-nebula/80 p-3 pl-4 shadow-[0_0_25px_rgba(62,42,99,0.6)] backdrop-blur-md"
        >
          {/* Brand: rocket icon + wordmark + live telemetry clock */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              onClick={() => portfolioSounds.playStarSparkle()}
              aria-label="Zenith — home"
              className={cn('group flex items-center gap-2.5 rounded-lg', focusRing)}
            >
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full overflow-hidden transition-transform group-hover:scale-110"
                style={{
                  border: '1.5px solid rgba(255,200,87,0.6)',
                  boxShadow: '0 0 14px rgba(255,200,87,0.4)',
                }}
              >
                <Image
                  src="/sprites/cozy/planet.jpg"
                  alt="Zenith Cosmic Planet"
                  width={36}
                  height={36}
                  className="h-full w-full object-cover transition-transform group-hover:rotate-12 duration-300"
                />
              </span>
              <span className="font-display text-lg text-comet transition-colors group-hover:text-star">Zenith</span>
            </Link>

            {orbitTime && (
              <span className="hidden xl:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--color-void-deep)] border border-[var(--color-star)]/35 font-stat text-sm md:text-base font-bold text-[var(--color-star)] tracking-wider shadow-[0_0_15px_rgba(255,200,87,0.2)]">
                <span className="h-2 w-2 rounded-full bg-[var(--color-star)] animate-ping" />
                <span>🛰️ {orbitTime}</span>
              </span>
            )}
          </div>

          {/* Right group: links + status + sound toggle */}
          <div className="hidden items-center gap-5 lg:flex">
            <ul className="flex items-center gap-1.5">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === '/' && activeSection === link.id
                return (
                  <li key={link.id} className="relative">
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => handleNavClick(e, link.id)}
                      title={link.hint}
                      aria-label={ariaFor(link.label, link.hint)}
                      aria-current={isActive ? 'page' : undefined}
                      className={cn(
                        'relative z-10 block px-3 py-1.5 font-headline text-sm font-medium transition-colors rounded-lg',
                        focusRing,
                        isActive ? 'text-star font-bold' : 'text-starchart/75 hover:text-starchart'
                      )}
                    >
                      {link.label}
                    </a>
                    {isActive && (
                      <motion.div
                        layoutId="navbar-active-indicator"
                        className="absolute inset-0 z-0 rounded-lg border border-star/30 bg-star/10 shadow-[0_0_12px_rgba(255,200,87,0.25)]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </li>
                )
              })}
              <li className="relative">
                <Link
                  href="/devlog"
                  onClick={() => portfolioSounds.playBlip(700)}
                  title="Devlog"
                  className={cn(
                    'relative z-10 block px-3 py-1.5 font-headline text-sm font-medium transition-colors rounded-lg',
                    focusRing,
                    pathname?.startsWith('/devlog') ? 'text-star font-bold' : 'text-starchart/75 hover:text-starchart'
                  )}
                >
                  Devlog
                </Link>
                {pathname?.startsWith('/devlog') && (
                  <motion.div
                    layoutId="navbar-active-indicator"
                    className="absolute inset-0 z-0 rounded-lg border border-star/30 bg-star/10 shadow-[0_0_12px_rgba(255,200,87,0.25)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </li>
              <li className="relative">
                <Link
                  href="/arcade"
                  onClick={() => portfolioSounds.playStarSparkle()}
                  title="Arcade — Void Miner"
                  className={cn(
                    'relative z-10 block px-3 py-1.5 font-headline text-sm font-medium transition-colors rounded-lg',
                    focusRing,
                    pathname?.startsWith('/arcade') ? 'text-star font-bold' : 'text-starchart/75 hover:text-starchart'
                  )}
                >
                  🕹️ Arcade
                </Link>
                {pathname?.startsWith('/arcade') && (
                  <motion.div
                    layoutId="navbar-active-indicator"
                    className="absolute inset-0 z-0 rounded-lg border border-star/30 bg-star/10 shadow-[0_0_12px_rgba(255,200,87,0.25)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </li>
            </ul>

            <span className="h-5 w-px bg-starchart/15" aria-hidden="true" />

            {/* Retro SFX audio toggle */}
            <button
              onClick={toggleSound}
              type="button"
              title={soundEnabled ? 'Mute Retro UI Sounds' : 'Unmute Retro UI Sounds'}
              className="flex items-center justify-center h-8 w-8 rounded-lg bg-[var(--color-void)] border border-white/15 text-[var(--color-star)] hover:border-[var(--color-star)] transition-all cursor-pointer"
            >
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4 text-[var(--color-ink-muted)]" />}
            </button>
          </div>

          {/* Mobile toggle buttons */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleSound}
              type="button"
              className="flex items-center justify-center h-9 w-9 rounded-lg border border-white/20 p-1.5 text-star"
              aria-label="Toggle Sound"
            >
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4 text-[var(--color-ink-muted)]" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              className={cn(
                'flex items-center justify-center h-9 w-9 rounded-lg border border-comet/40 p-1.5 text-comet transition-all hover:bg-comet/10 active:scale-95',
                focusRing
              )}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </nav>

        {/* Mobile dropdown with AnimatePresence */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="mt-2 flex flex-col gap-2 rounded-xl border border-starchart/10 bg-nebula/95 p-4 shadow-[0_8px_32px_rgba(0,0,0,0.7)] backdrop-blur-md lg:hidden"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  title={link.hint}
                  aria-label={ariaFor(link.label, link.hint)}
                  className={cn(
                    'rounded-lg px-4 py-2.5 font-headline text-sm text-starchart transition-colors hover:text-star hover:bg-white/5 active:scale-98',
                    focusRing
                  )}
                >
                  <span className="text-star mr-1.5">✦</span> {link.label}
                  {link.hint !== link.label && (
                    <span className="ml-1.5 font-cozy text-xs lowercase text-starchart/60">· {link.hint}</span>
                  )}
                </a>
              ))}
              <Link
                href="/devlog"
                onClick={() => {
                  portfolioSounds.playBlip(700)
                  setMobileMenuOpen(false)
                }}
                className={cn(
                  'rounded-lg px-4 py-2.5 font-headline text-sm text-starchart transition-colors hover:text-star hover:bg-white/5',
                  focusRing
                )}
              >
                <span className="text-star mr-1.5">✦</span> Devlog
              </Link>
              <Link
                href="/arcade"
                onClick={() => {
                  portfolioSounds.playStarSparkle()
                  setMobileMenuOpen(false)
                }}
                className={cn(
                  'rounded-lg px-4 py-2.5 font-headline text-sm text-starchart transition-colors hover:text-star hover:bg-white/5',
                  focusRing
                )}
              >
                <span className="text-star mr-1.5">🕹️</span> Arcade (Void Miner)
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
