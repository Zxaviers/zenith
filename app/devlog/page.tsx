import type { Metadata } from 'next'
import Link from 'next/link'
import { PixelPanel } from '@/components/ui/PixelPanel'
import { devlogPosts } from '@/lib/data/devlogPosts'

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
        <p className="mb-12 text-center font-body text-lg text-starchart/70">
          Mission logs from the build — notes on what I&apos;m learning and building.
        </p>

        <div className="space-y-6">
          {devlogPosts.map((post) => (
            <Link key={post.slug} href={`/devlog/${post.slug}`} className="block">
              <PixelPanel
                variant="nebula"
                className="text-left transition-transform hover:scale-[1.01]"
              >
                <p className="mb-1 font-stat text-xs text-starchart/60">{post.date}</p>
                <h2 className="mb-2 font-display text-sm text-comet">{post.title}</h2>
                <p className="font-body text-lg text-starchart/80 md:text-xl">{post.excerpt}</p>
                {post.tags && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-sm bg-void px-2 py-1 font-stat text-xs text-star"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </PixelPanel>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
