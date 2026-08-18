'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { PixelPanel } from '@/components/ui/PixelPanel'
import { PixelButton } from '@/components/ui/PixelButton'

/* ── Web Audio API Procedural Retro Sound Engine ── */
class SoundEngine {
  private ctx: AudioContext | null = null
  public enabled: boolean = true

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  playLaser() {
    if (!this.enabled) return
    this.initCtx()
    if (!this.ctx) return
    try {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(880, this.ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(110, this.ctx.currentTime + 0.12)
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12)
      osc.connect(gain)
      gain.connect(this.ctx.destination)
      osc.start()
      osc.stop(this.ctx.currentTime + 0.12)
    } catch {
      // Audio fallback silent
    }
  }

  playExplosion(isLarge: boolean = false) {
    if (!this.enabled) return
    this.initCtx()
    if (!this.ctx) return
    try {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      osc.type = 'square'
      osc.frequency.setValueAtTime(isLarge ? 140 : 220, this.ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + (isLarge ? 0.35 : 0.2))
      gain.gain.setValueAtTime(isLarge ? 0.25 : 0.18, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + (isLarge ? 0.35 : 0.2))
      osc.connect(gain)
      gain.connect(this.ctx.destination)
      osc.start()
      osc.stop(this.ctx.currentTime + (isLarge ? 0.35 : 0.2))
    } catch {
      // Audio fallback silent
    }
  }

  playPickup() {
    if (!this.enabled) return
    this.initCtx()
    if (!this.ctx) return
    try {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      osc.type = 'sine'
      const t = this.ctx.currentTime
      osc.frequency.setValueAtTime(587.33, t) // D5
      osc.frequency.setValueAtTime(880, t + 0.05) // A5
      osc.frequency.setValueAtTime(1174.66, t + 0.1) // D6
      gain.gain.setValueAtTime(0.18, t)
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.18)
      osc.connect(gain)
      gain.connect(this.ctx.destination)
      osc.start()
      osc.stop(t + 0.18)
    } catch {
      // Audio fallback silent
    }
  }

  playPowerup() {
    if (!this.enabled) return
    this.initCtx()
    if (!this.ctx) return
    try {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      osc.type = 'triangle'
      const t = this.ctx.currentTime
      osc.frequency.setValueAtTime(300, t)
      osc.frequency.linearRampToValueAtTime(1200, t + 0.25)
      gain.gain.setValueAtTime(0.2, t)
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.25)
      osc.connect(gain)
      gain.connect(this.ctx.destination)
      osc.start()
      osc.stop(t + 0.25)
    } catch {
      // Audio fallback silent
    }
  }

  playWarp() {
    if (!this.enabled) return
    this.initCtx()
    if (!this.ctx) return
    try {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      osc.type = 'sawtooth'
      const t = this.ctx.currentTime
      osc.frequency.setValueAtTime(150, t)
      osc.frequency.exponentialRampToValueAtTime(1600, t + 0.6)
      gain.gain.setValueAtTime(0.25, t)
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.6)
      osc.connect(gain)
      gain.connect(this.ctx.destination)
      osc.start()
      osc.stop(t + 0.6)
    } catch {
      // Audio fallback silent
    }
  }
}

const sounds = new SoundEngine()

/* ── Progressive Sector Quantum Requirement Formula ── */
export function getSectorQuantumTarget(sector: number): number {
  // Sector 1: 100
  // Sector 2: 170 (+70)
  // Sector 3: 260 (+90)
  // Sector 4: 370 (+110)
  // Sector 5: 500 (+130)
  return 100 + (sector - 1) * 60 + Math.pow(sector - 1, 2) * 10
}

/* ── Types & Entities ── */
type AsteroidSize = 'large' | 'medium' | 'small'
type MineralType = 'stardust' | 'plasma' | 'quantum'
type PowerupType = 'triple' | 'magnet' | 'shield'

interface Ship {
  x: number
  y: number
  vx: number
  vy: number
  angle: number
  rotSpeed: number
  thrust: boolean
  shield: number // 0 to 100
  powerup: PowerupType | null
  powerupTime: number
  fireTimer: number
  invulnerableTime: number
}

interface Asteroid {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  size: AsteroidSize
  angle: number
  rotSpeed: number
  points: { x: number; y: number }[]
  color: string
  isGolden?: boolean
  isVolatile?: boolean
  isArmored?: boolean
  hitsLeft?: number
}

interface Shrapnel {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  life: number
}

interface Mineral {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  type: MineralType
  pointsValue: number
  quantumValue: number
  color: string
  glowColor: string
  life: number
}

interface Laser {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  life: number
  color: string
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  color: string
  size: number
  life: number
  maxLife: number
}

interface WarpStar {
  x: number
  y: number
  z: number
}

