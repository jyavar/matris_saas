/**
 * Phase 1 Integration Tests - Foundation & Landing
 * @description Tests de integración para validar el flujo completo de la Fase 1
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Importar componentes y página principal
import {
  BaseLayout,
  HeroSection,
  PricingCards,
  Testimonials,
  NewsletterForm,
  Icons
} from '../components/template'

// Mock de servicios externos
vi.mock('../services/supabase', () => ({
  supabase: {
    auth: {
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn()
    }
  }
}))

// Mock de AuthContext
vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: null,
    loading: false
  }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

// Mock de Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn()
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams()
}))

describe('Phase 1 Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Complete Landing Page Flow', () => {
    const mockPricingCards = [
      {
        title: 'Starter',
        price: '$29/mes',
        description: 'Perfecto para proyectos pequeños',
        features: ['Hasta 5 agentes', 'Soporte por email'],
        ctaText: 'Comenzar gratis',
        ctaHref: '/signup'
      },
      {
        title: 'Pro',
        price: '$99/mes',
        description: 'Para equipos en crecimiento',
        features: ['Hasta 25 agentes', 'Soporte prioritario'],
        ctaText: 'Comenzar prueba',
        ctaHref: '/signup',
        popular: true
      }
    ]

    const mockTestimonials = [
      {
        content: 'STRATO ha transformado completamente nuestra operación.',
        author: 'María García',
        role: 'CEO',
        company: 'TechStartup'
      },
      {
        content: 'La mejor plataforma SaaS que hemos usado.',
        author: 'Carlos Rodríguez',
        role: 'CTO',
        company: 'InnovateCorp'
      }
    ]

    it('should render complete landing page with all sections', () => {
      const mockNewsletterSubmit = vi.fn()

      render(
        <BaseLayout>
          <main>
            <HeroSection 
              title="STRATO Core OS™"
              description="Framework SaaS enterprise-grade que prioriza Developer Experience, Code Quality, Security, Performance, Scalability y Monitoring."
              ctaText="Comenzar ahora"
              ctaHref="/dashboard"
              secondaryCtaText="Ver documentación"
              secondaryCtaHref="/docs"
            />
            <PricingCards cards={mockPricingCards} />
            <Testimonials testimonials={mockTestimonials} />
            <NewsletterForm onSubmit={mockNewsletterSubmit} />
          </main>
        </BaseLayout>
      )

      // Hero Section
      expect(screen.getByText('STRATO Core OS™')).toBeInTheDocument()
      expect(screen.getByText(/Framework SaaS enterprise-grade/)).toBeInTheDocument()
      expect(screen.getByText('Comenzar ahora')).toBeInTheDocument()
      expect(screen.getByText('Ver documentación')).toBeInTheDocument()

      // Pricing Cards
      expect(screen.getByText('Starter')).toBeInTheDocument()
      expect(screen.getByText('Pro')).toBeInTheDocument()
      expect(screen.getByText('$29/mes')).toBeInTheDocument()
      expect(screen.getByText('$99/mes')).toBeInTheDocument()
      expect(screen.getByText('Más Popular')).toBeInTheDocument()

      // Testimonials
      expect(screen.getByText(/STRATO ha transformado completamente/)).toBeInTheDocument()
      expect(screen.getByText(/La mejor plataforma SaaS/)).toBeInTheDocument()
      expect(screen.getByText('María García')).toBeInTheDocument()
      expect(screen.getByText('Carlos Rodríguez')).toBeInTheDocument()

      // Newsletter
      expect(screen.getByText('Mantente actualizado')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('tu@email.com')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Suscribir' })).toBeInTheDocument()
    })

    it('should handle newsletter subscription flow', async () => {
      const user = userEvent.setup()
      const mockNewsletterSubmit = vi.fn()

      render(
        <BaseLayout>
          <NewsletterForm onSubmit={mockNewsletterSubmit} />
        </BaseLayout>
      )

      const emailInput = screen.getByPlaceholderText('tu@email.com')
      const submitButton = screen.getByRole('button', { name: 'Suscribir' })

      // Initially button should be disabled
      expect(submitButton).toBeDisabled()

      // Type valid email
      await user.type(emailInput, 'test@example.com')

      // Button should be enabled
      expect(submitButton).not.toBeDisabled()

      // Submit form
      await user.click(submitButton)

      // Should call onSubmit
      await waitFor(() => {
        expect(mockNewsletterSubmit).toHaveBeenCalledWith('test@example.com')
      })

      // Should show success message
      await waitFor(() => {
        expect(screen.getByText('¡Gracias por suscribirte!')).toBeInTheDocument()
        expect(screen.getByText('Te mantendremos informado sobre las últimas novedades.')).toBeInTheDocument()
      })
    })

    it('should handle pricing card interactions', () => {
      render(
        <BaseLayout>
          <PricingCards cards={mockPricingCards} />
        </BaseLayout>
      )

      const starterCta = screen.getByText('Comenzar gratis')
      const proCta = screen.getByText('Comenzar prueba')

      expect(starterCta.closest('a')).toHaveAttribute('href', '/signup')
      expect(proCta.closest('a')).toHaveAttribute('href', '/signup')

      // Verify popular badge is present
      expect(screen.getByText('Más Popular')).toBeInTheDocument()
    })

    it('should handle hero section navigation', () => {
      render(
        <BaseLayout>
          <HeroSection 
            title="STRATO Core OS™"
            description="Framework SaaS enterprise-grade"
            ctaText="Comenzar ahora"
            ctaHref="/dashboard"
            secondaryCtaText="Ver documentación"
            secondaryCtaHref="/docs"
          />
        </BaseLayout>
      )

      const primaryCta = screen.getByText('Comenzar ahora')
      const secondaryCta = screen.getByText('Ver documentación')

      expect(primaryCta.closest('a')).toHaveAttribute('href', '/dashboard')
      expect(secondaryCta.closest('a')).toHaveAttribute('href', '/docs')
    })
  })

  describe('Component Interaction Tests', () => {
    it('should handle form validation correctly', async () => {
      const user = userEvent.setup()
      const mockSubmit = vi.fn()

      render(<NewsletterForm onSubmit={mockSubmit} />)

      const emailInput = screen.getByPlaceholderText('tu@email.com')
      const submitButton = screen.getByRole('button', { name: 'Suscribir' })

      // Try to submit with invalid email
      await user.type(emailInput, 'invalid-email')
      await user.click(submitButton)

      expect(mockSubmit).not.toHaveBeenCalled()

      // Clear and try with valid email
      await user.clear(emailInput)
      await user.type(emailInput, 'valid@example.com')
      await user.click(submitButton)

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledWith('valid@example.com')
      })
    })

    it('should handle multiple newsletter submissions', async () => {
      const user = userEvent.setup()
      const mockSubmit = vi.fn()

      render(<NewsletterForm onSubmit={mockSubmit} />)

      const emailInput = screen.getByPlaceholderText('tu@email.com')
      const submitButton = screen.getByRole('button', { name: 'Suscribir' })

      // First submission
      await user.type(emailInput, 'first@example.com')
      await user.click(submitButton)

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledWith('first@example.com')
      })

      // Form should be in submitted state
      expect(screen.getByText('¡Gracias por suscribirte!')).toBeInTheDocument()
    })
  })

  describe('Responsive Design Integration', () => {
    it('should maintain layout structure across sections', () => {
      const { container } = render(
        <BaseLayout>
          <main>
            <HeroSection 
              title="Test"
              description="Test"
              ctaText="Test"
              ctaHref="/test"
            />
            <PricingCards cards={[]} />
            <Testimonials testimonials={[]} />
            <NewsletterForm onSubmit={vi.fn()} />
          </main>
        </BaseLayout>
      )

      // Verify main structure
      expect(container.querySelector('main')).toBeInTheDocument()
      expect(container.querySelector('main')?.children.length).toBeGreaterThan(0)
    })

    it('should apply consistent styling classes', () => {
      const { container } = render(
        <BaseLayout>
          <HeroSection 
            title="Test"
            description="Test"
            ctaText="Test"
            ctaHref="/test"
          />
        </BaseLayout>
      )

      const layoutElement = container.firstChild as HTMLElement
      expect(layoutElement).toHaveClass('min-h-screen', 'bg-background', 'font-sans')
    })
  })

  describe('Accessibility Integration', () => {
    it('should maintain proper heading hierarchy', () => {
      render(
        <BaseLayout>
          <HeroSection 
            title="Main Title"
            description="Description"
            ctaText="CTA"
            ctaHref="/test"
          />
        </BaseLayout>
      )

      const mainHeading = screen.getByText('Main Title')
      expect(mainHeading.tagName).toBe('H1')
    })

    it('should have proper form accessibility', () => {
      render(<NewsletterForm onSubmit={vi.fn()} />)

      const emailInput = screen.getByPlaceholderText('tu@email.com')
      const submitButton = screen.getByRole('button', { name: 'Suscribir' })

      expect(emailInput).toHaveAttribute('type', 'email')
      expect(emailInput).toHaveAttribute('required')
      expect(submitButton).toHaveAttribute('type', 'submit')
    })

    it('should have proper link accessibility', () => {
      render(
        <HeroSection 
          title="Test"
          description="Test"
          ctaText="Test Link"
          ctaHref="/test"
        />
      )

      const link = screen.getByText('Test Link').closest('a')
      expect(link).toHaveAttribute('href', '/test')
    })
  })

  describe('Error Handling Integration', () => {
    it('should handle empty testimonials gracefully', () => {
      render(<Testimonials testimonials={[]} />)

      // Should render without errors
      expect(screen.getByText(/Lo que dicen nuestros usuarios/)).toBeInTheDocument()
    })

    it('should handle empty pricing cards gracefully', () => {
      render(<PricingCards cards={[]} />)

      // Should render without errors
      expect(screen.getByText(/Planes y Precios/)).toBeInTheDocument()
    })

    it('should handle newsletter submission errors gracefully', async () => {
      const user = userEvent.setup()
      const mockSubmit = vi.fn().mockRejectedValue(new Error('Network error'))

      render(<NewsletterForm onSubmit={mockSubmit} />)

      const emailInput = screen.getByPlaceholderText('tu@email.com')
      const submitButton = screen.getByRole('button', { name: 'Suscribir' })

      await user.type(emailInput, 'test@example.com')
      await user.click(submitButton)

      // Should not crash and should call onSubmit (even if it fails)
      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledWith('test@example.com')
      })
    })
  })

  describe('Performance Integration', () => {
    it('should render all components without performance issues', () => {
      const startTime = performance.now()

      render(
        <BaseLayout>
          <main>
            <HeroSection 
              title="Test"
              description="Test"
              ctaText="Test"
              ctaHref="/test"
            />
            <PricingCards cards={[]} />
            <Testimonials testimonials={[]} />
            <NewsletterForm onSubmit={vi.fn()} />
          </main>
        </BaseLayout>
      )

      const endTime = performance.now()
      const renderTime = endTime - startTime

      // Should render in under 100ms
      expect(renderTime).toBeLessThan(100)
    })

    it('should handle rapid user interactions', async () => {
      const user = userEvent.setup()
      const mockSubmit = vi.fn()

      render(<NewsletterForm onSubmit={mockSubmit} />)

      const emailInput = screen.getByPlaceholderText('tu@email.com')
      const submitButton = screen.getByRole('button', { name: 'Suscribir' })

      // Rapid typing and clicking
      await user.type(emailInput, 'test@example.com')
      await user.click(submitButton)
      await user.click(submitButton)
      await user.click(submitButton)

      // Should only submit once
      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('Cross-Browser Compatibility', () => {
    it('should render SVG icons correctly', () => {
      const { container } = render(
        <div>
          <Icons.logo />
          <Icons.spinner />
          <Icons.twitter />
          <Icons.gitHub />
        </div>
      )

      const svgs = container.querySelectorAll('svg')
      expect(svgs.length).toBe(4)

      // Each SVG should have proper attributes
      svgs.forEach(svg => {
        // Check for either currentColor or none fill attribute
        const fill = svg.getAttribute('fill')
        expect(fill === 'currentColor' || fill === 'none').toBe(true)
      })
    })

    it('should handle form elements consistently', () => {
      render(<NewsletterForm onSubmit={vi.fn()} />)

      const emailInput = screen.getByPlaceholderText('tu@email.com')
      const submitButton = screen.getByRole('button', { name: 'Suscribir' })

      // Should have proper HTML5 attributes
      expect(emailInput).toHaveAttribute('type', 'email')
      expect(emailInput).toHaveAttribute('required')
      expect(submitButton).toHaveAttribute('type', 'submit')
    })
  })

  describe('SEO and Meta Integration', () => {
    it('should have proper semantic HTML structure', () => {
      const { container } = render(
        <BaseLayout>
          <main>
            <HeroSection 
              title="SEO Title"
              description="SEO Description"
              ctaText="CTA"
              ctaHref="/test"
            />
          </main>
        </BaseLayout>
      )

      // Should have proper semantic structure
      expect(container.querySelector('main')).toBeInTheDocument()
      expect(container.querySelector('h1')).toBeInTheDocument()
    })

    it('should have proper heading structure for SEO', () => {
      render(
        <HeroSection 
          title="Main Heading"
          description="Description"
          ctaText="CTA"
          ctaHref="/test"
        />
      )

      const mainHeading = screen.getByText('Main Heading')
      expect(mainHeading.tagName).toBe('H1')
    })
  })
}) 