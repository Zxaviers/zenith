'use client'

import { useState, type FormEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { PixelPanel } from '@/components/ui/PixelPanel'
import { PixelButton } from '@/components/ui/PixelButton'
import { FormGroup } from '@/components/ui/FormGroup'
import { PixelInput, PixelTextarea } from '@/components/ui/PixelInput'
import { siteConfig } from '@/lib/config/siteConfig'
import { portfolioSounds } from '@/lib/audio/retroSounds'
import { BookOpen, Sparkles, Gamepad2, Rocket, CheckCircle, AlertTriangle, Send } from 'lucide-react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function Transmission() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const reducedMotion = useReducedMotion() ?? false

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim()
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim()
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim()
    const botcheck = (form.elements.namedItem('botcheck') as HTMLInputElement)?.checked

    // Client-side quick checks
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!name || !email || !message) {
      portfolioSounds.playBlip(300)
      setStatus('error')
      setErrorMessage('Harap isi semua kolom transmisi sebelum mengirim.')
      return
    }
    if (!emailPattern.test(email)) {
      portfolioSounds.playBlip(300)
      setStatus('error')
      setErrorMessage('Format alamat email tidak valid.')
      return
    }

    portfolioSounds.playBlip(750)
    setStatus('submitting')
    setErrorMessage('')
    setSuccessMessage('')

    try {
      const res = await fetch('/api/transmission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, botcheck }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Gagal mengirim transmisi ke stasiun relay.')
      }

      portfolioSounds.playStarSparkle()
      setStatus('success')
      setSuccessMessage(data.message || 'Transmisi berhasil dikirim dan dicatat!')
      form.reset()
    } catch (err: any) {
      portfolioSounds.playBlip(300)
      setStatus('error')
      setErrorMessage(err.message || 'Terjadi gangguan sinyal uplink. Silakan coba lagi.')
    }
  }

  return (
    <section id="send-a-transmission" className="relative px-4 sm:px-6 py-24 text-center scroll-mt-24">
      {/* ── Dual Gateway Reference Cards (Arcade & Devlog) ── */}
      <div className="mx-auto max-w-5xl mb-16 grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Arcade Gateway Card */}
        <Link
          href="/arcade"
          onClick={() => portfolioSounds.playStarSparkle()}
          className="group block text-left"
        >
          <PixelPanel
            variant="nebula"
            className="h-full p-5 border-2 border-[var(--color-star)]/40 hover:border-[var(--color-star)] transition-all shadow-[0_0_20px_rgba(255,200,87,0.15)] group-hover:shadow-[0_0_30px_rgba(255,200,87,0.3)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-stat text-[11px] text-[var(--color-star)] bg-[var(--color-void-deep)] border border-[var(--color-star)]/30">
                  <Gamepad2 className="h-3.5 w-3.5" />
                  <span>ARCADE SECTOR</span>
                </span>
                <span className="font-stat text-[10px] text-[var(--color-aurora)] animate-pulse">● LIVE PLAY</span>
              </div>

              <h3 className="font-display text-sm md:text-base text-[var(--color-star)] mb-1.5 flex items-center gap-1.5">
                <span>Void Miner: Asteroid Harvester</span>
                <Rocket className="h-3.5 w-3.5 text-[var(--color-comet)]" />
              </h3>
              <p className="font-body text-xs md:text-sm text-[var(--color-ink-muted)] leading-relaxed mb-4">
                Kemudikan pesawat tempur supersonik, tembak asteroid kristal kuantum dengan laser ganda ujung sayap, dan hadapi shrapnel berbahaya.
              </p>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="font-stat text-[11px] text-[var(--color-starchart)]">Zero-G Newtonian Physics</span>
              <span className="px-3.5 py-1.5 rounded bg-[var(--color-star)] text-[var(--color-void)] font-display text-[11px] font-bold shadow-[2px_2px_0_0_#000] group-hover:scale-105 transition-transform">
                Mainkan Arcade →
              </span>
            </div>
          </PixelPanel>
        </Link>

        {/* Devlog Gateway Card */}
        <Link
          href="/devlog"
          onClick={() => portfolioSounds.playBlip(700)}
          className="group block text-left"
        >
          <PixelPanel
            variant="nebula"
            className="h-full p-5 border-2 border-[var(--color-comet)]/40 hover:border-[var(--color-comet)] transition-all shadow-[0_0_20px_rgba(255,139,76,0.15)] group-hover:shadow-[0_0_30px_rgba(255,139,76,0.3)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-stat text-[11px] text-[var(--color-comet)] bg-[var(--color-void-deep)] border border-[var(--color-comet)]/30">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>RESEARCH LOGS</span>
                </span>
                <span className="font-stat text-[10px] text-[var(--color-star)]">3 ARTIKEL TEKNIS</span>
              </div>

              <h3 className="font-display text-sm md:text-base text-[var(--color-comet)] mb-1.5 flex items-center gap-1.5">
                <span>Engineering Devlogs & Research</span>
                <Sparkles className="h-3.5 w-3.5 text-[var(--color-star)]" />
              </h3>
              <p className="font-body text-xs md:text-sm text-[var(--color-ink-muted)] leading-relaxed mb-4">
                Catatan teknis integrasi ESP32 ADC 16-bit, arsitektur showcase web klien pcb-custom-malang, dan Web Audio API.
              </p>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="font-stat text-[11px] text-[var(--color-starchart)]">IoT & Web Engineering</span>
              <span className="px-3.5 py-1.5 rounded bg-[var(--color-comet)] text-[var(--color-void)] font-display text-[11px] font-bold shadow-[2px_2px_0_0_#000] group-hover:scale-105 transition-transform">
                Buka Devlog →
              </span>
            </div>
          </PixelPanel>
        </Link>
      </div>

      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="font-display text-2xl md:text-3xl text-[var(--color-starchart)]">
          Send a Transmission
        </h2>
        <p className="mt-2 font-body text-base md:text-lg text-[var(--color-ink-muted)]">
          Have a project idea, collaboration, or just want to say hi? I&apos;d love to hear from you.
        </p>
      </motion.div>

      <div className="mx-auto max-w-xl">
        <PixelPanel variant="nebula" className="p-6 md:p-8 shadow-[6px_6px_0_0_#000]">
          <form onSubmit={handleSubmit} noValidate className="space-y-6 text-left">
            {/* Hidden honeypot field for bot protection */}
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

            {status === 'error' && (
              <motion.div 
                className="p-3.5 bg-red-900/40 border border-red-500/50 rounded-lg font-stat text-xs text-red-200 flex items-start gap-2"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">STATUS TRANSMISI GAGAL: </span>
                  <span>{errorMessage}</span>
                </div>
              </motion.div>
            )}

            {status === 'success' && (
              <motion.div 
                className="p-3.5 bg-green-900/40 border border-green-500/50 rounded-lg font-stat text-xs text-green-200 flex items-start gap-2"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                <CheckCircle className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">TRANSMISI DITERIMA: </span>
                  <span>{successMessage}</span>
                </div>
              </motion.div>
            )}

            <FormGroup label="Agent / Name" htmlFor="name" required>
              <PixelInput
                id="name"
                name="name"
                placeholder="Nama Anda atau callsign..."
                required
                disabled={status === 'submitting'}
              />
            </FormGroup>

            <FormGroup label="Comm Frequency / Email" htmlFor="email" required>
              <PixelInput
                id="email"
                name="email"
                type="email"
                placeholder="nama@domain.com"
                required
                disabled={status === 'submitting'}
              />
            </FormGroup>

            <FormGroup label="Transmission Content / Message" htmlFor="message" required>
              <PixelTextarea
                id="message"
                name="message"
                placeholder="Tuliskan pesan transmisi atau tawaran kolaborasi Anda di sini..."
                required
                rows={4}
                disabled={status === 'submitting'}
              />
            </FormGroup>

            <div className="relative pt-2">
              <PixelButton
                type="submit"
                variant="comet"
                className="w-full py-4 text-xs font-bold font-display cursor-pointer"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? (
                  <span className="animate-pulse">⚡ Encoding & Dispatching Transmission...</span>
                ) : (
                  '📡 Send Transmission'
                )}
              </PixelButton>
              
              {/* Sending Animation Bar — GPU accelerated scaleX */}
              {status === 'submitting' && !reducedMotion && (
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--color-star)] z-20 origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
            </div>
          </form>
        </PixelPanel>

        {/* Social links */}
        <div className="mt-10 flex flex-col items-center gap-6">
          <a href="/CV-Rizky-Mardhani.pdf" download="CV-Rizky-Mardhani.pdf">
            <PixelButton variant="ghost" className="px-6 py-3 text-xs font-display">
              📄 Download CV
            </PixelButton>
          </a>

          <div className="flex justify-center gap-4 pt-2">
            {[
              { href: siteConfig.socials.github,    src: '/sprites/github.png',    label: 'GitHub' },
              { href: siteConfig.socials.linkedin,  src: '/sprites/linkedin.png',  label: 'LinkedIn' },
              { href: siteConfig.socials.instagram, src: '/sprites/Instagram.png', label: 'Instagram' },
            ].map(({ href, src, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label} Profile`}
                className="flex flex-col items-center gap-1 group"
              >
                <div
                  className="rounded-xl p-2.5 transition-all group-hover:scale-110"
                  style={{
                    background: 'var(--color-void-deep)',
                    border: '2px solid rgba(255, 200, 87, 0.3)',
                    boxShadow: '2px 2px 0 0 #000',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 200, 87, 0.7)' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 200, 87, 0.3)' }}
                >
                  <Image src={src} alt="" width={28} height={28} className="h-7 w-7 pixel-asset" />
                </div>
                <span className="font-stat text-[9px] text-[var(--color-ink-muted)]">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
