'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Home',            id: 'home' },
  { label: 'Mission Control', id: 'mission-control' },
  { label: 'Constellation',   id: 'constellation' },
  { label: 'Flight Path',     id: 'flight-path' },
  { label: 'Mission Log',     id: 'mission-log' },
  { label: 'Transmission',    id: 'send-a-transmission' },
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
      const offsetPosition = elementRect - bodyRect - offset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
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
          if (entry.isIntersecting) setActiveSection(entry.target.id)
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

        {/* ── Main nav pill — Void Teal theme ── */}
        <nav
          aria-label="Zenith Navigation Bar"
          className="flex items-center justify-between px-4 py-2.5 rounded-2xl"
          style={{
            background: 'rgba(30, 16, 48, 0.88)',
            border: '1px solid rgba(0, 245, 196, 0.25)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.45), 0 0 0 1px rgba(0,245,196,0.08) inset',
            backdropFilter: 'blur(14px)',
          }}
        >
          {/* ── Brand / Logo ── */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus:outline-none"
            aria-label="Zenith Homepage"
          >
            {/* Engine-burst sprite as logo icon */}
            <div
              className="relative rounded-xl p-1.5 transition-all group-hover:scale-105"
              style={{
                background: 'rgba(0,245,196,0.1)',
                border: '1px solid rgba(0,245,196,0.35)',
                boxShadow: '0 0 10px rgba(0,245,196,0.2)',
              }}
            >
              {/* Static ship sprite used as logo — 48×48 at 1× */}
              <div
                className="pixel-asset"
                style={{
                  width: 24,
                  height: 24,
                  backgroundImage: 'url(/sprites/void/ship-base.png)',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: '0 0',
                  backgroundSize: '100% 100%',
                  imageRendering: 'pixelated',
                  filter: 'hue-rotate(180deg) saturate(1.4)',  /* tint ship to teal */
                }}
                aria-hidden="true"
              />
            </div>
            <span
              className="font-display text-sm md:text-base tracking-wider transition-colors"
              style={{ color: 'var(--color-teal)' }}
            >
              Zenith
            </span>
          </Link>

          {/* ── Desktop Nav Links ── */}
          <div
            className="hidden lg:flex items-center gap-1.5 px-2 py-1.5 rounded-xl"
            style={{
              background: 'rgba(19,13,26,0.6)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {NAV_LINKS.map((link) => {
              const isActive = pathname === '/' && activeSection === link.id
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={cn(
                    'px-3.5 py-1.5 rounded-lg text-xs font-display transition-all duration-200 cursor-pointer whitespace-nowrap',
                    isActive
                      ? 'font-bold shadow-sm'
                      : 'hover:bg-white/5'
                  )}
                  style={
                    isActive
                      ? {
                          background: 'var(--color-teal)',
                          color: 'var(--color-void-deep)',
                        }
                      : {
                          color: 'rgba(240,238,255,0.75)',
                        }
                  }
                >
                  {link.label}
                </a>
              )
            })}

            {/* Devlog */}
            <Link
              href="/devlog"
              className={cn(
                'px-3.5 py-1.5 rounded-lg text-xs font-display transition-all duration-200 whitespace-nowrap',
                pathname?.startsWith('/devlog')
                  ? 'font-bold shadow-sm'
                  : 'hover:bg-white/5'
              )}
              style={
                pathname?.startsWith('/devlog')
                  ? {
                      background: 'var(--color-teal)',
                      color: 'var(--color-void-deep)',
                    }
                  : {
                      color: 'rgba(240,238,255,0.75)',
                    }
              }
            >
              Devlog
            </Link>
          </div>

          {/* ── Mobile Menu Button ── */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="px-3.5 py-1.5 rounded-xl font-display text-xs transition-all"
              style={{
                background: 'rgba(19,13,26,0.8)',
                border: '1px solid rgba(0,245,196,0.4)',
                color: 'var(--color-teal)',
                boxShadow: mobileMenuOpen ? '0 0 10px rgba(0,245,196,0.3)' : 'none',
              }}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? '✕ Close' : '☰ Menu'}
            </button>
          </div>
        </nav>

        {/* ── Mobile Dropdown ── */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden mt-2 p-4 rounded-2xl flex flex-col gap-2 pointer-events-auto"
            style={{
              background: 'rgba(19,13,26,0.97)',
              border: '1px solid rgba(0,245,196,0.2)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className="px-4 py-2.5 rounded-xl font-display text-xs transition-all"
                style={{
                  border: '1px solid rgba(0,245,196,0.1)',
                  background: 'rgba(45,26,74,0.5)',
                  color: 'var(--color-ink)',
                }}
              >
                ✦ {link.label}
              </a>
            ))}
            <Link
              href="/devlog"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl font-display text-xs transition-all"
              style={{
                border: '1px solid rgba(0,245,196,0.1)',
                background: 'rgba(45,26,74,0.5)',
                color: 'var(--color-ink)',
              }}
            >
              ✦ Devlog
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
