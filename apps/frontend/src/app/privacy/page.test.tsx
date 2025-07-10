import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import React from 'react'

import PrivacyPage from './page'

describe('PrivacyPage', () => {
  it('should render privacy heading and content', () => {
    render(<PrivacyPage />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Política de Privacidad')
    expect(screen.getByText(/privacidad y protección de tus datos/i)).toBeInTheDocument()
    expect(screen.getByText(/normativas internacionales de protección de datos/i)).toBeInTheDocument()
  })

  it('should have a contact link for more info', () => {
    render(<PrivacyPage />)
    const link = screen.getByRole('link', { name: /contáctanos para más información/i })
    expect(link).toHaveAttribute('href', '/contact')
  })

  it('should have dark mode support', () => {
    render(<PrivacyPage />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveClass('dark:text-white')
    const paragraph = screen.getByText(/privacidad y protección de tus datos/i)
    expect(paragraph).toHaveClass('dark:text-gray-300')
  })
}) 