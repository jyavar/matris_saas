/**
 * PricingCards - Componente de tarjetas de precios
 * @description Muestra diferentes planes de precios con características y CTAs
 */

import Link from 'next/link'
import React from 'react'

import { cn } from '../../lib/utils'
import { PricingCardProps, PricingCardsProps } from '../../types/template'

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  description,
  features,
  ctaText,
  ctaHref,
  popular = false,
  disabled = false,
}) => {
  return (
    <div
      className={cn(
        'relative p-6 border rounded-lg',
        popular ? 'border-primary bg-primary/5' : 'border-border bg-background',
        disabled && 'opacity-50 cursor-not-allowed',
      )}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
            Más Popular
          </span>
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <div className="text-3xl font-bold mb-2">{price}</div>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>

      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        href={ctaHref}
        className={cn(
          'block w-full text-center py-2 px-4 rounded-md font-medium transition-colors',
          popular
            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
            : 'bg-muted text-foreground hover:bg-muted/80',
          disabled && 'pointer-events-none',
        )}
      >
        {ctaText}
      </Link>
    </div>
  )
}

export const PricingCards: React.FC<PricingCardsProps> = ({ cards }) => {
  return (
    <section className="py-16 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Planes y Precios</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Elige el plan que mejor se adapte a tus necesidades
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <PricingCard key={index} {...card} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default PricingCards
