import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PixelPanel } from '@/components/ui/PixelPanel'
import { devlogPosts } from '@/lib/data/devlogPosts'
import { siteConfig } from '@/lib/config/siteConfig'
import { GlobalStarfield } from '@/components/layout/GlobalStarfield'
import { Clock, ArrowLeft, Terminal, CheckCircle2, Home, Send } from 'lucide-react'

export function generateStaticParams() {
  return devlogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = devlogPosts.find((p) => p.slug === slug)
  if (!post) return {}
  return {
    title: `${post.title} | Zenith Devlog`,
    description: post.excerpt,
  }
}

export default async function DevlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = devlogPosts.find((p) => p.slug === slug)

  if (!post) notFound()

  return (
    <>
      <GlobalStarfield starCount={130} />
      <section className="relative z-10 px-4 sm:px-6 py-24 scroll-mt-24 min-h-screen">
      <div className="mx-auto max-w-3xl">
        {/* Top Navigation Links */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              href="/devlog"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--color-void-deep)] border border-white/15 font-display text-xs text-[var(--color-star)] hover:border-[var(--color-star)] transition-all shadow-[0_0_12px_rgba(255,200,87,0.15)]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>DAFTAR DEVLOG</span>
            </Link>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--color-void-deep)] border border-white/15 font-display text-xs text-[var(--color-starchart)] hover:text-[var(--color-star)] hover:border-[var(--color-star)] transition-all"
            >
              <Home className="h-3.5 w-3.5" />
              <span>BERANDA (HOME)</span>
            </Link>
          </div>

          <Link
            href="/arcade"
            className="hidden sm:inline-flex items-center gap-1.5 font-stat text-xs text-[var(--color-comet)] hover:underline"
          >
            <span>🕹️ Arcade Void Miner →</span>
          </Link>
        </div>

        <PixelPanel variant="nebula" className="p-6 md:p-10 text-left border-2 border-white/10 shadow-[8px_8px_0_0_#000]">
          {/* Meta header */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-3 font-stat text-xs text-[var(--color-ink-muted)]">
              <span>{post.date}</span>
              <span>·</span>
              <span className="flex items-center gap-1 text-[var(--color-star)]">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime}
              </span>
            </div>

            <span
              className="px-3 py-1 rounded-full font-stat text-xs font-bold border"
              style={{
                background: 'rgba(255, 139, 76, 0.15)',
                borderColor: 'rgba(255, 139, 76, 0.4)',
                color: 'var(--color-comet)',
              }}
            >
              {post.category}
            </span>
          </div>

          <h1 className="mb-6 font-display text-xl md:text-2xl text-[var(--color-star)] leading-snug">
            {post.title}
          </h1>

          {/* Tags */}
          {post.tags && (
            <div className="mb-8 flex flex-wrap gap-2 pb-6 border-b border-white/10">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded px-2.5 py-1 font-stat text-xs"
                  style={{
                    background: 'var(--color-void-deep)',
                    color: 'var(--color-starchart)',
                    border: '1px solid rgba(255, 200, 87, 0.3)',
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Paragraphs */}
          <div className="space-y-5 mb-8">
            {post.content.map((paragraph, i) => (
              <p
                key={i}
                className="font-body text-base md:text-lg leading-relaxed text-[var(--color-starchart)] opacity-95"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Code Snippet Block (if available) */}
          {post.codeSnippet && (
            <div className="my-8 rounded-lg bg-[var(--color-void-deep)] p-4 border border-white/10 font-stat text-xs shadow-inner">
              <div className="flex items-center justify-between mb-2.5 border-b border-white/10 pb-2">
                <div className="flex items-center gap-2 text-[var(--color-star)] font-bold">
                  <Terminal className="h-4 w-4" />
                  <span>KODE TEKNIS ({post.codeSnippet.language.toUpperCase()})</span>
                </div>
                <span className="text-[10px] text-[var(--color-aurora)]">PRODUKSI READY</span>
              </div>
              <pre className="p-4 rounded bg-[#0b0612] border border-black text-[var(--color-starchart)] overflow-x-auto text-xs leading-relaxed font-mono">
                <code>{post.codeSnippet.code}</code>
              </pre>
            </div>
          )}

          {/* Callout alert box (if available) */}
          {post.callout && (
            <div
              className="my-8 p-4 rounded-lg border flex items-start gap-3"
              style={{
                background: 'rgba(255, 200, 87, 0.08)',
                borderColor: 'rgba(255, 200, 87, 0.35)',
              }}
            >
              <CheckCircle2 className="h-5 w-5 text-[var(--color-star)] shrink-0 mt-0.5" />
              <div className="font-body text-sm text-[var(--color-starchart)] leading-relaxed">
                <span className="font-bold text-[var(--color-star)] font-display mr-1.5">
                  CATATAN TEKNIS:
                </span>
                {post.callout.text}
              </div>
            </div>
          )}

          {/* Author Signature Box */}
          <div className="mt-12 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 bg-[var(--color-void-deep)] p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-[var(--color-star)]/20 border border-[var(--color-star)] flex items-center justify-center text-lg">
                🚀
              </div>
              <div>
                <h4 className="font-display text-sm text-[var(--color-star)]">{siteConfig.name}</h4>
                <p className="font-stat text-xs text-[var(--color-ink-muted)]">
                  Computer Engineering · {siteConfig.university}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/#mission-log"
                className="px-3 py-1.5 rounded bg-[var(--color-nebula)] text-xs font-stat text-[var(--color-starchart)] hover:text-[var(--color-star)] border border-white/15 transition-colors"
              >
                Proyek Lainnya →
              </Link>
            </div>
          </div>

          {/* Bottom Dual Return Actions */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/devlog"
              className="inline-flex items-center gap-1.5 font-display text-xs text-[var(--color-star)] hover:underline"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Kembali ke Daftar Devlog</span>
            </Link>

            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[var(--color-void-deep)] border border-white/20 font-display text-xs text-[var(--color-starchart)] hover:text-[var(--color-star)] transition-colors"
              >
                <Home className="h-3.5 w-3.5" />
                <span>Beranda Utama</span>
              </Link>

              <Link
                href="/#send-a-transmission"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[var(--color-comet)] text-[var(--color-void)] font-display text-xs font-bold hover:scale-105 transition-transform"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Kirim Transmisi</span>
              </Link>
            </div>
          </div>
        </PixelPanel>
      </div>
    </section>
    </>
  )
}
