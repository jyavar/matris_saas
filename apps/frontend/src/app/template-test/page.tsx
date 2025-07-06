/**
 * Página de prueba para componentes template
 * @description Página para verificar que todos los componentes template funcionan correctamente
 */

import React from 'react'

import {
  Footer,
  HeroSection,
  Navbar,
  NewsletterForm,
  PricingCards,
  Testimonials} from '../../components/template'

const samplePricingCards = [
  {
    title: 'Starter',
    price: '$29/mes',
    description: 'Perfecto para proyectos pequeños',
    features: [
      'Hasta 5 agentes',
      'Soporte por email',
      'Documentación básica',
      'Actualizaciones mensuales'
    ],
    ctaText: 'Comenzar gratis',
    ctaHref: '/signup'
  },
  {
    title: 'Pro',
    price: '$99/mes',
    description: 'Para equipos en crecimiento',
    features: [
      'Hasta 25 agentes',
      'Soporte prioritario',
      'Documentación completa',
      'Actualizaciones semanales',
      'Integraciones avanzadas'
    ],
    ctaText: 'Comenzar prueba',
    ctaHref: '/signup',
    popular: true
  },
  {
    title: 'Enterprise',
    price: '$299/mes',
    description: 'Para grandes organizaciones',
    features: [
      'Agentes ilimitados',
      'Soporte 24/7',
      'Documentación personalizada',
      'Actualizaciones diarias',
      'Integraciones personalizadas',
      'SLA garantizado'
    ],
    ctaText: 'Contactar ventas',
    ctaHref: '/contact'
  }
]

const sampleTestimonials = [
  {
    content: 'STRATO ha transformado completamente nuestro flujo de desarrollo. Los agentes inteligentes nos ahorran horas de trabajo manual.',
    author: 'María García',
    role: 'CTO',
    company: 'TechCorp'
  },
  {
    content: 'La arquitectura modular nos permite escalar sin problemas. Es exactamente lo que necesitábamos para nuestro SaaS.',
    author: 'Carlos Rodríguez',
    role: 'Lead Developer',
    company: 'StartupXYZ'
  },
  {
    content: 'Los componentes son increíblemente reutilizables y el tipado estricto nos ha ayudado a evitar muchos errores.',
    author: 'Ana López',
    role: 'Frontend Engineer',
    company: 'DigitalAgency'
  }
]

export default function TemplateTestPage() {
  const handleNewsletterSubmit = async (email: string) => {
    console.log('Newsletter subscription:', email)
    // Aquí iría la lógica real de suscripción
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        <HeroSection 
          title="Prueba de Componentes Template"
          description="Esta página demuestra todos los componentes template extraídos de BadtzUI y adaptados para STRATO."
          ctaText="Ver Dashboard"
          ctaHref="/dashboard"
          secondaryCtaText="Documentación"
          secondaryCtaHref="/docs"
        />
        
        <PricingCards cards={samplePricingCards} />
        
        <Testimonials testimonials={sampleTestimonials} />
        
        <div className="py-16 px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <NewsletterForm onSubmit={handleNewsletterSubmit} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
} 