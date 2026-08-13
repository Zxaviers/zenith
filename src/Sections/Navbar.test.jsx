import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Navbar from './Navbar'

const renderNavbar = (initialPath = '/') =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Navbar logo="/logo.png" />
    </MemoryRouter>
  )

describe('Navbar', () => {
  it('renders the main navigation links', () => {
    renderNavbar()

    ;[
      'Home',
      'Mission Control',
      'Constellation',
      'Flight Path',
      'Mission Log',
      'Send a Transmission',
      'Devlog',
    ].forEach((label) => {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument()
    })
  })

  it('does not render a generic "Contact" link (it uses the "Send a Transmission" label)', () => {
    renderNavbar()

    expect(
      screen.queryByRole('link', { name: 'Contact' })
    ).not.toBeInTheDocument()
  })

  it('links Devlog to the /devlog route', () => {
    renderNavbar()

    expect(screen.getByRole('link', { name: 'Devlog' })).toHaveAttribute(
      'href',
      '/devlog'
    )
  })
})
