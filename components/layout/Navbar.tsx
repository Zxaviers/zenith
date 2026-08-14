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
        {/* Cozy Rounded Adventure Navbar */}
        <nav
          aria-label="Zenith Navigation Bar"
          className="flex items-center justify-between px-4 py-2.5 rounded-2xl border border-star/40 bg-nebula/90 shadow-[0_4px_20px_rgba(0,0,0,0.35)] backdrop-blur-md"
        >
          {/* Brand / Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus:outline-none"
            aria-label="Zenith Homepage"
          >
            <div className="relative rounded-xl bg-void p-1.5 border border-star/60 group-hover:border-star transition-colors shadow-sm">
              <Image
                src="/sprites/black.png"
                alt=""
                width={24}
                height={24}
                className="h-6 w-6 pixel-asset"
                priority
              />
            </div>
            <span className="font-display text-sm md:text-base text-star tracking-wider group-hover:text-comet transition-colors">
              Zenith
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1.5 bg-void/80 px-2 py-1.5 rounded-xl border border-white/10 shadow-inner">
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
                      ? 'bg-comet text-void font-bold shadow-sm'
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
                'px-3.5 py-1.5 rounded-lg text-xs font-display transition-all duration-200 whitespace-nowrap',
                pathname?.startsWith('/devlog')
                  ? 'bg-comet text-void font-bold shadow-sm'
                  : 'text-starchart/80 hover:text-star hover:bg-white/5'
              )}
            >
              Devlog
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="px-3.5 py-1.5 rounded-xl bg-void border border-star/60 text-star font-display text-xs hover:border-star hover:text-comet transition-colors shadow-sm"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? '✕ Close' : '☰ Menu'}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 p-4 rounded-2xl border border-star/40 bg-void/95 shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl flex flex-col gap-2 pointer-events-auto">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className="px-4 py-2.5 rounded-xl border border-white/5 bg-nebula/70 font-display text-xs text-starchart hover:text-star hover:bg-nebula transition-colors"
              >
                ✦ {link.label}
              </a>
            ))}
            <Link
              href="/devlog"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl border border-white/5 bg-nebula/70 font-display text-xs text-starchart hover:text-star hover:bg-nebula transition-colors"
            >
              ✦ Devlog
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
