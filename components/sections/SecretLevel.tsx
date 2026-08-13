'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { PixelPanel } from '@/components/ui/PixelPanel'

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [breakpoint])

  return isMobile
}

/**
 * Ported from src/components/SecretGame.jsx — same Kaboom.js mini-game,
 * dynamically imported so mobile visitors never download it. Kept as a
 * hidden bonus section (not in the nav), per ZENITH_PLAYBOOK.md §0.1.
 */
export function SecretLevel() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isMobile = useIsMobile()
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (isMobile) return

    let cancelled = false

    import('kaboom').then(({ default: kaboom }) => {
      if (cancelled || !canvasRef.current) return

      try {
        const k = kaboom({
          global: false,
          canvas: canvasRef.current,
          width: 800,
          height: 600,
          background: [0, 0, 0],
          focus: false,
        })

        k.loadSprite('player', '/sprites/rocketSatu.png')
        k.loadSprite('enemy1', '/sprites/planetBiru.png')
        k.loadSprite('enemy2', '/sprites/planetMerah.png')
        k.loadSprite('enemy3', '/sprites/planetUnik.png')
        const enemySprites = ['enemy1', 'enemy2', 'enemy3']

        const patterns = [
          [1, 3, 5],
          [5, 3, 1],
          [3, 5, 3],
          [1, 3, 5, 3, 1],
          [4, 4, 4],
          [1, 2, 3, 2, 1],
        ]

        k.scene('start', () => {
          k.add([k.text('SECRET LEVEL', { size: 64, font: 'sans-serif' }), k.pos(k.width() / 2, k.height() / 2 - 80), k.anchor('center')])
          k.add([k.text('Press SPACE to Start', { size: 24, font: 'sans-serif' }), k.pos(k.width() / 2, k.height() / 2 + 20), k.anchor('center')])
          k.add([k.text('Use Arrows to Move, SPACE to Shoot', { size: 16, font: 'sans-serif' }), k.pos(k.width() / 2, k.height() / 2 + 80), k.anchor('center')])
          k.onKeyPress('space', () => k.go('main'))
        })

        k.scene('main', () => {
          const difficulty = { speed: 50, spawnRate: 10, pattern: k.choose(patterns) }
          let score = 0
          const scoreLabel = k.add([k.text('Score: 0', { size: 24, font: 'sans-serif' }), k.pos(20, 20), k.fixed()])

          const player = k.add([
            k.sprite('player'),
            k.pos(k.width() / 2, k.height() - 64),
            k.anchor('center'),
            k.scale(0.4),
            k.rotate(-61),
            k.area(),
            'player',
          ])

          k.onKeyDown('left', () => {
            if (player.exists() && player.pos.x > 40) player.move(-350, 0)
          })
          k.onKeyDown('right', () => {
            if (player.exists() && player.pos.x < k.width() - 40) player.move(350, 0)
          })

          k.onKeyPress('space', () => {
            k.add([
              k.rect(4, 12),
              k.pos(player.pos.x, player.pos.y - 70),
              k.anchor('center'),
              k.color(0, 255, 255),
              k.move(90, -900),
              k.area(),
              k.offscreen({ destroy: true }),
              'bullet',
            ])
          })

          function spawnWave(pattern: number[], spacingX: number, spacingY: number, startY: number) {
            pattern.forEach((cols, r) => {
              const gridWidth = (cols - 1) * spacingX
              const startX = (k.width() - gridWidth) / 2
              for (let c = 0; c < cols; c++) {
                k.add([
                  k.sprite(k.choose(enemySprites)),
                  k.pos(startX + c * spacingX, startY + r * spacingY),
                  k.anchor('center'),
                  k.scale(0.4),
                  k.move(90, difficulty.speed),
                  k.area(),
                  k.offscreen({ destroy: true }),
                  'enemy',
                ])
              }
            })
          }

          const spawnLoop = k.loop(difficulty.spawnRate, () => {
            spawnWave(difficulty.pattern, 90, 65, -100)
            difficulty.pattern = k.choose(patterns)
          })

          k.onCollide('bullet', 'enemy', (bullet, enemy) => {
            k.destroy(bullet)
            k.destroy(enemy)
            k.addKaboom(bullet.pos)
            score += 10
            scoreLabel.text = 'Score: ' + score
            if (score > 0 && score % 100 === 0) {
              k.shake(8)
              difficulty.speed += 20
              if (difficulty.spawnRate > 3) {
                difficulty.spawnRate -= 1.5
                // Kaboom's TS types don't declare `.time` on the loop
                // controller, but it's a real, documented mutable field.
                ;(spawnLoop as unknown as { time: number }).time = difficulty.spawnRate
              }
            }
          })

          k.onCollide('player', 'enemy', () => {
            k.shake(12)
            k.destroy(player)
            spawnLoop.cancel()
            k.go('gameover', { finalScore: score })
          })
        })

        k.scene('gameover', ({ finalScore }: { finalScore: number }) => {
          k.add([k.text('GAME OVER', { size: 64, font: 'sans-serif' }), k.pos(k.width() / 2, k.height() / 2 - 80), k.anchor('center')])
          k.add([k.text('Score: ' + finalScore, { size: 40, font: 'sans-serif' }), k.pos(k.width() / 2, k.height() / 2), k.anchor('center')])
          k.add([k.text('Press SPACE to Replay', { size: 24, font: 'sans-serif' }), k.pos(k.width() / 2, k.height() / 2 + 80), k.anchor('center')])
          k.onKeyPress('space', () => k.go('start'))
        })

        k.go('start')
      } catch (err) {
        console.error('Secret Level failed to initialize:', err)
        if (!cancelled) setHasError(true)
      }
    }).catch((err) => {
      console.error('Failed to load the Secret Level game module:', err)
      if (!cancelled) setHasError(true)
    })

    return () => {
      cancelled = true
    }
  }, [isMobile])

  return (
    <motion.section
      id="secret-level"
      className="relative px-6 py-20 text-center scroll-mt-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <PixelPanel variant="nebula" className="mx-auto w-fit max-w-full">
        <h2 className="mb-8 font-display text-2xl text-starchart">Secret Level</h2>

        {isMobile ? (
          <div
            className="flex items-center justify-center bg-void/50 p-4 text-center"
            style={{ width: '800px', height: '600px', maxWidth: '100%', minHeight: '300px' }}
          >
            <p className="font-body text-xl text-comet md:text-2xl">
              This secret level can only be played on a desktop.
            </p>
          </div>
        ) : hasError ? (
          <div
            className="flex items-center justify-center bg-void/50 p-4 text-center"
            style={{ width: '800px', height: '600px', maxWidth: '100%', minHeight: '300px' }}
          >
            <p className="font-body text-xl text-comet md:text-2xl">
              This secret level couldn&apos;t load on your browser. Try a different one!
            </p>
          </div>
        ) : (
          <canvas
            ref={canvasRef}
            className="mx-auto max-w-full border-4 border-comet/50"
            style={{ imageRendering: 'pixelated' }}
          />
        )}
      </PixelPanel>
    </motion.section>
  )
}
