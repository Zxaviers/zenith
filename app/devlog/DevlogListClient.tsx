'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { PixelPanel } from '@/components/ui/PixelPanel'
import { portfolioSounds } from '@/lib/audio/retroSounds'
import type { DevlogPost } from '@/lib/data/devlogPosts'
import { cn } from '@/lib/utils'
import { Clock, Tag, BookOpen, Sparkles } from 'lucide-react'

const CATEGORIES = ['Semua', 'IoT & Embedded', 'Web Engineering', 'Game & Audio'] as const
type CategoryFilter = typeof CATEGORIES[number]

export function DevlogListClient({ posts }: { posts: DevlogPost[] }) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('Semua')
  const reducedMotion = useReducedMotion() ?? false

  const filteredPosts = selectedCategory === 'Semua'
    ? posts
    : posts.filter((p) => p.category === selectedCategory)

  const handleCategorySelect = (cat: CategoryFilter) => {
    portfolioSounds.playSelect()
    setSelectedCategory(cat)
  }

  return (
    <div className="space-y-8">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 pb-2">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat
          return (
            <motion.button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={cn(
                'px-4 py-2 rounded-lg font-stat text-xs transition-all cursor-pointer select-none',
                isActive
                  ? 'bg-[var(--color-star)] text-[var(--color-void)] font-bold shadow-[0_0_15px_rgba(255,200,87,0.4)] border border-[var(--color-star)]'
                  : 'bg-[var(--color-void-surface)] text-[var(--color-starchart)] border border-white/10 hover:border-white/30'
              )}
              whileHover={reducedMotion ? {} : { scale: 1.05 }}
              whileTap={reducedMotion ? {} : { scale: 0.95 }}
            >
              <span>{cat}</span>
            </motion.button>
          )
        })}
      </div>

      {/* Post Cards Grid */}
      <div className="space-y-6">
        {filteredPosts.map((post, idx) => (
          <motion.div
            key={post.slug}
            initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
          >
            <Link
              href={`/devlog/${post.slug}`}
              onClick={() => portfolioSounds.playBlip(700)}
              className="block group"
            >
              <motion.div
                whileHover={reducedMotion ? {} : { y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <PixelPanel
                  variant="nebula"
                  className="p-6 text-left transition-all group-hover:shadow-[0_0_25px_rgba(255,200,87,0.25)] border-2 border-white/10 group-hover:border-[var(--color-star)]"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3 font-stat text-xs text-[var(--color-ink-muted)]">
                      <span>{post.date}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-[var(--color-star)]" />
                        {post.readTime}
                      </span>
                    </div>

                    <span
                      className="px-2.5 py-0.5 rounded-full font-stat text-[11px] font-bold border"
                      style={{
                        background: 'rgba(255, 139, 76, 0.15)',
                        borderColor: 'rgba(255, 139, 76, 0.4)',
                        color: 'var(--color-comet)',
                      }}
                    >
                      {post.category}
                    </span>
                  </div>

                  <h2 className="mb-3 font-display text-base md:text-lg text-[var(--color-star)] group-hover:text-[var(--color-star)] transition-colors leading-snug">
                    {post.title}
                  </h2>

                  <p className="font-body text-sm md:text-base leading-relaxed text-[var(--color-starchart)] opacity-90 mb-4">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded px-2 py-0.5 font-stat text-[10px]"
                          style={{
                            background: 'var(--color-void-deep)',
                            color: 'var(--color-starchart)',
                            border: '1px solid rgba(255, 200, 87, 0.25)',
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <span className="font-stat text-xs text-[var(--color-star)] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      <span>Baca Catatan</span>
                      <span>→</span>
                    </span>
                  </div>
                </PixelPanel>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