export function VoidMinerGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameState, setGameState] = useState<'title' | 'playing' | 'warping' | 'gameover'>('title')
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [sector, setSector] = useState(1)
  const [quantumCurrent, setQuantumCurrent] = useState(0)
  const [quantumTarget, setQuantumTarget] = useState(100)
  const [shieldHealth, setShieldHealth] = useState(100)
  const [activePowerup, setActivePowerup] = useState<string | null>(null)
  const [soundEnabled, setSoundEnabled] = useState(true)

  // Local storage high score
  useEffect(() => {
    try {
      const saved = localStorage.getItem('zenith_voidminer_hiscore')
      if (saved) setHighScore(parseInt(saved, 10))
    } catch {
      // Ignore storage errors
    }
  }, [])

  const toggleSound = () => {
    sounds.enabled = !soundEnabled
    setSoundEnabled(!soundEnabled)
  }

  // Ref tracking mutable game loop variables to prevent closure lags
  const gameRef = useRef<{
    state: 'title' | 'playing' | 'warping' | 'gameover'
    score: number
    sector: number
    quantum: number
    targetQuantum: number
    ship: Ship
    asteroids: Asteroid[]
    shrapnels: Shrapnel[]
    minerals: Mineral[]
    lasers: Laser[]
    particles: Particle[]
    warpStars: WarpStar[]
    keys: Record<string, boolean>
    mousePos: { x: number; y: number }
    useMouseAim: boolean
    warpTimer: number
  }>({
    state: 'title',
    score: 0,
    sector: 1,
    quantum: 0,
    targetQuantum: 100,
    ship: {
      x: 400,
      y: 300,
      vx: 0,
      vy: 0,
      angle: -Math.PI / 2,
      rotSpeed: 0,
      thrust: false,
      shield: 100,
      powerup: null,
      powerupTime: 0,
      fireTimer: 0,
      invulnerableTime: 0,
    },
    asteroids: [],
    shrapnels: [],
    minerals: [],
    lasers: [],
    particles: [],
    warpStars: [],
    keys: {},
    mousePos: { x: 400, y: 300 },
    useMouseAim: false,
    warpTimer: 0,
  })

  // Start / restart game handler
  const startGame = useCallback(() => {
    const g = gameRef.current
    g.state = 'playing'
    g.score = 0
    g.sector = 1
    g.quantum = 0
    g.targetQuantum = getSectorQuantumTarget(1)
    g.ship = {
      x: 400,
      y: 300,
      vx: 0,
      vy: 0,
      angle: -Math.PI / 2,
      rotSpeed: 0,
      thrust: false,
      shield: 100,
      powerup: null,
      powerupTime: 0,
      fireTimer: 0,
      invulnerableTime: 60,
    }
    g.asteroids = []
    g.shrapnels = []
    g.minerals = []
    g.lasers = []
    g.particles = []
    spawnSectorAsteroids(1)

    setGameState('playing')
    setScore(0)
    setSector(1)
    setQuantumCurrent(0)
    setQuantumTarget(g.targetQuantum)
    setShieldHealth(100)
    setActivePowerup(null)
  }, [])

  // Spawns asteroid wave for a sector
  const spawnSectorAsteroids = (sec: number) => {
    const g = gameRef.current
    g.asteroids = []
    const count = 4 + sec * 3
    for (let i = 0; i < count; i++) {
      let x = Math.random() * 800
      let y = Math.random() * 600
      // Ensure asteroids don't spawn right on the player
      while (Math.hypot(x - 400, y - 300) < 160) {
        x = Math.random() * 800
        y = Math.random() * 600
      }
      const speed = 0.8 + Math.random() * 0.8 + (sec - 1) * 0.35
      const angle = Math.random() * Math.PI * 2
      const isGolden = Math.random() < 0.2
      // Sector 2+ spawns volatile crimson asteroids; Sector 3+ spawns armored obsidian asteroids
      const isVolatile = sec >= 2 && Math.random() < 0.25
      const isArmored = sec >= 3 && Math.random() < 0.25

      g.asteroids.push(
        createAsteroid(
          x,
          y,
          'large',
          Math.cos(angle) * speed,
          Math.sin(angle) * speed,
          isGolden,
          isVolatile,
          isArmored
        )
      )
    }
  }

  // Helper: Create jagged asteroid polygon
  const createAsteroid = (
    x: number,
    y: number,
    size: AsteroidSize,
    vx: number,
    vy: number,
    isGolden = false,
    isVolatile = false,
    isArmored = false
  ): Asteroid => {
    const radius = size === 'large' ? 36 : size === 'medium' ? 22 : 12
    const numPoints = 8 + Math.floor(Math.random() * 4)
    const points: { x: number; y: number }[] = []
    for (let i = 0; i < numPoints; i++) {
      const a = (i / numPoints) * Math.PI * 2
      const r = radius * (0.75 + Math.random() * 0.4)
      points.push({ x: Math.cos(a) * r, y: Math.sin(a) * r })
    }

    let color = '#9890c4'
    let hitsLeft = 1
    if (isGolden) {
      color = '#ffc857'
    } else if (isVolatile) {
      color = '#ff4757'
    } else if (isArmored) {
      color = '#a29bfe'
      hitsLeft = size === 'large' ? 3 : size === 'medium' ? 2 : 1
    }

    return {
      id: Math.random(),
      x,
      y,
      vx,
      vy,
      radius,
      size,
      angle: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * (0.03 + (gameRef.current.sector - 1) * 0.01),
      points,
      color,
      isGolden,
      isVolatile,
      isArmored,
      hitsLeft,
    }
  }

  // Trigger Hyperjump to next sector
  const triggerHyperjump = useCallback(() => {
    const g = gameRef.current
    if (g.quantum < g.targetQuantum || g.state !== 'playing') return

    g.state = 'warping'
    g.warpTimer = 100
    sounds.playWarp()
    setGameState('warping')

    // Generate warp streaks
    g.warpStars = []
    for (let i = 0; i < 160; i++) {
      g.warpStars.push({
        x: (Math.random() - 0.5) * 800,
        y: (Math.random() - 0.5) * 600,
        z: Math.random() * 800,
      })
    }
  }, [])

  // Master Game Loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 800
    canvas.height = 600

    const g = gameRef.current

    // Initialize Warp Stars
    g.warpStars = []
    for (let i = 0; i < 100; i++) {
      g.warpStars.push({
        x: (Math.random() - 0.5) * 800,
        y: (Math.random() - 0.5) * 600,
        z: Math.random() * 800,
      })
    }

    // Input Handlers
    const handleKeyDown = (e: KeyboardEvent) => {
      g.keys[e.code] = true
      g.keys[e.key.toLowerCase()] = true

      if (e.code === 'Space' || e.code === 'KeyW' || e.code === 'ArrowUp') {
        e.preventDefault()
      }

      if (g.state === 'title' || g.state === 'gameover') {
        if (e.code === 'Space' || e.code === 'Enter') {
          startGame()
        }
      } else if (g.state === 'playing') {
        if (e.code === 'ShiftLeft' || e.code === 'ShiftRight' || e.code === 'KeyE') {
          triggerHyperjump()
        }
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      g.keys[e.code] = false
      g.keys[e.key.toLowerCase()] = false
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height
      g.mousePos.x = (e.clientX - rect.left) * scaleX
      g.mousePos.y = (e.clientY - rect.top) * scaleY
      g.useMouseAim = true
    }

    const handleMouseDown = (e: MouseEvent) => {
      if (g.state === 'title' || g.state === 'gameover') {
        startGame()
      } else if (g.state === 'playing') {
        if (e.button === 0) {
          fireLaser()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mousedown', handleMouseDown)

    const fireLaser = () => {
      const ship = g.ship
      const isTriple = ship.powerup === 'triple' && ship.powerupTime > 0

      sounds.playLaser()

      const cos = Math.cos(ship.angle)
      const sin = Math.sin(ship.angle)
      const speed = 13

      // Wingtip cannon coordinates (local: x=6, y=±18)
      const leftX = ship.x + 6 * cos - -18 * sin
      const leftY = ship.y + 6 * sin + -18 * cos
      const rightX = ship.x + 6 * cos - 18 * sin
      const rightY = ship.y + 6 * sin + 18 * cos

      if (isTriple) {
        const noseX = ship.x + 18 * cos
        const noseY = ship.y + 18 * sin

        const aL = ship.angle - 0.15
        g.lasers.push({
          id: Math.random(),
          x: leftX,
          y: leftY,
          vx: Math.cos(aL) * speed + ship.vx * 0.25,
          vy: Math.sin(aL) * speed + ship.vy * 0.25,
          life: 45,
          color: '#ff8b4c',
        })

        g.lasers.push({
          id: Math.random(),
          x: noseX,
          y: noseY,
          vx: cos * speed + ship.vx * 0.25,
          vy: sin * speed + ship.vy * 0.25,
          life: 45,
          color: '#ffc857',
        })

        const aR = ship.angle + 0.15
        g.lasers.push({
          id: Math.random(),
          x: rightX,
          y: rightY,
          vx: Math.cos(aR) * speed + ship.vx * 0.25,
          vy: Math.sin(aR) * speed + ship.vy * 0.25,
          life: 45,
          color: '#ff8b4c',
        })
      } else {
        g.lasers.push({
          id: Math.random(),
          x: leftX,
          y: leftY,
          vx: cos * speed + ship.vx * 0.25,
          vy: sin * speed + ship.vy * 0.25,
          life: 45,
          color: '#ffc857',
        })
        g.lasers.push({
          id: Math.random(),
          x: rightX,
          y: rightY,
          vx: cos * speed + ship.vx * 0.25,
          vy: sin * speed + ship.vy * 0.25,
          life: 45,
          color: '#ffc857',
        })
      }
    }

    // Spawn Particles helper
    const addExplosionParticles = (x: number, y: number, color: string, count: number) => {
      for (let i = 0; i < count; i++) {
        const a = Math.random() * Math.PI * 2
        const spd = 1 + Math.random() * 4
        g.particles.push({
          x,
          y,
          vx: Math.cos(a) * spd,
          vy: Math.sin(a) * spd,
          color,
          size: 1 + Math.random() * 2.5,
          life: 25 + Math.random() * 20,
          maxLife: 45,
        })
      }
    }

    let animId: number

    // 60 FPS Engine Tick
    const loop = () => {
      animId = requestAnimationFrame(loop)

      // Clear Canvas
      ctx.fillStyle = '#130d1a'
      ctx.fillRect(0, 0, 800, 600)

      /* ── 1. Render Starfield Backdrop ── */
      ctx.fillStyle = 'rgba(245, 233, 214, 0.4)'
      g.warpStars.forEach((star) => {
        if (g.state === 'warping') {
          star.z -= 30
          if (star.z <= 0) star.z = 800
          const k = 250 / star.z
          const px = star.x * k + 400
          const py = star.y * k + 300
          const prevK = 250 / (star.z + 60)
          const ppx = star.x * prevK + 400
          const ppy = star.y * prevK + 300

          ctx.strokeStyle = '#ffc857'
          ctx.lineWidth = 1.8
          ctx.beginPath()
          ctx.moveTo(ppx, ppy)
          ctx.lineTo(px, py)
          ctx.stroke()
        } else {
          star.z -= 0.5
          if (star.z <= 0) star.z = 800
          const k = 250 / star.z
          const px = star.x * k + 400
          const py = star.y * k + 300
          if (px >= 0 && px < 800 && py >= 0 && py < 600) {
            const size = Math.max(0.5, (1 - star.z / 800) * 2)
            ctx.fillRect(px, py, size, size)
          }
        }
      })

      /* ── 2. State: Title Screen ── */
      if (g.state === 'title') {
        ctx.fillStyle = '#ffc857'
        ctx.font = '24px "Press Start 2P", monospace'
        ctx.textAlign = 'center'
        ctx.fillText('★ VOID MINER ★', 400, 180)

        ctx.fillStyle = '#f5e9d6'
        ctx.font = '12px "Press Start 2P", monospace'
        ctx.fillText('ZERO-G ASTEROID HARVESTER', 400, 220)

        ctx.fillStyle = '#ff8b4c'
        ctx.font = '10px "Press Start 2P", monospace'
        ctx.fillText('[W/UP] THRUST   [A/D] ROTATE   [SPACE] FIRE', 400, 280)
        ctx.fillText('[SHIFT] HYPERJUMP (WHEN QUANTUM FULL)', 400, 305)

        ctx.fillStyle = '#6fcf97'
        ctx.fillText('PROGRESSIVE WARP REQUIREMENTS & HOSTILE HAZARDS', 400, 350)

        ctx.fillStyle = 'rgba(245, 233, 214, 0.7)'
        ctx.fillText('SEC 1: 100 QNT  •  SEC 2: 180 QNT  •  SEC 3: 280 QNT', 400, 385)

        // Pulsing Start Prompt
        const pulse = (Math.sin(Date.now() / 200) + 1) / 2
        ctx.fillStyle = `rgba(255, 200, 87, ${0.4 + pulse * 0.6})`
        ctx.font = '14px "Press Start 2P", monospace'
        ctx.fillText('PRESS SPACE OR CLICK TO LAUNCH', 400, 460)

        // Hi-Score
        ctx.fillStyle = 'rgba(245, 233, 214, 0.6)'
        ctx.font = '10px "Press Start 2P", monospace'
        ctx.fillText(`SECTOR RECORD: ${highScore}`, 400, 530)
        return
      }

      /* ── 3. State: Game Over ── */
      if (g.state === 'gameover') {
        ctx.fillStyle = '#ff8b4c'
        ctx.font = '24px "Press Start 2P", monospace'
        ctx.textAlign = 'center'
        ctx.fillText('SHIP CRITICAL DESTROYED', 400, 220)

        ctx.fillStyle = '#f5e9d6'
        ctx.font = '14px "Press Start 2P", monospace'
        ctx.fillText(`FINAL HARVEST: ${g.score}`, 400, 270)
        ctx.fillText(`SECTORS REACHED: ${g.sector}`, 400, 305)

        const pulse = (Math.sin(Date.now() / 200) + 1) / 2
        ctx.fillStyle = `rgba(255, 200, 87, ${0.4 + pulse * 0.6})`
        ctx.fillText('PRESS SPACE TO REBOOT MINER', 400, 400)
        return
      }

      /* ── 4. State: Warping Transition ── */
      if (g.state === 'warping') {
        g.warpTimer--
        const nextSec = g.sector + 1
        const nextTarget = getSectorQuantumTarget(nextSec)

        ctx.fillStyle = '#ffc857'
        ctx.font = '20px "Press Start 2P", monospace'
        ctx.textAlign = 'center'
        ctx.fillText(`HYPERJUMPING TO SECTOR ${nextSec}...`, 400, 260)

        ctx.fillStyle = '#6fcf97'
        ctx.font = '12px "Press Start 2P", monospace'
        ctx.fillText(`WARP REQUIREMENT: ${nextTarget} QUANTUM ENERGY`, 400, 305)

        ctx.fillStyle = '#ff8b4c'
        ctx.font = '10px "Press Start 2P", monospace'
        const hazardText =
          nextSec >= 3
            ? 'WARNING: ARMORED OBSIDIAN & VOLATILE ASTEROIDS'
            : nextSec === 2
              ? 'WARNING: VOLATILE CRIMSON EXPLOSIVE ASTEROIDS'
              : 'DENSE ASTEROID SWARM'
        ctx.fillText(hazardText, 400, 340)

        if (g.warpTimer <= 0) {
          g.sector = nextSec
          g.quantum = 0
          g.targetQuantum = nextTarget
          g.state = 'playing'
          spawnSectorAsteroids(g.sector)
          g.ship.x = 400
          g.ship.y = 300
          g.ship.vx = 0
          g.ship.vy = 0
          g.ship.shield = Math.min(100, g.ship.shield + 40)
          g.ship.invulnerableTime = 90

          setSector(g.sector)
          setQuantumCurrent(0)
          setQuantumTarget(nextTarget)
          setShieldHealth(g.ship.shield)
          setGameState('playing')
        }
        return
      }

      /* ── 5. Playing Update Loop ── */
      const ship = g.ship

      // Ship Rotation
      if (g.keys['ArrowLeft'] || g.keys['KeyA'] || g.keys['a']) {
        ship.angle -= 0.07
      }
      if (g.keys['ArrowRight'] || g.keys['KeyD'] || g.keys['d']) {
        ship.angle += 0.07
      }

      // Thrust Physics
      const isThrusting = g.keys['ArrowUp'] || g.keys['KeyW'] || g.keys['w']
      ship.thrust = isThrusting

      if (isThrusting) {
        const accel = 0.22
        ship.vx += Math.cos(ship.angle) * accel
        ship.vy += Math.sin(ship.angle) * accel

        // Engine flame particles
        const flameAngle = ship.angle + Math.PI + (Math.random() - 0.5) * 0.4
        const flameSpd = 2 + Math.random() * 3
        g.particles.push({
          x: ship.x - Math.cos(ship.angle) * 14,
          y: ship.y - Math.sin(ship.angle) * 14,
          vx: Math.cos(flameAngle) * flameSpd + ship.vx * 0.2,
          vy: Math.sin(flameAngle) * flameSpd + ship.vy * 0.2,
          color: Math.random() > 0.4 ? '#ff8b4c' : '#ffc857',
          size: 1.5 + Math.random() * 2,
          life: 16,
          maxLife: 16,
        })
      }

      // Retro Brake
      if (g.keys['ArrowDown'] || g.keys['KeyS'] || g.keys['s']) {
        ship.vx *= 0.94
        ship.vy *= 0.94
      }

      // Space Friction & Position
      ship.vx *= 0.988
      ship.vy *= 0.988
      ship.x += ship.vx
      ship.y += ship.vy

      // Screen Wrap
      if (ship.x < -20) ship.x = 820
      if (ship.x > 820) ship.x = -20
      if (ship.y < -20) ship.y = 620
      if (ship.y > 620) ship.y = -20

      // Invulnerability & Powerup countdown
      if (ship.invulnerableTime > 0) ship.invulnerableTime--
      if (ship.powerupTime > 0) {
        ship.powerupTime--
        if (ship.powerupTime === 0) {
          ship.powerup = null
          setActivePowerup(null)
        }
      }

      // Laser Cooldown & Auto-fire on hold Space
      if (ship.fireTimer > 0) ship.fireTimer--
      if ((g.keys['Space'] || g.keys[' ']) && ship.fireTimer <= 0) {
        fireLaser()
        ship.fireTimer = 12
      }

      /* ── Update Lasers ── */
      for (let l = g.lasers.length - 1; l >= 0; l--) {
        const laser = g.lasers[l]
        laser.x += laser.vx
        laser.y += laser.vy
        laser.life--

        // Screen wrap
        if (laser.x < 0) laser.x = 800
        if (laser.x > 800) laser.x = 0
        if (laser.y < 0) laser.y = 600
        if (laser.y > 600) laser.y = 0

        // Collision: Laser vs Asteroids
        let laserHit = false
        for (let a = g.asteroids.length - 1; a >= 0; a--) {
          const ast = g.asteroids[a]
          const dist = Math.hypot(laser.x - ast.x, laser.y - ast.y)
          if (dist < ast.radius + 6) {
            laserHit = true

            // If Armored Asteroid, decrement hitsLeft first
            if (ast.isArmored && ast.hitsLeft && ast.hitsLeft > 1) {
              ast.hitsLeft--
              sounds.playExplosion(false)
              addExplosionParticles(laser.x, laser.y, '#a29bfe', 6)
              break
            }

            sounds.playExplosion(ast.size === 'large')
            addExplosionParticles(ast.x, ast.y, ast.color, ast.size === 'large' ? 18 : 10)

            // Volatile Crimson Asteroids explode into deadly shrapnel!
            if (ast.isVolatile) {
              sounds.playExplosion(true)
              addExplosionParticles(ast.x, ast.y, '#ff4757', 24)
              for (let sh = 0; sh < 4; sh++) {
                const shAng = (sh / 4) * Math.PI * 2 + Math.random() * 0.5
                const shSpd = 3.5 + Math.random() * 1.5
                g.shrapnels.push({
                  id: Math.random(),
                  x: ast.x,
                  y: ast.y,
                  vx: Math.cos(shAng) * shSpd,
                  vy: Math.sin(shAng) * shSpd,
                  life: 80,
                })
              }
            }

            const mineralLife = Math.max(280, 600 - (g.sector - 1) * 50)
            const scoreMultiplier = 1 + (g.sector - 1) * 0.2

            // Base destruction points
            const hitScore = ast.size === 'large' ? 10 : ast.size === 'medium' ? 15 : 25
            g.score += Math.round(hitScore * scoreMultiplier)
            setScore(g.score)

            // Spawn smaller chunks & minerals with balanced rarity
            if (ast.size === 'large') {
              for (let m = 0; m < 2; m++) {
                const ang = Math.random() * Math.PI * 2
                const spd = 1.2 + Math.random() * 0.8
                g.asteroids.push(
                  createAsteroid(
                    ast.x,
                    ast.y,
                    'medium',
                    Math.cos(ang) * spd,
                    Math.sin(ang) * spd,
                    ast.isGolden,
                    ast.isVolatile,
                    ast.isArmored
                  )
                )
              }
              // Large drops 1 Stardust Crystal
              g.minerals.push({
                id: Math.random(),
                x: ast.x + (Math.random() - 0.5) * 16,
                y: ast.y + (Math.random() - 0.5) * 16,
                vx: (Math.random() - 0.5) * 1.2,
                vy: (Math.random() - 0.5) * 1.2,
                type: 'stardust',
                pointsValue: Math.round(10 * scoreMultiplier),
                quantumValue: 2,
                color: '#ffc857',
                glowColor: 'rgba(255, 200, 87, 0.8)',
                life: mineralLife,
              })
            } else if (ast.size === 'medium') {
              for (let s = 0; s < 2; s++) {
                const ang = Math.random() * Math.PI * 2
                const spd = 1.8 + Math.random() * 0.8
                g.asteroids.push(
                  createAsteroid(
                    ast.x,
                    ast.y,
                    'small',
                    Math.cos(ang) * spd,
                    Math.sin(ang) * spd,
                    ast.isGolden,
                    ast.isVolatile,
                    ast.isArmored
                  )
                )
              }
              // Medium has 65% chance to drop 1 Plasma Shard
              if (Math.random() < 0.65) {
                g.minerals.push({
                  id: Math.random(),
                  x: ast.x,
                  y: ast.y,
                  vx: (Math.random() - 0.5) * 1.5,
                  vy: (Math.random() - 0.5) * 1.5,
                  type: 'plasma',
                  pointsValue: Math.round(20 * scoreMultiplier),
                  quantumValue: 4,
                  color: '#ff8b4c',
                  glowColor: 'rgba(255, 139, 76, 0.8)',
                  life: mineralLife,
                })
              }
            } else {
              // Small destroyed -> 40% chance for Quantum Core or Powerup
              if (ast.isGolden && Math.random() < 0.4) {
                const pTypes: PowerupType[] = ['triple', 'magnet', 'shield']
                const pChoice = pTypes[Math.floor(Math.random() * pTypes.length)]
                ship.powerup = pChoice
                ship.powerupTime = 400
                sounds.playPowerup()
                setActivePowerup(pChoice.toUpperCase())
                if (pChoice === 'shield') {
                  ship.shield = Math.min(100, ship.shield + 50)
                  setShieldHealth(ship.shield)
                }
              }

              if (Math.random() < 0.45) {
                g.minerals.push({
                  id: Math.random(),
                  x: ast.x,
                  y: ast.y,
                  vx: (Math.random() - 0.5) * 2,
                  vy: (Math.random() - 0.5) * 2,
                  type: 'quantum',
                  pointsValue: Math.round(40 * scoreMultiplier),
                  quantumValue: 6,
                  color: '#6fcf97',
                  glowColor: 'rgba(111, 207, 151, 0.8)',
                  life: mineralLife,
                })
              }
            }

            g.asteroids.splice(a, 1)
            break
          }
        }

        if (laserHit || laser.life <= 0) {
          g.lasers.splice(l, 1)
        }
      }

      /* ── Update Shrapnels ── */
      for (let sh = g.shrapnels.length - 1; sh >= 0; sh--) {
        const s = g.shrapnels[sh]
        s.x += s.vx
        s.y += s.vy
        s.life--

        if (s.x < 0) s.x = 800
        if (s.x > 800) s.x = 0
        if (s.y < 0) s.y = 600
        if (s.y > 600) s.y = 0

        // Collision with ship
        if (ship.invulnerableTime <= 0) {
          const dist = Math.hypot(ship.x - s.x, ship.y - s.y)
          if (dist < 18) {
            sounds.playExplosion(false)
            addExplosionParticles(s.x, s.y, '#ff4757', 10)
            ship.shield -= 15
            ship.invulnerableTime = 45
            setShieldHealth(Math.max(0, Math.floor(ship.shield)))
            g.shrapnels.splice(sh, 1)

            if (ship.shield <= 0) {
              g.state = 'gameover'
              setGameState('gameover')
              if (g.score > highScore) {
                setHighScore(g.score)
                try {
                  localStorage.setItem('zenith_voidminer_hiscore', g.score.toString())
                } catch {
                  // ignore
                }
              }
            }
            continue
          }
        }

        if (s.life <= 0) {
          g.shrapnels.splice(sh, 1)
        }
      }

      /* ── Update Asteroids ── */
      g.asteroids.forEach((ast) => {
        ast.x += ast.vx
        ast.y += ast.vy
        ast.angle += ast.rotSpeed

        if (ast.x < -40) ast.x = 840
        if (ast.x > 840) ast.x = -40
        if (ast.y < -40) ast.y = 640
        if (ast.y > 640) ast.y = -40

        // Collision: Ship vs Asteroids
        if (ship.invulnerableTime <= 0) {
          const dist = Math.hypot(ship.x - ast.x, ship.y - ast.y)
          if (dist < ast.radius + 14) {
            sounds.playExplosion(true)
            addExplosionParticles(ship.x, ship.y, '#ff8b4c', 20)

            const baseDamage = ast.size === 'large' ? 40 : ast.size === 'medium' ? 25 : 15
            const damage = baseDamage * (1 + (g.sector - 1) * 0.15)
            ship.shield -= damage
            ship.invulnerableTime = 60
            setShieldHealth(Math.max(0, Math.floor(ship.shield)))

            const bumpAngle = Math.atan2(ship.y - ast.y, ship.x - ast.x)
            ship.vx = Math.cos(bumpAngle) * 5
            ship.vy = Math.sin(bumpAngle) * 5

            if (ship.shield <= 0) {
              g.state = 'gameover'
              setGameState('gameover')
              if (g.score > highScore) {
                setHighScore(g.score)
                try {
                  localStorage.setItem('zenith_voidminer_hiscore', g.score.toString())
                } catch {
                  // ignore
                }
              }
            }
          }
        }
      })

      /* ── Update Minerals & Tractor Beam ── */
      const magnetRadius = ship.powerup === 'magnet' && ship.powerupTime > 0 ? 300 : 120

      for (let m = g.minerals.length - 1; m >= 0; m--) {
        const min = g.minerals[m]
        min.life--

        const dx = ship.x - min.x
        const dy = ship.y - min.y
        const dist = Math.hypot(dx, dy)

        // Magnetic attraction
        if (dist < magnetRadius) {
          const pullForce = (1 - dist / magnetRadius) * 6
          min.vx += (dx / dist) * pullForce
          min.vy += (dy / dist) * pullForce
        }

        min.vx *= 0.95
        min.vy *= 0.95
        min.x += min.vx
        min.y += min.vy

        // Collection
        if (dist < 22) {
          sounds.playPickup()
          addExplosionParticles(min.x, min.y, min.color, 8)
          g.score += min.pointsValue
          g.quantum += min.quantumValue
          setScore(g.score)
          setQuantumCurrent(g.quantum)

          g.minerals.splice(m, 1)
          continue
        }

        if (min.life <= 0) {
          g.minerals.splice(m, 1)
        }
      }

      /* ── Update Particles ── */
      for (let p = g.particles.length - 1; p >= 0; p--) {
        const pt = g.particles[p]
        pt.x += pt.vx
        pt.y += pt.vy
        pt.life--
        if (pt.life <= 0) {
          g.particles.splice(p, 1)
        }
      }

      /* ── If all asteroids cleared, auto-spawn next wave ── */
      if (g.asteroids.length === 0) {
        spawnSectorAsteroids(g.sector)
      }

      /* ── 6. DRAW ENTITIES ── */

      // A. Draw Minerals
      g.minerals.forEach((min) => {
        ctx.save()
        ctx.translate(min.x, min.y)

        ctx.shadowColor = min.glowColor
        ctx.shadowBlur = 8
        ctx.fillStyle = min.color

        ctx.beginPath()
        ctx.moveTo(0, -6)
        ctx.lineTo(5, 0)
        ctx.lineTo(0, 6)
        ctx.lineTo(-5, 0)
        ctx.closePath()
        ctx.fill()
        ctx.restore()
      })

      // B. Draw Lasers
      g.lasers.forEach((laser) => {
        ctx.save()
        ctx.shadowColor = laser.color
        ctx.shadowBlur = 6
        ctx.fillStyle = laser.color
        ctx.beginPath()
        ctx.arc(laser.x, laser.y, 2.5, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      // C. Draw Shrapnel
      g.shrapnels.forEach((s) => {
        ctx.save()
        ctx.fillStyle = '#ff4757'
        ctx.shadowColor = '#ff4757'
        ctx.shadowBlur = 6
        ctx.fillRect(s.x - 2, s.y - 2, 4, 4)
        ctx.restore()
      })

      // D. Draw Asteroids
      g.asteroids.forEach((ast) => {
        ctx.save()
        ctx.translate(ast.x, ast.y)
        ctx.rotate(ast.angle)

        ctx.strokeStyle = ast.color
        ctx.lineWidth = ast.isArmored ? 2.5 : 1.8
        ctx.fillStyle = ast.isGolden
          ? 'rgba(255, 200, 87, 0.25)'
          : ast.isVolatile
            ? 'rgba(255, 71, 87, 0.35)'
            : ast.isArmored
              ? 'rgba(162, 155, 254, 0.3)'
              : 'rgba(62, 42, 99, 0.5)'

        ctx.beginPath()
        ast.points.forEach((p, idx) => {
          if (idx === 0) ctx.moveTo(p.x, p.y)
          else ctx.lineTo(p.x, p.y)
        })
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
        ctx.restore()
      })

      // E. Draw Particles
      g.particles.forEach((pt) => {
        const alpha = pt.life / pt.maxLife
        ctx.fillStyle = pt.color
        ctx.globalAlpha = alpha
        ctx.fillRect(pt.x, pt.y, pt.size, pt.size)
      })
      ctx.globalAlpha = 1.0

      // F. Draw Ship — Authentic Fighter Space Plane
      ctx.save()
      ctx.translate(ship.x, ship.y)
      ctx.rotate(ship.angle)

      if (ship.invulnerableTime <= 0 || Math.floor(Date.now() / 80) % 2 === 0) {
        // 1. Deflector Shield Aura
        if (ship.shield > 0) {
          ctx.strokeStyle = `rgba(111, 207, 151, ${ship.shield / 140})`
          ctx.lineWidth = 1.8
          ctx.beginPath()
          ctx.arc(0, 0, 24, 0, Math.PI * 2)
          ctx.stroke()
        }

        // 2. Tractor Magnet Aura
        if (ship.powerup === 'magnet') {
          ctx.strokeStyle = 'rgba(255, 139, 76, 0.6)'
          ctx.setLineDash([4, 4])
          ctx.beginPath()
          ctx.arc(0, 0, 30, 0, Math.PI * 2)
          ctx.stroke()
          ctx.setLineDash([])
        }

        // 3. Supersonic Dual Afterburners
        if (ship.thrust) {
          const flameLength = 12 + Math.random() * 10
          ctx.fillStyle = '#ff8b4c'
          ctx.beginPath()
          ctx.moveTo(-12, -5)
          ctx.lineTo(-12 - flameLength, -5)
          ctx.lineTo(-10, -3)
          ctx.closePath()
          ctx.fill()

          ctx.fillStyle = '#ffc857'
          ctx.beginPath()
          ctx.moveTo(-12, -5)
          ctx.lineTo(-12 - flameLength * 0.6, -5)
          ctx.lineTo(-11, -4)
          ctx.closePath()
          ctx.fill()

          ctx.fillStyle = '#ff8b4c'
          ctx.beginPath()
          ctx.moveTo(-12, 5)
          ctx.lineTo(-12 - flameLength, 5)
          ctx.lineTo(-10, 3)
          ctx.closePath()
          ctx.fill()

          ctx.fillStyle = '#ffc857'
          ctx.beginPath()
          ctx.moveTo(-12, 5)
          ctx.lineTo(-12 - flameLength * 0.6, 5)
          ctx.lineTo(-11, 4)
          ctx.closePath()
          ctx.fill()
        }

        // 4. Main Plane Body
        const primaryColor = ship.powerup === 'triple' ? '#ff8b4c' : '#ffc857'

        ctx.fillStyle = '#261945'
        ctx.strokeStyle = primaryColor
        ctx.lineWidth = 1.8

        ctx.beginPath()
        ctx.moveTo(18, 0)
        ctx.lineTo(8, -4)
        ctx.lineTo(-4, -18)
        ctx.lineTo(-10, -18)
        ctx.lineTo(-8, -9)
        ctx.lineTo(-13, -7)
        ctx.lineTo(-13, -3)
        ctx.lineTo(-9, 0)
        ctx.lineTo(-13, 3)
        ctx.lineTo(-13, 7)
        ctx.lineTo(-8, 9)
        ctx.lineTo(-10, 18)
        ctx.lineTo(-4, 18)
        ctx.lineTo(8, 4)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()

        // Wingtip Cannons
        ctx.fillStyle = '#ff8b4c'
        ctx.fillRect(-2, -19, 10, 2)
        ctx.fillRect(-2, 17, 10, 2)

        // Exhaust Nozzles
        ctx.fillStyle = '#1b1235'
        ctx.strokeStyle = primaryColor
        ctx.strokeRect(-14, -6, 3, 4)
        ctx.strokeRect(-14, 2, 3, 4)

        ctx.fillStyle = ship.thrust ? '#ffc857' : '#6fcf97'
        ctx.fillRect(-13, -5, 2, 2)
        ctx.fillRect(-13, 3, 2, 2)

        // Fuselage Lines
        ctx.strokeStyle = 'rgba(255, 200, 87, 0.4)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(12, 0)
        ctx.lineTo(-6, 0)
        ctx.moveTo(4, -4)
        ctx.lineTo(-4, -12)
        ctx.moveTo(4, 4)
        ctx.lineTo(-4, 12)
        ctx.stroke()

        // Cockpit Canopy
        ctx.fillStyle = '#6fcf97'
        ctx.beginPath()
        ctx.ellipse(3, 0, 7, 3.2, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.strokeStyle = '#ffffff'
        ctx.lineWidth = 1
        ctx.stroke()

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)'
        ctx.lineWidth = 1.2
        ctx.beginPath()
        ctx.moveTo(6, -1)
        ctx.lineTo(1, -1)
        ctx.stroke()
      }
      ctx.restore()

      /* ── 7. HUD Telemetry Overlay ── */
      ctx.fillStyle = 'rgba(27, 18, 53, 0.85)'
      ctx.fillRect(0, 0, 800, 36)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)'
      ctx.strokeRect(0, 0, 800, 36)

      ctx.font = '10px "Press Start 2P", monospace'

      // Sector & Score
      ctx.fillStyle = '#ffc857'
      ctx.textAlign = 'left'
      ctx.fillText(`SEC:${g.sector}  SCORE:${g.score}`, 16, 23)

      // Shield Indicator
      ctx.fillStyle = ship.shield > 30 ? '#6fcf97' : '#ff8b4c'
      ctx.fillText(`SHIELD:${Math.max(0, Math.floor(ship.shield))}%`, 310, 23)

      // Quantum Hyperdrive Gauge with dynamic target
      const isWarpReady = g.quantum >= g.targetQuantum
      ctx.textAlign = 'right'
      if (isWarpReady) {
        const blink = Math.floor(Date.now() / 250) % 2 === 0
        ctx.fillStyle = blink ? '#ffc857' : '#ff8b4c'
        ctx.fillText('⚡ [SHIFT] WARP READY ⚡', 784, 23)
      } else {
        const pct = Math.floor((g.quantum / g.targetQuantum) * 100)
        ctx.fillStyle = '#f5e9d6'
        ctx.fillText(`QUANTUM:${g.quantum}/${g.targetQuantum} (${pct}%)`, 784, 23)
      }
    }

    animId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mousedown', handleMouseDown)
    }
  }, [startGame, triggerHyperjump, highScore])

  const isWarpReady = quantumCurrent >= quantumTarget

  return (
    <div className="relative mx-auto max-w-4xl">
      <PixelPanel variant="nebula" className="shadow-[8px_8px_0_0_#000] p-4 md:p-6">
        {/* Arcade Header Bar */}
        <div className="mb-4 flex flex-wrap items-center justify-between border-b-2 border-white/10 pb-3 gap-3">
          <div className="flex items-center gap-3">
            <span className="font-display text-sm md:text-base text-[var(--color-star)] tracking-wider">
              ★ VOID MINER : ASTEROID HARVESTER ★
            </span>
            {activePowerup && (
              <span className="rounded bg-[var(--color-comet)]/20 border border-[var(--color-comet)] px-2 py-0.5 font-stat text-[10px] text-[var(--color-comet)] animate-pulse">
                ⚡ {activePowerup} ACTIVE
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 font-stat text-xs">
            <button
              onClick={toggleSound}
              type="button"
              className="cursor-pointer px-2.5 py-1 rounded bg-[var(--color-void)] border border-white/20 text-[var(--color-starchart)] hover:text-[var(--color-star)] transition-colors"
            >
              {soundEnabled ? '🔊 SFX ON' : '🔇 SFX OFF'}
            </button>
            <span className="text-[var(--color-star)] font-bold">SECTOR: {sector}</span>
          </div>
        </div>

        {/* CRT Arcade Cabinet Screen */}
        <div className="relative mx-auto overflow-hidden rounded border-4 border-black shadow-[inset_0_0_20px_rgba(0,0,0,0.9)] aspect-[4/3] w-full max-w-[800px]">
          <canvas
            ref={canvasRef}
            className="block h-full w-full object-contain bg-[#130d1a]"
            style={{ imageRendering: 'pixelated' }}
          />

          {/* CRT Scanline & Phosphor Grid Overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-25 mix-blend-overlay"
            style={{
              background:
                'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.04), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.04))',
              backgroundSize: '100% 4px, 3px 100%',
              boxShadow: 'inset 0 0 70px rgba(0,0,0,0.95)',
            }}
            aria-hidden="true"
          />
        </div>

        {/* Telemetry Dashboard & Controls Help */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 font-stat text-xs pt-3 border-t border-white/10 text-[var(--color-ink-muted)]">
          <div className="space-x-2">
            <span>[W/A/S/D / ARROWS] Flight</span>
            <span>•</span>
            <span>[SPACE / CLICK] Laser</span>
            <span>•</span>
            <span>[SHIFT] Hyperjump</span>
          </div>

          <div className="flex items-center gap-3">
            {isWarpReady && gameState === 'playing' && (
              <PixelButton variant="comet" onClick={triggerHyperjump} className="text-xs py-1 px-3 animate-pulse">
                ⚡ ENGAGE HYPERJUMP ⚡
              </PixelButton>
            )}
            <span className="text-[var(--color-star)] font-bold">HI-SCORE: {highScore}</span>
          </div>
        </div>
      </PixelPanel>
    </div>
  )
}
