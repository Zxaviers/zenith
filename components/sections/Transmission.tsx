'use client'

import { useState, type FormEvent } from 'react'
import Image from 'next/image'
import { PixelPanel } from '@/components/ui/PixelPanel'
import { PixelButton } from '@/components/ui/PixelButton'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const CONTACT_EMAIL = 'riskimardhani@gmail.com'

/**
 * Ported from src/Sections/Contact.jsx, which only had social links + a CV
 * download — no actual contact form. ZENITH_PLAYBOOK.md Fase 4 §6 asks for
 * a real form with basic validation and loading/success/error states, so
 * this is new functionality layered on top of the ported content.
 *
 * There's no backend/email API wired up here, so "sending" opens the
 * visitor's own mail client via a mailto: link (pre-filled) rather than
 * faking an async network call — that would be dishonest about what's
 * actually happening. The loading/error states below are for form
 * validation feedback, not a simulated server round-trip.
 */
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
      setError('All fields are required.')
      return
    }
    if (!emailPattern.test(email)) {
      setStatus('error')
      setError('That email address doesn’t look valid.')
      return
    }

    setStatus('submitting')
    setError('')

    const subject = encodeURIComponent(`Transmission from ${name}`)
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`)
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`

    // Brief delay purely for the "transmitting..." feel before confirming —
    // the mail client handoff above is effectively synchronous.
    setTimeout(() => {
      setStatus('success')
      form.reset()
    }, 700)
  }

  return (
    <section id="send-a-transmission" className="relative px-6 py-20 text-center scroll-mt-24">
      <h2 className="mb-8 font-display text-2xl text-starchart">Send a Transmission</h2>

      <PixelPanel variant="nebula" className="mx-auto max-w-xl text-left">
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="name" className="mb-1 block font-stat text-lg text-starchart/80">
              Callsign (name)
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              className="w-full rounded-sm border border-white/20 bg-void px-3 py-2 font-body text-starchart focus-visible:outline focus-visible:outline-2 focus-visible:outline-aurora"
              onChange={() => status === 'error' && setStatus('idle')}
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block font-stat text-lg text-starchart/80">
              Return frequency (email)
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="w-full rounded-sm border border-white/20 bg-void px-3 py-2 font-body text-starchart focus-visible:outline focus-visible:outline-2 focus-visible:outline-aurora"
              onChange={() => status === 'error' && setStatus('idle')}
            />
          </div>

          <div>
            <label htmlFor="message" className="mb-1 block font-stat text-lg text-starchart/80">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="w-full rounded-sm border border-white/20 bg-void px-3 py-2 font-body text-starchart focus-visible:outline focus-visible:outline-2 focus-visible:outline-aurora"
              onChange={() => status === 'error' && setStatus('idle')}
            />
          </div>

          {status === 'error' && (
            <p role="alert" className="font-body text-sm text-comet">
              {error}
            </p>
          )}
          {status === 'success' && (
            <p role="status" className="font-body text-sm text-aurora">
              Transmission handed off to your mail client. Signal received!
            </p>
          )}

          <PixelButton
            type="submit"
            variant="comet"
            disabled={status === 'submitting'}
            className="w-full"
          >
            {status === 'submitting' ? 'Transmitting…' : 'Send'}
          </PixelButton>
        </form>
      </PixelPanel>

      <a
        href="/CV-Rizky-Mardhani.pdf"
        download
        className="mt-8 inline-block"
      >
        <PixelButton variant="ghost">Download CV</PixelButton>
      </a>

      <div className="mt-12 flex justify-center gap-8">
        <a
          href="https://github.com/zxaviers"
          className="opacity-90 transition-opacity duration-300 hover:opacity-70"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Profile"
        >
          <Image src="/sprites/github.png" alt="GitHub" width={40} height={40} className="h-10 w-10 pixel-asset" />
        </a>
        <a
          href="https://linkedin.com/in/rizky-mardhani1st"
          className="opacity-90 transition-opacity duration-300 hover:opacity-70"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn Profile"
        >
          <Image src="/sprites/linkedin.png" alt="LinkedIn" width={40} height={40} className="h-10 w-10 pixel-asset" />
        </a>
        <a
          href="https://instagram.com/sza.vy1st"
          className="opacity-90 transition-opacity duration-300 hover:opacity-70"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram Profile"
        >
          <Image src="/sprites/Instagram.png" alt="Instagram" width={40} height={40} className="h-10 w-10 pixel-asset" />
        </a>
      </div>
    </section>
  )
}
