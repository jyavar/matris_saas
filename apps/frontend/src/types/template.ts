/**
 * Tipos comunes para componentes template extraídos de BadtzUI
 * @description Tipos compartidos entre componentes del template
 */

export interface NavigationLink {
  href: string
  label: string
  external?: boolean
}

export interface MobileLinkProps {
  href: string
  label: string
  className?: string
  onClick?: () => void
}

export interface NavigationItem {
  title: string
  icon?: React.ReactNode
  href?: string
  label?: string
  disabled?: boolean
  external?: boolean
  items?: NavigationItem[]
}

export interface DocsSidebarNavItemsProps {
  items: NavigationItem[]
  pathname: string
  onItemClick?: () => void
}

export interface BaseLayoutProps {
  children: React.ReactNode
}

export interface NavbarProps {
  links?: NavigationLink[]
  showGithubButton?: boolean
  showModeToggle?: boolean
  showSocialButtons?: boolean
}

export interface FooterProps {
  showNewsletter?: boolean
  showSocialLinks?: boolean
}

export interface HeroSectionProps {
  title: string
  description: string
  ctaText?: string
  ctaHref?: string
  secondaryCtaText?: string
  secondaryCtaHref?: string
}

export interface PricingCardProps {
  title: string
  price: string
  description: string
  features: string[]
  ctaText: string
  ctaHref: string
  popular?: boolean
  disabled?: boolean
}

export interface PricingCardsProps {
  cards: PricingCardProps[]
}

export interface TestimonialProps {
  content: string
  author: string
  role: string
  company: string
  avatar?: string
}

export interface TestimonialsProps {
  testimonials: TestimonialProps[]
  title?: string
  description?: string
}

export interface NewsletterFormProps {
  title?: string
  description?: string
  placeholder?: string
  buttonText?: string
  onSubmit?: (email: string) => void
}

export interface IconProps {
  className?: string
  size?: number
}
