import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import React from 'react'

import PricingPage from './page'

describe('PricingPage', () => {
  it('should render pricing heading and plans', () => {
    render(<PricingPage />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Precios y Planes')
    expect(screen.getByText(/elige el plan/i)).toBeInTheDocument()
    expect(screen.getByText(/starter/i)).toBeInTheDocument()
    expect(screen.getByText(/business/i)).toBeInTheDocument()
    expect(screen.getByText(/enterprise/i)).toBeInTheDocument()
  })

  it('should have a contact link for demo', () => {
    render(<PricingPage />)
    const link = screen.getByRole('link', { name: /contáctanos para una demo personalizada/i })
    expect(link).toHaveAttribute('href', '/contact')
  })

  it('should have dark mode support', () => {
    render(<PricingPage />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveClass('dark:text-white')
    const paragraph = screen.getByText(/elige el plan/i)
    expect(paragraph).toHaveClass('dark:text-gray-300')
  })
}) 