'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const MENU_ITEMS = [
  'Home',
  'Mission Control',
  'Constellation',
  'Flight Path',
  'Mission Log',
  'Send a Transmission',
]

function slugify(label: string) {
  return label.toLowerCase().replace(/\s+/g, '-')
}

/**
 * Ported from src/Sections/Navbar.jsx (Vite/react-router) to Next's App
 * Router. Same behavior: smooth-scrolls to in-page sections when already
 * on "/", navigates to "/#id" first when on another route (devlog, project
 * case study, etc).
 */
export function Navbar() {
  const [active, setActive] = useState('home')
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const smoothScrollTo = (targetY: number, duration = 1000) => {
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
      const yOffset = -80
      const targetY = el.getBoundingClientRect().top + window.pageYOffset + yOffset
      smoothScrollTo(targetY, 1000)
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

  // After navigating to "/#id" from another route, wait for the section
  // to render then scroll to it.
  useEffect(() => {
    if (pathname === '/' && window.location.hash) {
      const id = window.location.hash.replace('#', '')
      const timer = setTimeout(() => handleScroll(id), 50)
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
      { threshold: 0.6 }
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [pathname])

  const isDevlogActive = pathname?.startsWith('/devlog')

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-white/10 bg-void/90 px-8 py-4">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/sprites/black.png" alt="Logo" width={48} height={48} className="h-12 w-12 pixel-asset" />
        <h1 className="font-display text-lg text-starchart">Zenith</h1>
      </Link>

      <button
        className="text-3xl leading-none text-nebula xl:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        {isOpen ? '✕' : '☰'}
      </button>

      <ul
        className={`absolute left-0 right-0 top-full z-40 w-full flex-col bg-void/95 p-4 transition-all duration-300 ease-in-out overflow-hidden
        xl:static xl:flex xl:w-auto xl:flex-row xl:items-center xl:gap-6 xl:bg-transparent xl:p-0
        ${isOpen ? 'flex max-h-[400px] opacity-100' : 'max-h-0 opacity-0 xl:max-h-none xl:opacity-100'}`}
      >
        {MENU_ITEMS.map((item) => {
          const targetId = slugify(item)
          return (
            <li key={item} className="group relative py-2 xl:py-0">
              <a
                href={`/#${targetId}`}
                onClick={(e) => handleNavClick(e, targetId)}
                className={`rounded-md px-3 py-2 font-display text-[10px] transition-all duration-300 group-hover:text-starchart xl:text-[10px] ${
                  pathname === '/' && active === targetId ? 'text-comet' : 'text-starchart/80'
                }`}
              >
                {item}
              </a>
            </li>
          )
        })}

        <li className="group relative py-2 xl:py-0">
          <Link
            href="/devlog"
            onClick={() => setIsOpen(false)}
            className={`rounded-md px-3 py-2 font-display text-[10px] transition-all duration-300 group-hover:text-starchart ${
              isDevlogActive ? 'text-comet' : 'text-starchart/80'
            }`}
          >
            Devlog
          </Link>
        </li>
      </ul>
    </nav>
  )
}
