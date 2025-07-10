import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import React from 'react'

import TermsPage from './page'

describe('TermsPage', () => {
  it('should render terms heading and content', () => {
    render(<TermsPage />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Términos y Condiciones')
    expect(screen.getByText(/términos y condiciones de uso/i)).toBeInTheDocument()
    expect(screen.getByText(/servicio seguro, confiable/i)).toBeInTheDocument()
  })

  it('should have a legal info link', () => {
    render(<TermsPage />)
    const link = screen.getByRole('link', { name: /solicitar información legal/i })
    expect(link).toHaveAttribute('href', '/contact')
  })

  it('should have dark mode support', () => {
    render(<TermsPage />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveClass('dark:text-white')
    const paragraph = screen.getByText(/términos y condiciones de uso/i)
    expect(paragraph).toHaveClass('dark:text-gray-300')
  })
}) 