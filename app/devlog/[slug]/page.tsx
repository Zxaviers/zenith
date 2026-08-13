import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PixelPanel } from '@/components/ui/PixelPanel'
import { devlogPosts } from '@/lib/data/devlogPosts'

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
  return { title: `${post.title} | Zenith Devlog` }
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
    <section className="relative px-6 py-24">
      <PixelPanel variant="nebula" className="mx-auto max-w-3xl text-left">
        <Link href="/devlog" className="mb-6 inline-block font-display text-xs text-comet hover:text-starchart">
          {'< Back to Devlog'}
        </Link>

        <p className="mb-1 font-stat text-xs text-starchart/80">{post.date}</p>
        <h1 className="mb-6 font-display text-xl text-starchart md:text-2xl">{post.title}</h1>

        {post.tags && (
          <div className="mb-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-sm bg-void px-2 py-1 font-stat text-xs text-star">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="space-y-4">
          {post.content.map((paragraph, i) => (
            <p key={i} className="font-body text-lg leading-relaxed text-starchart/90 md:text-xl">
              {paragraph}
            </p>
          ))}
        </div>
      </PixelPanel>
    </section>
  )
}
