import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import AboutPage from './page'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/about',
}))

describe('AboutPage', () => {
  it('should render the about page with correct content', () => {
    render(<AboutPage />)

    // Verificar que el título principal se renderiza
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getByText('Sobre STRATO Core OS™')).toBeInTheDocument()

    // Verificar que la descripción se renderiza
    expect(screen.getByText(/Esta página describe la misión/)).toBeInTheDocument()
  })

  it('should have proper heading hierarchy', () => {
    render(<AboutPage />)

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveClass('text-3xl', 'font-bold', 'text-gray-900', 'dark:text-white')
  })

  it('should have responsive design classes', () => {
    render(<AboutPage />)

    const paragraph = screen.getByText(/Esta página describe/)
    expect(paragraph).toHaveClass('max-w-2xl', 'text-center')
  })

  it('should support dark mode', () => {
    render(<AboutPage />)

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveClass('dark:text-white')

    const paragraph = screen.getByText(/Esta página describe/)
    expect(paragraph).toHaveClass('dark:text-gray-300')
  })

  it('should have semantic HTML structure', () => {
    const { container } = render(<AboutPage />)
    
    // Verificar que tiene section
    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
    expect(section).toHaveClass('min-h-[60vh]', 'flex', 'flex-col', 'items-center', 'justify-center')
  })
}) 