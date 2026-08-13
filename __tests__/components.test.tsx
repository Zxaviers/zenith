import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PixelButton } from '@/components/ui/PixelButton'
import { PixelPanel } from '@/components/ui/PixelPanel'
import { StarNode } from '@/components/ui/StarNode'

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
})
