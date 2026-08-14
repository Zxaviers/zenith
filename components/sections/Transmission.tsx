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
      setError('All transmission coordinates are required before uplink dispatch.')
      return
    }
    if (!emailPattern.test(email)) {
      setStatus('error')
      setError('Invalid return frequency format. Please verify your email address.')
      return
    }

    setStatus('submitting')
    setError('')

    const subject = encodeURIComponent(`[ZENITH TRANSMISSION] From ${name}`)
    const body = encodeURIComponent(`${message}\n\n— Operator Callsign: ${name}\n— Return Frequency: ${email}`)
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`

    setTimeout(() => {
      setStatus('success')
      form.reset()
    }, 600)
  }

  return (
    <section id="send-a-transmission" className="relative px-4 sm:px-6 py-24 text-center scroll-mt-24">
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
          Direct com-link terminal &amp; orbital communication uplink
        </p>
      </motion.div>

      <div className="mx-auto max-w-2xl">
        <PixelPanel variant="nebula" className="text-left border-2 border-star shadow-[6px_6px_0_0_#000] p-6 md:p-8 glint-top">
          {/* Header Telemetry Status Bar */}
          <div className="mb-6 flex flex-wrap items-center justify-between border-b-2 border-white/10 pb-4 gap-2">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-aurora animate-pulse" />
              <span className="font-display text-xs text-star">
                COM-CHANNEL // OPEN UPLINK
              </span>
            </div>
            <span className="font-stat text-xs text-aurora font-bold">
              FREQ: 142.85 MHz // ACTIVE
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label htmlFor="name" className="mb-1.5 block font-display text-xs text-star">
                CALLSIGN (YOUR NAME)
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="e.g. Commander Shepard"
                className="w-full rounded border-2 border-white/20 bg-void/90 px-4 py-3 font-body text-starchart placeholder:text-starchart/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-star"
                onChange={() => status === 'error' && setStatus('idle')}
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block font-display text-xs text-star">
                RETURN FREQUENCY (YOUR EMAIL)
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="operator@domain.com"
                className="w-full rounded border-2 border-white/20 bg-void/90 px-4 py-3 font-body text-starchart placeholder:text-starchart/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-star"
                onChange={() => status === 'error' && setStatus('idle')}
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-1.5 block font-display text-xs text-star">
                TRANSMISSION PAYLOAD (MESSAGE)
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                placeholder="Enter encrypted or plain-text payload..."
                className="w-full rounded border-2 border-white/20 bg-void/90 px-4 py-3 font-body text-starchart placeholder:text-starchart/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-star"
                onChange={() => status === 'error' && setStatus('idle')}
              />
            </div>

            {status === 'error' && (
              <motion.div
                role="alert"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded bg-comet/20 border-2 border-comet p-3 font-stat text-xs md:text-sm text-comet font-bold"
              >
                ⚠ ERROR: {error}
              </motion.div>
            )}

            {status === 'success' && (
              <motion.div
                role="status"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded bg-aurora/20 border-2 border-aurora p-3 font-stat text-xs md:text-sm text-aurora font-bold"
              >
                ✓ SUCCESS: Uplink payload dispatched to email client!
              </motion.div>
            )}

            <PixelButton
              type="submit"
              variant="comet"
              disabled={status === 'submitting'}
              className="w-full py-4 text-xs font-bold font-display uppercase tracking-wider"
            >
              {status === 'submitting' ? 'DISPATCHING SIGNAL...' : '📡 DISPATCH TRANSMISSION'}
            </PixelButton>
          </form>
        </PixelPanel>

        {/* Download CV & Social Channels */}
        <div className="mt-10 flex flex-col items-center gap-6">
          <a href="/CV-Rizky-Mardhani.pdf" download="CV-Rizky-Mardhani.pdf">
            <PixelButton variant="ghost" className="px-6 py-3 text-xs font-display">
              📄 Download Flight Curriculum (CV)
            </PixelButton>
          </a>

          <div className="flex justify-center gap-6 pt-2">
            <a
              href="https://github.com/zxaviers"
              className="rounded-full bg-void p-3 border-2 border-star/40 transition-all hover:border-star hover:scale-110 shadow-[2px_2px_0_0_#000]"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
            >
              <Image src="/sprites/github.png" alt="" width={32} height={32} className="h-8 w-8 pixel-asset" />
            </a>
            <a
              href="https://linkedin.com/in/rizky-mardhani1st"
              className="rounded-full bg-void p-3 border-2 border-star/40 transition-all hover:border-star hover:scale-110 shadow-[2px_2px_0_0_#000]"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
            >
              <Image src="/sprites/linkedin.png" alt="" width={32} height={32} className="h-8 w-8 pixel-asset" />
            </a>
            <a
              href="https://instagram.com/sza.vy1st"
              className="rounded-full bg-void p-3 border-2 border-star/40 transition-all hover:border-star hover:scale-110 shadow-[2px_2px_0_0_#000]"
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
