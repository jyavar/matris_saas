import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import React from 'react'

import Home from './page'

// Mock the UI components
vi.mock('@/components/ui', () => ({
  Button: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
    <button {...props}>{children}</button>
  ),
  Card: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
    <div {...props}>{children}</div>
  ),
}))

// Mock Next.js Link component
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  BarChart: () => <div data-testid="bar-chart-icon">BarChart</div>,
  DollarSign: () => <div data-testid="dollar-sign-icon">DollarSign</div>,
  Zap: () => <div data-testid="zap-icon">Zap</div>,
}))

describe('Home Page', () => {
  it('should render the main heading', () => {
    render(<Home />)
    
    const heading = screen.getByText(/plataforma saas/i)
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Plataforma SaaS Enterprise-Grade')
  })

  it('should render the hero description', () => {
    render(<Home />)
    
    const description = screen.getByText(/gestión avanzada de campañas/i)
    expect(description).toBeInTheDocument()
    expect(description).toHaveTextContent(
      'Gestión avanzada de campañas, analytics en tiempo real y herramientas de marketing automatizado.'
    )
  })

  it('should render the call-to-action button', () => {
    render(<Home />)
    
    const ctaButton = screen.getByRole('link', { name: /comenzar ahora/i })
    expect(ctaButton).toBeInTheDocument()
    expect(ctaButton).toHaveAttribute('href', '/login')
  })

  it('should render all three feature cards', () => {
    render(<Home />)
    
    // Analytics card
    expect(screen.getByText('Analytics Avanzados')).toBeInTheDocument()
    expect(screen.getByText(/métricas en tiempo real/i)).toBeInTheDocument()
    expect(screen.getByTestId('bar-chart-icon')).toBeInTheDocument()
    
    // Campaigns card
    expect(screen.getByText('Gestión de Campañas')).toBeInTheDocument()
    expect(screen.getByText(/crea, gestiona y optimiza/i)).toBeInTheDocument()
    expect(screen.getByTestId('dollar-sign-icon')).toBeInTheDocument()
    
    // Automation card
    expect(screen.getByText('Automatización')).toBeInTheDocument()
    expect(screen.getByText(/flujos de trabajo automatizados/i)).toBeInTheDocument()
    expect(screen.getByTestId('zap-icon')).toBeInTheDocument()
  })

  it('should render feature cards with proper styling', () => {
    render(<Home />)
    
    const analyticsCard = screen.getByText('Analytics Avanzados').closest('div')
    const campaignsCard = screen.getByText('Gestión de Campañas').closest('div')
    const automationCard = screen.getByText('Automatización').closest('div')
    
    expect(analyticsCard).toHaveClass('text-center')
    expect(campaignsCard).toHaveClass('text-center')
    expect(automationCard).toHaveClass('text-center')
  })

  it('should render feature icons with proper styling', () => {
    render(<Home />)
    
    const analyticsIcon = screen.getByTestId('bar-chart-icon').parentElement
    const campaignsIcon = screen.getByTestId('dollar-sign-icon').parentElement
    const automationIcon = screen.getByTestId('zap-icon').parentElement
    
    expect(analyticsIcon).toHaveClass('bg-blue-500')
    expect(campaignsIcon).toHaveClass('bg-green-500')
    expect(automationIcon).toHaveClass('bg-purple-500')
  })

  it('should render the main container with proper classes', () => {
    render(<Home />)
    
    const mainContainer = screen.getByRole('main')
    expect(mainContainer).toHaveClass('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12')
  })

  it('should render the page with dark mode support', () => {
    render(<Home />)
    
    // Buscar el div principal que tiene las clases dark mode
    const pageContainer = document.querySelector('.min-h-screen.bg-gradient-to-br')
    expect(pageContainer).toHaveClass('dark:from-gray-900 dark:to-gray-800')
  })

  it('should render the features grid with responsive classes', () => {
    render(<Home />)
    
    // Buscar el contenedor del grid directamente
    const featuresGrid = document.querySelector('.grid.grid-cols-1.gap-8')
    expect(featuresGrid).toHaveClass('grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3')
  })

  it('should render feature descriptions with proper styling', () => {
    render(<Home />)
    
    const analyticsDescription = screen.getByText(/métricas en tiempo real/i)
    const campaignsDescription = screen.getByText(/crea, gestiona y optimiza/i)
    const automationDescription = screen.getByText(/flujos de trabajo automatizados/i)
    
    expect(analyticsDescription).toHaveClass('text-base text-gray-500 dark:text-gray-300')
    expect(campaignsDescription).toHaveClass('text-base text-gray-500 dark:text-gray-300')
    expect(automationDescription).toHaveClass('text-base text-gray-500 dark:text-gray-300')
  })

  it('should render the hero section with proper spacing', () => {
    render(<Home />)
    
    const heroSection = screen.getByText(/plataforma saas/i).closest('div')
    expect(heroSection).toHaveClass('text-center')
  })

  it('should render the CTA button with proper styling', () => {
    render(<Home />)
    
    // Buscar el Button element directamente, no el Link
    const ctaButton = screen.getByText('Comenzar ahora')
    expect(ctaButton).toHaveClass('w-full')
  })
}) 