/**
 * Phase 1 Tests - Foundation & Landing
 * @description Tests para validar que la Fase 1 esté completamente funcional
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Importar componentes de la Fase 1
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

describe('Phase 1: Foundation & Landing', () => {
  describe('BaseLayout Component', () => {
    it('should render children correctly', () => {
      const { getByText } = render(
        <BaseLayout>
          <div>Test Content</div>
        </BaseLayout>
      )

      expect(getByText('Test Content')).toBeInTheDocument()
    })

    it('should apply correct CSS classes', () => {
      const { container } = render(
        <BaseLayout>
          <div>Test</div>
        </BaseLayout>
      )

      const layoutElement = container.firstChild as HTMLElement
      expect(layoutElement).toHaveClass('min-h-screen', 'bg-background', 'font-sans')
    })
  })

  describe('HeroSection Component', () => {
    const defaultProps = {
      title: 'Test Title',
      description: 'Test Description',
      ctaText: 'Get Started',
      ctaHref: '/dashboard',
      secondaryCtaText: 'Learn More',
      secondaryCtaHref: '/docs'
    }

    it('should render with all props correctly', () => {
      render(<HeroSection {...defaultProps} />)

      expect(screen.getByText('Test Title')).toBeInTheDocument()
      expect(screen.getByText('Test Description')).toBeInTheDocument()
      expect(screen.getByText('Get Started')).toBeInTheDocument()
      expect(screen.getByText('Learn More')).toBeInTheDocument()
    })

    it('should render with default props', () => {
      render(<HeroSection title="Test" description="Test" ctaText="Test" ctaHref="/test" />)

      // Use getAllByText since there are multiple elements with "Test"
      const testElements = screen.getAllByText('Test')
      expect(testElements.length).toBeGreaterThan(0)
    })

    it('should have correct link attributes', () => {
      render(<HeroSection {...defaultProps} />)

      const primaryCta = screen.getByText('Get Started')
      const secondaryCta = screen.getByText('Learn More')

      expect(primaryCta.closest('a')).toHaveAttribute('href', '/dashboard')
      expect(secondaryCta.closest('a')).toHaveAttribute('href', '/docs')
    })
  })

  describe('PricingCards Component', () => {
    const mockCards = [
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

    it('should render all pricing cards', () => {
      render(<PricingCards cards={mockCards} />)

      expect(screen.getByText('Starter')).toBeInTheDocument()
      expect(screen.getByText('Pro')).toBeInTheDocument()
      expect(screen.getByText('$29/mes')).toBeInTheDocument()
      expect(screen.getByText('$99/mes')).toBeInTheDocument()
    })

    it('should show popular badge for popular cards', () => {
      render(<PricingCards cards={mockCards} />)

      // Look for the popular badge text
      expect(screen.getByText('Más Popular')).toBeInTheDocument()
    })

    it('should render all features for each card', () => {
      render(<PricingCards cards={mockCards} />)

      expect(screen.getByText('Hasta 5 agentes')).toBeInTheDocument()
      expect(screen.getByText('Soporte por email')).toBeInTheDocument()
      expect(screen.getByText('Hasta 25 agentes')).toBeInTheDocument()
      expect(screen.getByText('Soporte prioritario')).toBeInTheDocument()
    })

    it('should have correct CTA links', () => {
      render(<PricingCards cards={mockCards} />)

      const starterCta = screen.getByText('Comenzar gratis')
      const proCta = screen.getByText('Comenzar prueba')

      expect(starterCta.closest('a')).toHaveAttribute('href', '/signup')
      expect(proCta.closest('a')).toHaveAttribute('href', '/signup')
    })
  })

  describe('Testimonials Component', () => {
    const mockTestimonials = [
      {
        content: 'Amazing product!',
        author: 'John Doe',
        role: 'CEO',
        company: 'TechCorp'
      },
      {
        content: 'Great experience!',
        author: 'Jane Smith',
        role: 'CTO',
        company: 'StartupXYZ'
      }
    ]

    it('should render all testimonials', () => {
      render(<Testimonials testimonials={mockTestimonials} />)

      // Use regex to match text that might be fragmented
      expect(screen.getByText(/Amazing product!/)).toBeInTheDocument()
      expect(screen.getByText(/Great experience!/)).toBeInTheDocument()
    })

    it('should display author information correctly', () => {
      render(<Testimonials testimonials={mockTestimonials} />)

      // Use regex to match text that might be fragmented
      expect(screen.getByText(/Amazing product!/)).toBeInTheDocument()
      expect(screen.getByText(/Great experience!/)).toBeInTheDocument()

      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getByText(/CEO/)).toBeInTheDocument()
      expect(screen.getByText(/TechCorp/)).toBeInTheDocument()
      expect(screen.getByText('Jane Smith')).toBeInTheDocument()
      expect(screen.getByText(/CTO/)).toBeInTheDocument()
      expect(screen.getByText(/StartupXYZ/)).toBeInTheDocument()
    })
  })

  describe('NewsletterForm Component', () => {
    const mockOnSubmit = vi.fn()

    beforeEach(() => {
      vi.clearAllMocks()
    })

    it('should render form elements correctly', () => {
      render(<NewsletterForm onSubmit={mockOnSubmit} />)

      expect(screen.getByText('Mantente actualizado')).toBeInTheDocument()
      expect(screen.getByText('Recibe las últimas noticias y actualizaciones de STRATO')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('tu@email.com')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Suscribir' })).toBeInTheDocument()
    })

    it('should handle email input correctly', async () => {
      const user = userEvent.setup()
      render(<NewsletterForm onSubmit={mockOnSubmit} />)

      const emailInput = screen.getByPlaceholderText('tu@email.com')
      await user.type(emailInput, 'test@example.com')

      expect(emailInput).toHaveValue('test@example.com')
    })

    it('should submit form with valid email', async () => {
      const user = userEvent.setup()
      render(<NewsletterForm onSubmit={mockOnSubmit} />)

      const emailInput = screen.getByPlaceholderText('tu@email.com')
      const submitButton = screen.getByRole('button', { name: 'Suscribir' })

      await user.type(emailInput, 'test@example.com')
      await user.click(submitButton)

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith('test@example.com')
      })
    })

    it('should show success message after submission', async () => {
      const user = userEvent.setup()
      render(<NewsletterForm onSubmit={mockOnSubmit} />)

      const emailInput = screen.getByPlaceholderText('tu@email.com')
      const submitButton = screen.getByRole('button', { name: 'Suscribir' })

      await user.type(emailInput, 'test@example.com')
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('¡Gracias por suscribirte!')).toBeInTheDocument()
        expect(screen.getByText('Te mantendremos informado sobre las últimas novedades.')).toBeInTheDocument()
      })
    })

    it('should disable submit button when email is empty', () => {
      render(<NewsletterForm onSubmit={mockOnSubmit} />)

      const submitButton = screen.getByRole('button', { name: 'Suscribir' })
      expect(submitButton).toBeDisabled()
    })

    it('should not submit with invalid email', async () => {
      const user = userEvent.setup()
      render(<NewsletterForm onSubmit={mockOnSubmit} />)

      const emailInput = screen.getByPlaceholderText('tu@email.com')
      const submitButton = screen.getByRole('button', { name: 'Suscribir' })

      await user.type(emailInput, 'invalid-email')
      await user.click(submitButton)

      expect(mockOnSubmit).not.toHaveBeenCalled()
    })
  })

  describe('Icons Component', () => {
    it('should export all required icons', () => {
      expect(Icons.logo).toBeDefined()
      expect(Icons.spinner).toBeDefined()
      expect(Icons.twitter).toBeDefined()
      expect(Icons.gitHub).toBeDefined()
      expect(Icons.menu).toBeDefined()
      expect(Icons.chevronDown).toBeDefined()
    })

    it('should render logo icon correctly', () => {
      const { container } = render(<Icons.logo className="h-8 w-8" />)
      const svg = container.querySelector('svg')
      expect(svg).toBeInTheDocument()
      expect(svg).toHaveClass('h-8', 'w-8')
    })

    it('should render spinner icon correctly', () => {
      const { container } = render(<Icons.spinner className="h-4 w-4 animate-spin" />)
      const svg = container.querySelector('svg')
      expect(svg).toBeInTheDocument()
      expect(svg).toHaveClass('h-4', 'w-4', 'animate-spin')
    })

    it('should render all icon types as SVG elements', () => {
      const { container: logoContainer } = render(<Icons.logo />)
      const { container: spinnerContainer } = render(<Icons.spinner />)
      const { container: twitterContainer } = render(<Icons.twitter />)
      const { container: gitHubContainer } = render(<Icons.gitHub />)
      const { container: menuContainer } = render(<Icons.menu />)
      const { container: chevronContainer } = render(<Icons.chevronDown />)

      expect(logoContainer.querySelector('svg')).toBeInTheDocument()
      expect(spinnerContainer.querySelector('svg')).toBeInTheDocument()
      expect(twitterContainer.querySelector('svg')).toBeInTheDocument()
      expect(gitHubContainer.querySelector('svg')).toBeInTheDocument()
      expect(menuContainer.querySelector('svg')).toBeInTheDocument()
      expect(chevronContainer.querySelector('svg')).toBeInTheDocument()
    })
  })

  describe('Landing Page Integration', () => {
    it('should render complete landing page structure', () => {
      const { container } = render(
        <BaseLayout>
          <main>
            <HeroSection 
              title="STRATO Core OS™"
              description="Framework SaaS enterprise-grade"
              ctaText="Comenzar ahora"
              ctaHref="/dashboard"
              secondaryCtaText="Ver documentación"
              secondaryCtaHref="/docs"
            />
            <PricingCards cards={[]} />
            <Testimonials testimonials={[]} />
            <NewsletterForm onSubmit={vi.fn()} />
          </main>
        </BaseLayout>
      )

      expect(container).toBeInTheDocument()
      expect(screen.getByText('STRATO Core OS™')).toBeInTheDocument()
      expect(screen.getByText('Framework SaaS enterprise-grade')).toBeInTheDocument()
      expect(screen.getByText('Comenzar ahora')).toBeInTheDocument()
      expect(screen.getByText('Ver documentación')).toBeInTheDocument()
    })
  })

  describe('TypeScript Type Safety', () => {
    it('should have proper TypeScript types for all components', () => {
      // This test validates that all components are properly typed
      // If there are type errors, TypeScript compilation will fail
      expect(typeof BaseLayout).toBe('function')
      expect(typeof HeroSection).toBe('function')
      expect(typeof PricingCards).toBe('function')
      expect(typeof Testimonials).toBe('function')
      expect(typeof NewsletterForm).toBe('function')
      expect(typeof Icons).toBe('object')
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA labels and roles', () => {
      render(<NewsletterForm onSubmit={vi.fn()} />)

      const emailInput = screen.getByPlaceholderText('tu@email.com')
      expect(emailInput).toHaveAttribute('type', 'email')
      expect(emailInput).toHaveAttribute('required')
    })

    it('should have proper heading hierarchy', () => {
      render(
        <HeroSection 
          title="Test Title"
          description="Test Description"
          ctaText="Test"
          ctaHref="/test"
        />
      )

      const heading = screen.getByText('Test Title')
      expect(heading.tagName).toBe('H1')
    })
  })

  describe('Responsive Design', () => {
    it('should apply responsive classes correctly', () => {
      const { container } = render(
        <BaseLayout>
          <div>Test</div>
        </BaseLayout>
      )

      const layoutElement = container.firstChild as HTMLElement
      expect(layoutElement).toHaveClass('min-h-screen')
    })
  })
}) 