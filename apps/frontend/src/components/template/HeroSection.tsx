/**
 * HeroSection - Sección hero principal del template
 * @description Componente de hero con título, descripción, CTAs y badges de tecnologías
 */

import Link from 'next/link'
import React from 'react'

import { HeroSectionProps } from '../../types/template'
import { Icons } from './Icons'

const techTags = [
  { name: 'React', icon: <Icons.logo className="h-4 w-4" /> },
  { name: 'Next.js', icon: <Icons.logo className="h-4 w-4" /> },
  { name: 'TypeScript', icon: <Icons.logo className="h-4 w-4" /> },
  { name: 'Tailwind', icon: <Icons.logo className="h-4 w-4" /> },
]

const TechBadge: React.FC<{
  icon: React.ReactNode
  children: React.ReactNode
}> = ({ icon, children }) => (
  <div className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 border border-border rounded-lg text-sm">
    {icon}
    <span>{children}</span>
  </div>
)

export const HeroSection: React.FC<HeroSectionProps> = ({
  title = 'Framework SaaS enterprise-grade',
  description = 'STRATO Core OS™ es un framework SaaS moderno para desarrollo de aplicaciones empresariales con arquitectura modular, agentes inteligentes y componentes reutilizables.',
  ctaText = 'Comenzar',
  ctaHref = '/dashboard',
  secondaryCtaText = 'Documentación',
  secondaryCtaHref = '/docs',
}) => {
  return (
    <section className="w-full h-full pt-10 md:pt-20 overflow-hidden relative">
      <div className="lg:max-w-6xl mx-auto z-10 relative">
        <div className="lg:text-center text-left flex flex-col items-start lg:items-center justify-center px-6 lg:px-8">
          <h1 className="md:max-w-[700px] text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tighter mt-8 md:mt-10 text-balance bg-gradient-to-b from-foreground/80 via-foreground to-foreground/60 inline-block text-transparent bg-clip-text pb-2">
            {title}
          </h1>
          <p className="mt-4 text-balance tracking-tight sm:mt-3 max-w-[680px] text-muted-foreground text-base md:text-lg">
            {description}
          </p>
          <div className="mt-8 flex gap-3.5">
            <Link
              href={ctaHref}
              className="h-9 px-5 shadow-sm font-medium text-sm rounded-xl bg-foreground text-background hover:bg-foreground/85 flex items-center relative transition-colors duration-300"
            >
              {ctaText}
            </Link>
            {secondaryCtaText && secondaryCtaHref && (
              <Link
                href={secondaryCtaHref}
                className="h-[38px] px-5 font-medium text-sm rounded-xl bg-muted text-foreground border border-border hover:border-border/40 flex items-center relative transition-colors duration-300"
              >
                {secondaryCtaText}
              </Link>
            )}
          </div>
          <div className="flex items-center gap-2 flex-wrap max-w-lg lg:justify-center justify-start mt-10">
            {techTags.map((tag) => (
              <TechBadge key={tag.name} icon={tag.icon}>
                {tag.name}
              </TechBadge>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
