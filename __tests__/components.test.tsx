import { describe, it, expect, beforeAll } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PixelButton } from '@/components/ui/PixelButton'
import { PixelPanel } from '@/components/ui/PixelPanel'
import { StarNode } from '@/components/ui/StarNode'
import { FormGroup } from '@/components/ui/FormGroup'
import { PixelInput, PixelTextarea } from '@/components/ui/PixelInput'
import { VoidMinerGame, getSectorQuantumTarget } from '@/components/sections/VoidMinerGame'
import { IoTWorkbench } from '@/components/sections/IoTWorkbench'
import { Transmission } from '@/components/sections/Transmission'

beforeAll(() => {
  if (typeof window !== 'undefined') {
    window.IntersectionObserver = class IntersectionObserver {
      readonly root: Element | null = null
      readonly rootMargin: string = ''
      readonly thresholds: ReadonlyArray<number> = []
      disconnect() {}
      observe() {}
      takeRecords() { return [] }
      unobserve() {}
    }
  }
})

describe('Zenith UI Primitives', () => {
  it('PixelButton renders text correctly and maintains accessibility', () => {
    render(<PixelButton variant="comet">Launch Telemetry</PixelButton>)
    const button = screen.getByRole('button', { name: /launch telemetry/i })
    expect(button).toBeDefined()
    expect(button.textContent).toContain('Launch Telemetry')
  })

  it('PixelPanel renders nested content properly', () => {
    render(
      <PixelPanel variant="nebula">
        <p>Telemetry Data Stream</p>
      </PixelPanel>
    )
    expect(screen.getByText('Telemetry Data Stream')).toBeDefined()
  })

  it('StarNode renders accessible label and button role', () => {
    render(<StarNode label="React — Proficient" state="active" />)
    const star = screen.getByRole('button', { name: /react — proficient/i })
    expect(star).toBeDefined()
    expect(star.getAttribute('title')).toBe('React — Proficient')
  })

  it('FormGroup renders label, required indicator, and error state', () => {
    render(
      <FormGroup label="Explorer Callsign" htmlFor="callsign" required error="Callsign is required">
        <PixelInput id="callsign" name="callsign" error placeholder="Enter callsign" />
      </FormGroup>
    )
    expect(screen.getByLabelText(/explorer callsign/i)).toBeDefined()
    expect(screen.getByRole('alert')).toBeDefined()
    expect(screen.getByRole('alert').textContent).toContain('Callsign is required')
  })

  it('PixelTextarea renders properly with textarea role', () => {
    render(<PixelTextarea placeholder="Transmission payload..." rows={3} />)
    const textarea = screen.getByPlaceholderText('Transmission payload...')
    expect(textarea).toBeDefined()
    expect(textarea.tagName).toBe('TEXTAREA')
  })

  it('StarNode renders proficient celestial sparkle correctly', () => {
    render(<StarNode label="TypeScript — Proficient" level="Proficient" state="active" />)
    const star = screen.getByRole('button', { name: /typescript — proficient/i })
    expect(star).toBeDefined()
    expect(star.className).toContain('rounded-full')
  })

  it('VoidMinerGame mounts with arcade canvas and controls', () => {
    render(<VoidMinerGame />)
    expect(screen.getByText(/VOID MINER : ASTEROID HARVESTER/i)).toBeDefined()
    expect(screen.getByText(/SFX ON/i)).toBeDefined()
  })

  it('getSectorQuantumTarget scales progressively per sector', () => {
    expect(getSectorQuantumTarget(1)).toBe(100)
    expect(getSectorQuantumTarget(2)).toBe(170)
    expect(getSectorQuantumTarget(3)).toBe(260)
    expect(getSectorQuantumTarget(4)).toBe(370)
  })

  it('IoTWorkbench mounts with hardware telemetry controls', () => {
    render(<IoTWorkbench />)
    expect(screen.getByText(/IoT Telemetry Workbench/i)).toBeDefined()
    expect(screen.getByText(/LIVE MQTT PACKET STREAM/i)).toBeDefined()
    expect(screen.getByText(/ADC OSCILLOSCOPE/i)).toBeDefined()
  })

  it('Transmission mounts with interactive form and dual gateway cards', () => {
    render(<Transmission />)
    expect(screen.getByText(/Send a Transmission/i)).toBeDefined()
    expect(screen.getByText(/Void Miner: Asteroid Harvester/i)).toBeDefined()
    expect(screen.getByText(/Engineering Devlogs & Research/i)).toBeDefined()
    expect(screen.getByRole('button', { name: /Send Transmission/i })).toBeDefined()
  })
})




