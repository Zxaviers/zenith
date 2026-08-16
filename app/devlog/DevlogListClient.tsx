'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { PixelPanel } from '@/components/ui/PixelPanel'
import type { DevlogPost } from '@/lib/data/devlogPosts'

export function DevlogListClient({ posts }: { posts: DevlogPost[] }) {
  const reducedMotion = useReducedMotion() ?? false

  return (
    <div className="space-y-6">
      {posts.map((post, idx) => (
        <motion.div
          key={post.slug}
          initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: idx * 0.15 }}
          viewport={{ once: true, margin: '-50px' }}
        >
          <Link href={`/devlog/${post.slug}`} className="block group">
            <motion.div
              whileHover={reducedMotion ? {} : { y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <PixelPanel
                variant="nebula"
                className="text-left transition-all group-hover:shadow-[4px_4px_12px_rgba(0,245,196,0.2)]"
                style={{
                  border: '2px solid rgba(255,255,255,0.1)',
                }}
              >
                <p className="mb-1 font-stat text-xs" style={{ color: 'var(--color-ink-muted)' }}>
                  {post.date}
                </p>
                <h2 className="mb-2 font-display text-sm" style={{ color: 'var(--color-teal)' }}>
                  {post.title}
                </h2>
                <p className="font-body text-base md:text-lg" style={{ color: 'var(--color-ink)' }}>
                  {post.excerpt}
                </p>
                {post.tags && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded px-2 py-1 font-stat text-[10px]"
                        style={{
                          background: 'var(--color-void-deep)',
                          color: 'var(--color-teal)',
                          border: '1px solid rgba(0,245,196,0.3)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </PixelPanel>
            </motion.div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
