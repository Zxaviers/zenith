'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Home', id: 'home' },
  { label: 'Mission Control', id: 'mission-control' },
  { label: 'Constellation', id: 'constellation' },
  { label: 'Flight Path', id: 'flight-path' },
  { label: 'Mission Log', id: 'mission-log' },
  { label: 'Transmission', id: 'send-a-transmission' },
]

export function Navbar() {
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const offset = 80
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = el.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    if (pathname === '/') {
      scrollToSection(id)
    } else {
      router.push(`/#${id}`)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 }
    )

    const sections = document.querySelectorAll('section[id]')
    sections.forEach((sec) => observer.observe(sec))

    return () => observer.disconnect()
  }, [pathname])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 py-3 md:px-6 md:py-4 pointer-events-none">
      <div className="mx-auto max-w-6xl pointer-events-auto">
        {/* Game HUD Console Bar */}
        <nav
          aria-label="Zenith Flight Navigation HUD"
          className="flex items-center justify-between px-4 py-2.5 rounded-lg border-2 border-star bg-nebula/95 shadow-[4px_4px_0_0_#000] backdrop-blur-md glint-top"
        >
          {/* Logo & Call Sign */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus:outline-none"
            aria-label="Zenith Homepage"
          >
            <div className="relative rounded bg-void p-1 border border-star/60 group-hover:border-star transition-colors shadow-[2px_2px_0_0_#000]">
              <Image
                src="/sprites/black.png"
                alt=""
                width={24}
                height={24}
                className="h-6 w-6 pixel-asset"
                priority
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display text-xs md:text-sm text-star tracking-wider group-hover:text-comet transition-colors">
                ZENITH
              </span>
              <span className="font-stat text-[10px] text-starchart/70 leading-none">
                ZXAVIERS // PILOT
              </span>
            </div>
          </Link>

          {/* Desktop HUD Nav Links */}
          <div className="hidden lg:flex items-center gap-1 bg-void/90 p-1 rounded-md border border-white/10 shadow-inner">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === '/' && activeSection === link.id
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={cn(
                    'px-3 py-1.5 rounded text-xs font-display transition-all duration-200 cursor-pointer whitespace-nowrap',
                    isActive
                      ? 'bg-comet text-void font-bold shadow-[2px_2px_0_0_#000]'
                      : 'text-starchart/80 hover:text-star hover:bg-white/5'
                  )}
                >
                  {link.label}
                </a>
              )
            })}

            {/* Devlog Nav Link */}
            <Link
              href="/devlog"
              className={cn(
                'px-3 py-1.5 rounded text-xs font-display transition-all duration-200 whitespace-nowrap',
                pathname?.startsWith('/devlog')
                  ? 'bg-comet text-void font-bold shadow-[2px_2px_0_0_#000]'
                  : 'text-starchart/80 hover:text-star hover:bg-white/5'
              )}
            >
              Devlog
            </Link>
          </div>

          {/* Right Status Badge & Mobile Hamburger */}
          <div className="flex items-center gap-2">
            {/* Live System Status Pill */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-void border border-aurora/40 font-stat text-xs text-aurora shadow-[2px_2px_0_0_#000]">
              <span className="h-2 w-2 rounded-full bg-aurora animate-pulse" />
              <span>SYS_OK // LIVE</span>
            </div>

            {/* Mobile Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden px-3 py-1.5 rounded bg-void border-2 border-star text-star font-display text-xs shadow-[2px_2px_0_0_#000]"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? '✕ CLOSE' : '☰ MENU'}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 p-4 rounded-lg border-2 border-star bg-void/98 shadow-[6px_6px_0_0_#000] backdrop-blur-xl flex flex-col gap-2 pointer-events-auto">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className="px-4 py-2.5 rounded border border-white/10 bg-nebula/60 font-display text-xs text-starchart hover:text-star hover:bg-nebula transition-colors"
              >
                ▸ {link.label}
              </a>
            ))}
            <Link
              href="/devlog"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded border border-white/10 bg-nebula/60 font-display text-xs text-starchart hover:text-star hover:bg-nebula transition-colors"
            >
              ▸ Devlog &amp; Intel
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
