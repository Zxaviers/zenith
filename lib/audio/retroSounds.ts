// Retro Audio Synthesizer for portfolio micro-interactions
class PortfolioSoundEngine {
  private ctx: AudioContext | null = null
  public enabled: boolean = true

  private init() {
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

  playBlip(freq: number = 600) {
    if (!this.enabled) return
    this.init()
    if (!this.ctx) return
    try {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      osc.type = 'sine'
      const t = this.ctx.currentTime
      osc.frequency.setValueAtTime(freq, t)
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, t + 0.06)
      gain.gain.setValueAtTime(0.08, t)
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06)
      osc.connect(gain)
      gain.connect(this.ctx.destination)
      osc.start()
      osc.stop(t + 0.06)
    } catch {
      // Audio silent fallback
    }
  }

  playSelect() {
    if (!this.enabled) return
    this.init()
    if (!this.ctx) return
    try {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      osc.type = 'triangle'
      const t = this.ctx.currentTime
      osc.frequency.setValueAtTime(440, t)
      osc.frequency.setValueAtTime(880, t + 0.04)
      gain.gain.setValueAtTime(0.09, t)
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1)
      osc.connect(gain)
      gain.connect(this.ctx.destination)
      osc.start()
      osc.stop(t + 0.1)
    } catch {
      // Audio silent fallback
    }
  }

  playStarSparkle() {
    if (!this.enabled) return
    this.init()
    if (!this.ctx) return
    try {
      const notes = [587.33, 739.99, 880, 1174.66] // D5, F#5, A5, D6
      notes.forEach((freq, idx) => {
        if (!this.ctx) return
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()
        osc.type = 'sine'
        const t = this.ctx.currentTime + idx * 0.03
        osc.frequency.setValueAtTime(freq, t)
        gain.gain.setValueAtTime(0.06, t)
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12)
        osc.connect(gain)
        gain.connect(this.ctx.destination)
        osc.start(t)
        osc.stop(t + 0.12)
      })
    } catch {
      // Audio silent fallback
    }
  }
}

export const portfolioSounds = new PortfolioSoundEngine()
