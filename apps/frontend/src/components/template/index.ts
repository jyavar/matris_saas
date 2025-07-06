/**
 * Template Components - Exportaciones principales
 * @description Exporta todos los componentes del template para uso fácil
 */

export { default as BaseLayout } from './BaseLayout'
export { default as Footer } from './Footer'
export { default as HeroSection } from './HeroSection'
export { default as Icons } from './Icons'
export { default as Navbar } from './Navbar'
export { default as NewsletterForm } from './NewsletterForm'
export { default as PricingCards } from './PricingCards'
export { default as Testimonials } from './Testimonials'

// Re-exportar tipos
export type {
  BaseLayoutProps,
  DocsSidebarNavItemsProps,
  FooterProps,
  HeroSectionProps,
  IconProps,
  MobileLinkProps,
  NavbarProps,
  NavigationItem,
  NavigationLink,
  NewsletterFormProps,
  PricingCardProps,
  PricingCardsProps,
  TestimonialProps,
  TestimonialsProps,
} from '../../types/template'
