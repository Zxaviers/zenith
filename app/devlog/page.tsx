import type { Metadata } from 'next'
import Link from 'next/link'
import { PixelPanel } from '@/components/ui/PixelPanel'
import { devlogPosts } from '@/lib/data/devlogPosts'
import { DevlogListClient } from './DevlogListClient'

export const metadata: Metadata = {
  title: 'Devlog | Zenith',
}

export default function DevlogListPage() {
  return (
    <section className="relative px-6 py-24">
      <div className="relative z-10 mx-auto max-w-3xl">
        <h1 className="mb-2 text-center font-display text-2xl text-starchart md:text-3xl">
          Devlog
        </h1>
        <p className="mb-12 text-center font-body text-lg text-starchart/80">
          Mission logs from the build — notes on what I&apos;m learning and building.
        </p>

        <DevlogListClient posts={devlogPosts} />
      </div>
    </section>
  )
}
