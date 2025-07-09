import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import HomePage from './page'

// Mock Next.js Link component
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

describe('HomePage', () => {
  it('should render the main heading', () => {
    render(<HomePage />)
    
    const heading = screen.getByText(/bienvenido a strato core os/i)
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Bienvenido a STRATO Core OS™')
  })

  it('should render the STRATO logo', () => {
    render(<HomePage />)
    
    const logo = screen.getByText('S')
    const brandName = screen.getByText('STRATO')
    
    expect(logo).toBeInTheDocument()
    expect(brandName).toBeInTheDocument()
  })

  it('should render the description', () => {
    render(<HomePage />)
    
    const description = screen.getByText(/plataforma de auditoría técnica/i)
    expect(description).toBeInTheDocument()
    expect(description).toHaveTextContent(
      'Plataforma de auditoría técnica, control y automatización de calidad para tu monorepo.'
    )
  })

  it('should render the dashboard button', () => {
    render(<HomePage />)
    
    const button = screen.getByRole('link', { name: /ir al dashboard/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('href', '/control-tower')
  })

  it('should render the main container with proper styling', () => {
    render(<HomePage />)
    
    const mainContainer = screen.getByText(/bienvenido a strato core os/i).closest('div')?.parentElement
    expect(mainContainer).toHaveClass('min-h-screen flex items-center justify-center')
    expect(mainContainer).toHaveClass('bg-gradient-to-br from-blue-900 via-blue-700 to-green-400')
  })

  it('should render the card container with proper styling', () => {
    render(<HomePage />)
    
    const cardContainer = screen.getByText(/bienvenido a strato core os/i).parentElement
    expect(cardContainer).toHaveClass('bg-white/90 rounded-2xl shadow-2xl p-10')
    expect(cardContainer).toHaveClass('flex flex-col items-center max-w-md w-full')
  })

  it('should render the logo container with proper styling', () => {
    render(<HomePage />)
    
    const logoContainer = screen.getByText('S').parentElement
    expect(logoContainer).toHaveClass('flex items-center gap-3 mb-6')
  })

  it('should render the logo with gradient styling', () => {
    render(<HomePage />)
    
    const logo = screen.getByText('S')
    expect(logo).toHaveClass('bg-gradient-to-r from-blue-400 to-green-400')
    expect(logo).toHaveClass('w-12 h-12 rounded flex items-center justify-center')
    expect(logo).toHaveClass('font-bold text-2xl text-white shadow-lg')
  })

  it('should render the brand name with proper styling', () => {
    render(<HomePage />)
    
    const brandName = screen.getByText('STRATO')
    expect(brandName).toHaveClass('font-bold text-3xl tracking-tight text-gray-800')
  })

  it('should render the heading with proper styling', () => {
    render(<HomePage />)
    
    const heading = screen.getByText(/bienvenido a strato core os/i)
    expect(heading).toHaveClass('text-2xl font-bold text-gray-800 mb-2 text-center')
  })

  it('should render the description with proper styling', () => {
    render(<HomePage />)
    
    const description = screen.getByText(/plataforma de auditoría técnica/i)
    expect(description).toHaveClass('text-gray-600 mb-8 text-center')
  })

  it('should render the dashboard button with proper styling', () => {
    render(<HomePage />)
    
    const button = screen.getByRole('link', { name: /ir al dashboard/i })
    expect(button).toHaveAttribute('href', '/control-tower')
    
    const buttonElement = button.querySelector('button')
    expect(buttonElement).toHaveClass('w-full py-3 rounded-lg bg-blue-700 hover:bg-blue-800')
    expect(buttonElement).toHaveClass('text-white font-semibold text-lg shadow transition')
  })

  it('should render the complete page structure', () => {
    render(<HomePage />)
    
    // Verify all main elements are present
    expect(screen.getByText('S')).toBeInTheDocument()
    expect(screen.getByText('STRATO')).toBeInTheDocument()
    expect(screen.getByText(/bienvenido a strato core os/i)).toBeInTheDocument()
    expect(screen.getByText(/plataforma de auditoría técnica/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /ir al dashboard/i })).toBeInTheDocument()
  })
}) 