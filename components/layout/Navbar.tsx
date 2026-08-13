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
  { label: 'Transmission', id: 'send-a-transmission' },
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
    <header className="fixed top-3 left-0 right-0 z-50 px-4 md:px-6 pointer-events-none">
      <nav
        aria-label="Main Mission Navigation"
        className="mx-auto max-w-5xl pointer-events-auto flex items-center justify-between px-5 py-2.5 rounded-lg border border-star/40 bg-void/90 shadow-2xl backdrop-blur-md"
        style={{
          boxShadow: '0 8px 32px 0 rgba(27, 18, 53, 0.8), 0 0 12px 1px rgba(255, 200, 87, 0.15)',
        }}
      >
        {/* Brand Wordmark & Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-aurora rounded"
          aria-label="Zenith Homepage"
        >
          <div className="relative rounded bg-void/90 p-1 border border-star/30 group-hover:border-star transition-colors">
            <Image
              src="/sprites/black.png"
              alt=""
              width={28}
              height={28}
              className="h-7 w-7 pixel-asset"
              priority
            />
          </div>
          <span className="font-display text-base tracking-wider text-starchart group-hover:text-star transition-colors">
            ZENITH
          </span>
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="text-2xl leading-none text-star xl:hidden p-1 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-aurora"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close mission navigation menu' : 'Open mission navigation menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? '✕' : '☰'}
        </button>

        {/* Navigation Items List */}
        <ul
          className={cn(
            'absolute left-4 right-4 top-[120%] z-40 flex-col rounded-lg border border-star/30 bg-void/95 p-4 shadow-2xl transition-all duration-300 ease-in-out backdrop-blur-lg',
            'xl:static xl:flex xl:w-auto xl:flex-row xl:items-center xl:gap-1.5 xl:bg-transparent xl:p-0 xl:border-none xl:shadow-none',
            isOpen ? 'flex' : 'hidden xl:flex'
          )}
        >
          {MENU_ITEMS.map((item) => {
            const isActive = pathname === '/' && active === item.id
            return (
              <li key={item.id} className="relative py-1.5 xl:py-0">
                <a
                  href={`/#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'flex items-center gap-1.5 rounded px-3 py-1.5 font-display text-[11px] transition-all duration-200',
                    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-aurora',
                    isActive
                      ? 'bg-nebula/80 text-star shadow-inner border border-star/30'
                      : 'text-starchart/80 hover:text-starchart hover:bg-white/5'
                  )}
                >
                  {isActive && <span className="h-1.5 w-1.5 rounded-full bg-aurora animate-pulse" />}
                  {item.label}
                </a>
              </li>
            )
          })}

          {/* Devlog Nav Link */}
          <li className="relative py-1.5 xl:py-0 xl:ml-2 xl:pl-2 xl:border-l xl:border-white/10">
            <Link
              href="/devlog"
              onClick={() => setIsOpen(false)}
              aria-current={isDevlogActive ? 'page' : undefined}
              className={cn(
                'flex items-center gap-1.5 rounded px-3 py-1.5 font-display text-[11px] transition-all duration-200',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-aurora',
                isDevlogActive
                  ? 'bg-nebula/80 text-comet shadow-inner border border-comet/30'
                  : 'text-starchart/80 hover:text-starchart hover:bg-white/5'
              )}
            >
              {isDevlogActive && <span className="h-1.5 w-1.5 rounded-full bg-comet" />}
              Devlog
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
