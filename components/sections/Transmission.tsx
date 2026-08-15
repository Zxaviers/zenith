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
    const name    = (form.elements.namedItem('name')    as HTMLInputElement).value.trim()
    const email   = (form.elements.namedItem('email')   as HTMLInputElement).value.trim()
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim()

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!name || !email || !message) {
      setStatus('error')
      setError('Please fill in all fields before sending.')
      return
    }
    if (!emailPattern.test(email)) {
      setStatus('error')
      setError('That email doesn\'t look right — please double-check it.')
      return
    }

    setStatus('submitting')
    setError('')

    const subject = encodeURIComponent(`[Zenith] Message from ${name}`)
    const body    = encodeURIComponent(`${message}\n\n— ${name}\n— ${email}`)
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
        <h2 className="font-display text-2xl md:text-3xl" style={{ color: 'var(--color-ink)' }}>
          Send a Transmission
        </h2>
        <p className="mt-2 font-body text-base md:text-lg" style={{ color: 'var(--color-ink-muted)' }}>
          Have a project idea, collaboration, or just want to say hi? I&apos;d love to hear from you.
        </p>
      </motion.div>

      <div className="mx-auto max-w-2xl">
        <PixelPanel variant="nebula" className="text-left shadow-[6px_6px_0_0_#000] p-6 md:p-8">
          {/* Status indicator — simple, no fake freq/uplink jargon */}
          <div className="mb-6 flex flex-wrap items-center justify-between border-b border-white/10 pb-4 gap-2">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full animate-pulse" style={{ background: 'var(--color-teal)' }} />
              <span className="font-display text-xs" style={{ color: 'var(--color-teal)' }}>
                Contact Form · Open
              </span>
            </div>
            <span className="font-stat text-xs font-bold" style={{ color: 'var(--color-ink-muted)' }}>
              {CONTACT_EMAIL}
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Name */}
            <div>
              <label htmlFor="name" className="mb-1.5 block font-display text-xs" style={{ color: 'var(--color-teal)' }}>
                Your Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="e.g. Ada Lovelace"
                className="w-full rounded px-4 py-3 font-body transition-all focus-visible:outline focus-visible:outline-2"
                style={{
                  background: 'var(--color-void-deep)',
                  color: 'var(--color-ink)',
                  border: '2px solid rgba(255,255,255,0.15)',
                  outlineColor: 'var(--color-teal)',
                }}
                onChange={() => status === 'error' && setStatus('idle')}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="mb-1.5 block font-display text-xs" style={{ color: 'var(--color-teal)' }}>
                Your Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full rounded px-4 py-3 font-body transition-all focus-visible:outline focus-visible:outline-2"
                style={{
                  background: 'var(--color-void-deep)',
                  color: 'var(--color-ink)',
                  border: '2px solid rgba(255,255,255,0.15)',
                  outlineColor: 'var(--color-teal)',
                }}
                onChange={() => status === 'error' && setStatus('idle')}
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="mb-1.5 block font-display text-xs" style={{ color: 'var(--color-teal)' }}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                placeholder="What's on your mind?"
                className="w-full rounded px-4 py-3 font-body transition-all focus-visible:outline focus-visible:outline-2"
                style={{
                  background: 'var(--color-void-deep)',
                  color: 'var(--color-ink)',
                  border: '2px solid rgba(255,255,255,0.15)',
                  outlineColor: 'var(--color-teal)',
                }}
                onChange={() => status === 'error' && setStatus('idle')}
              />
            </div>

            {/* Error */}
            {status === 'error' && (
              <motion.div
                role="alert"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded p-3 font-stat text-xs md:text-sm font-bold"
                style={{ background: 'rgba(255,107,157,0.15)', border: '2px solid var(--color-pink)', color: 'var(--color-pink)' }}
              >
                ⚠ {error}
              </motion.div>
            )}

            {/* Success */}
            {status === 'success' && (
              <motion.div
                role="status"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded p-3 font-stat text-xs md:text-sm font-bold"
                style={{ background: 'rgba(0,245,196,0.12)', border: '2px solid var(--color-teal)', color: 'var(--color-teal)' }}
              >
                ✓ Message sent! Your email client should open shortly.
              </motion.div>
            )}

            <PixelButton
              type="submit"
              variant="comet"
              disabled={status === 'submitting'}
              className="w-full py-4 text-xs font-bold font-display uppercase tracking-wider"
            >
              {status === 'submitting' ? 'Opening email client...' : '📡 Send Message'}
            </PixelButton>
          </form>
        </PixelPanel>

        {/* Social links — Bagian 4: consistent pixel-border badges for all icons */}
        <div className="mt-10 flex flex-col items-center gap-6">
          <a href="/CV-Rizky-Mardhani.pdf" download="CV-Rizky-Mardhani.pdf">
            <PixelButton variant="ghost" className="px-6 py-3 text-xs font-display">
              📄 Download CV
            </PixelButton>
          </a>

          <div className="flex justify-center gap-4 pt-2">
            {[
              { href: 'https://github.com/zxaviers',                 src: '/sprites/github.png',    label: 'GitHub' },
              { href: 'https://linkedin.com/in/rizky-mardhani1st',   src: '/sprites/linkedin.png',  label: 'LinkedIn' },
              { href: 'https://instagram.com/sza.vy1st',             src: '/sprites/Instagram.png', label: 'Instagram' },
            ].map(({ href, src, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label} Profile`}
                className="flex flex-col items-center gap-1 group"
              >
                {/* Consistent pixel-border badge — same style for all 3 icons (Bagian 4 fix) */}
                <div
                  className="rounded-xl p-2.5 transition-all group-hover:scale-110"
                  style={{
                    background: 'var(--color-void-deep)',
                    border: '2px solid rgba(0,245,196,0.3)',
                    boxShadow: '2px 2px 0 0 #000',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,245,196,0.7)' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,245,196,0.3)' }}
                >
                  <Image src={src} alt="" width={28} height={28} className="h-7 w-7 pixel-asset" />
                </div>
                <span className="font-stat text-[9px]" style={{ color: 'var(--color-ink-muted)' }}>{label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
