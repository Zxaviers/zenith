'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

const MENU_ITEMS = [
  { label: 'Home', id: 'home' },
  { label: 'Mission Control', id: 'mission-control' },
  { label: 'Constellation', id: 'constellation' },
  { label: 'Flight Path', id: 'flight-path' },
  { label: 'Mission Log', id: 'mission-log' },
  { label: 'Send a Transmission', id: 'send-a-transmission' },
]

export function Navbar() {
  const [active, setActive] = useState('home')
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const smoothScrollTo = (targetY: number, duration = 800) => {
    const startY = window.scrollY
    const distance = targetY - startY
    let startTime: number | null = null

    const step = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = currentTime - startTime
      const percent = Math.min(progress / duration, 1)
      const ease =
        percent < 0.5
          ? 4 * percent * percent * percent
          : 1 - Math.pow(-2 * percent + 2, 3) / 2
      window.scrollTo(0, startY + distance * ease)
      if (percent < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }

  const handleScroll = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const yOffset = -90
      const targetY = el.getBoundingClientRect().top + window.pageYOffset + yOffset
      smoothScrollTo(targetY, 800)
    }
  }

  const handleNavClick = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault()
    setIsOpen(false)
    if (pathname === '/') {
      handleScroll(targetId)
    } else {
      router.push(`/#${targetId}`)
    }
  }

  useEffect(() => {
    if (pathname === '/' && window.location.hash) {
      const id = window.location.hash.replace('#', '')
      const timer = setTimeout(() => handleScroll(id), 60)
      return () => clearTimeout(timer)
    }
  }, [pathname])

  useEffect(() => {
    const sections = document.querySelectorAll('section')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { threshold: 0.5 }
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [pathname])

  const isDevlogActive = pathname?.startsWith('/devlog')

  return (
    <header className="fixed top-3 left-0 right-0 z-50 px-3 md:px-6 pointer-events-none">
      <nav
        aria-label="Main Mission HUD Navigation"
        className="mx-auto max-w-6xl pointer-events-auto flex items-center justify-between px-4 md:px-5 py-2.5 rounded-md border-2 border-star/40 bg-void/95 shadow-[0_6px_0_0_#0f0a20,0_0_16px_rgba(255,200,87,0.2)] backdrop-blur-md glint-top"
      >
        {/* HUD Brand Wordmark & Telemetry Status */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-aurora rounded"
            aria-label="Zenith Homepage"
          >
            <div className="relative rounded bg-nebula p-1 border border-star/40 group-hover:border-star transition-colors shadow-[2px_2px_0_0_#000]">
              <Image
                src="/sprites/black.png"
                alt=""
                width={26}
                height={26}
                className="h-6 w-6 pixel-asset"
                priority
              />
            </div>
            <span className="font-display text-sm md:text-base tracking-wider text-star group-hover:text-comet transition-colors">
              ZENITH
            </span>
          </Link>

          {/* Console Telemetry Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded bg-nebula/60 border border-white/10 font-stat text-[10px] text-aurora">
            <span className="h-1.5 w-1.5 rounded-full bg-aurora animate-pulse" />
            <span>SYS_OK // LIVE</span>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="font-display text-lg leading-none text-star xl:hidden px-2 py-1 rounded bg-nebula/80 border border-star/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-aurora"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close mission navigation menu' : 'Open mission navigation menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? '✕' : '☰ HUD'}
        </button>

        {/* HUD Navigation Items List */}
        <ul
          className={cn(
            'absolute left-3 right-3 top-[125%] z-40 flex-col rounded-md border-2 border-star/40 bg-void/95 p-4 shadow-[0_8px_0_0_#0f0a20] transition-all duration-300 ease-in-out backdrop-blur-xl',
            'xl:static xl:flex xl:w-auto xl:flex-row xl:items-center xl:gap-1 xl:bg-transparent xl:p-0 xl:border-none xl:shadow-none',
            isOpen ? 'flex' : 'hidden xl:flex'
          )}
        >
          {MENU_ITEMS.map((item) => {
            const isActive = pathname === '/' && active === item.id
            return (
              <li key={item.id} className="relative py-1 xl:py-0">
                <a
                  href={`/#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'flex items-center gap-1.5 rounded px-2.5 py-1.5 font-display text-[10px] md:text-[11px] tracking-wide transition-all duration-150 active:translate-y-0.5',
                    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-aurora',
                    isActive
                      ? 'bg-nebula text-star border border-star/50 shadow-[2px_2px_0_0_#000]'
                      : 'text-starchart/80 hover:text-star hover:bg-nebula/40'
                  )}
                >
                  {isActive && <span className="h-1.5 w-1.5 rounded-full bg-aurora animate-pulse" />}
                  {item.label}
                </a>
              </li>
            )
          })}

          {/* Devlog Nav Link */}
          <li className="relative py-1 xl:py-0 xl:ml-1.5 xl:pl-2 xl:border-l xl:border-white/15">
            <Link
              href="/devlog"
              onClick={() => setIsOpen(false)}
              aria-current={isDevlogActive ? 'page' : undefined}
              className={cn(
                'flex items-center gap-1.5 rounded px-2.5 py-1.5 font-display text-[10px] md:text-[11px] tracking-wide transition-all duration-150 active:translate-y-0.5',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-aurora',
                isDevlogActive
                  ? 'bg-nebula text-comet border border-comet/50 shadow-[2px_2px_0_0_#000]'
                  : 'text-starchart/80 hover:text-comet hover:bg-nebula/40'
              )}
            >
              {isDevlogActive && <span className="h-1.5 w-1.5 rounded-full bg-comet animate-pulse" />}
              Devlog
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
