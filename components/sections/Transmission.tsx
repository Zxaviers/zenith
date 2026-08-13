'use client'

import { useState, type FormEvent } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { PixelPanel } from '@/components/ui/PixelPanel'
import { PixelButton } from '@/components/ui/PixelButton'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const CONTACT_EMAIL = 'riskimardhani@gmail.com'

export function Transmission() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim()
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim()
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim()

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!name || !email || !message) {
      setStatus('error')
      setError('All fields are required before transmission dispatch.')
      return
    }
    if (!emailPattern.test(email)) {
      setStatus('error')
      setError('Invalid frequency format. Please check your email address.')
      return
    }

    setStatus('submitting')
    setError('')

    const subject = encodeURIComponent(`[ZENITH TRANSMISSION] From ${name}`)
    const body = encodeURIComponent(`${message}\n\n— Callsign: ${name}\n— Frequency: ${email}`)
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`

    setTimeout(() => {
      setStatus('success')
      form.reset()
    }, 600)
  }

  return (
    <section id="send-a-transmission" className="relative px-6 py-20 text-center scroll-mt-24">
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="font-display text-2xl text-starchart md:text-3xl">
          Send a Transmission
        </h2>
        <p className="mt-2 font-body text-base text-starchart/80 md:text-lg">
          Establish direct radio communication frequency with operator
        </p>
      </motion.div>

      <div className="mx-auto max-w-2xl">
        <PixelPanel variant="nebula" className="text-left border border-star/40 shadow-2xl">
          {/* Header Bar */}
          <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-aurora animate-ping" />
              <span className="font-stat text-xs md:text-sm text-star">
                COM-CHANNEL // OPEN FREQUENCY
              </span>
            </div>
            <span className="font-stat text-xs text-starchart/60">
              TARGET: {CONTACT_EMAIL}
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label htmlFor="name" className="mb-1.5 block font-stat text-sm md:text-base text-starchart/90">
                CALLSIGN (YOUR NAME)
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="e.g. Commander Shepard"
                className="w-full rounded-sm border border-white/20 bg-void/90 px-4 py-2.5 font-body text-starchart placeholder:text-starchart/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-aurora"
                onChange={() => status === 'error' && setStatus('idle')}
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block font-stat text-sm md:text-base text-starchart/90">
                RETURN FREQUENCY (YOUR EMAIL)
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="operator@domain.com"
                className="w-full rounded-sm border border-white/20 bg-void/90 px-4 py-2.5 font-body text-starchart placeholder:text-starchart/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-aurora"
                onChange={() => status === 'error' && setStatus('idle')}
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-1.5 block font-stat text-sm md:text-base text-starchart/90">
                TRANSMISSION PAYLOAD (MESSAGE)
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                placeholder="Enter encrypted or plain-text payload..."
                className="w-full rounded-sm border border-white/20 bg-void/90 px-4 py-2.5 font-body text-starchart placeholder:text-starchart/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-aurora"
                onChange={() => status === 'error' && setStatus('idle')}
              />
            </div>

            {status === 'error' && (
              <motion.div
                role="alert"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded bg-comet/20 border border-comet/50 p-3 font-stat text-xs md:text-sm text-comet"
              >
                ⚠ ERROR: {error}
              </motion.div>
            )}

            {status === 'success' && (
              <motion.div
                role="status"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded bg-aurora/20 border border-aurora/50 p-3 font-stat text-xs md:text-sm text-aurora"
              >
                ✓ SUCCESS: Signal payload handed off to email client. Transmission sent!
              </motion.div>
            )}

            <PixelButton
              type="submit"
              variant="comet"
              disabled={status === 'submitting'}
              className="w-full py-3 text-sm"
            >
              {status === 'submitting' ? 'DISPATCHING SIGNAL...' : '📡 DISPATCH TRANSMISSION'}
            </PixelButton>
          </form>
        </PixelPanel>

        {/* Download CV & Communication Frequencies */}
        <div className="mt-10 flex flex-col items-center gap-6">
          <a href="/CV-Rizky-Mardhani.pdf" download="CV-Rizky-Mardhani.pdf">
            <PixelButton variant="ghost" className="px-6 py-2.5 text-xs">
              📄 Download Flight Curriculum (CV)
            </PixelButton>
          </a>

          <div className="flex justify-center gap-6 pt-2">
            <a
              href="https://github.com/zxaviers"
              className="rounded-full bg-void/90 p-2.5 border border-white/10 opacity-90 transition-all duration-300 hover:opacity-100 hover:border-star hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Developer Profile"
            >
              <Image src="/sprites/github.png" alt="" width={32} height={32} className="h-8 w-8 pixel-asset" />
            </a>
            <a
              href="https://linkedin.com/in/rizky-mardhani1st"
              className="rounded-full bg-void/90 p-2.5 border border-white/10 opacity-90 transition-all duration-300 hover:opacity-100 hover:border-star hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Professional Profile"
            >
              <Image src="/sprites/linkedin.png" alt="" width={32} height={32} className="h-8 w-8 pixel-asset" />
            </a>
            <a
              href="https://instagram.com/sza.vy1st"
              className="rounded-full bg-void/90 p-2.5 border border-white/10 opacity-90 transition-all duration-300 hover:opacity-100 hover:border-star hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Profile"
            >
              <Image src="/sprites/Instagram.png" alt="" width={32} height={32} className="h-8 w-8 pixel-asset" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
