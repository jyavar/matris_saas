import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import Home from '../page'

describe('Home page', () => {
  it('renders the main title', () => {
    render(<Home />)
    expect(
      screen.getByText(/Bienvenido a STRATO Core OS™/i),
    ).toBeInTheDocument()
  })

  it('renders the CTA button', () => {
    render(<Home />)
    expect(
      screen.getByRole('button', { name: /Ir al Dashboard/i }),
    ).toBeInTheDocument()
  })

  it('renders the main description', () => {
    render(<Home />)
    expect(
      screen.getByText(/Plataforma de auditoría técnica/i),
    ).toBeInTheDocument()
  })

  it('has correct navigation link', () => {
    render(<Home />)
    expect(
      screen.getByRole('link', { name: /Ir al Dashboard/i }),
    ).toHaveAttribute('href', '/control-tower')
  })
})
