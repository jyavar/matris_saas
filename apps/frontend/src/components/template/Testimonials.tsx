/**
 * Testimonials - Componente de testimonios de clientes
 * @description Muestra testimonios de usuarios con avatares y información
 */

import React from 'react'

import { TestimonialProps, TestimonialsProps } from '../../types/template'
import { Icons } from './Icons'

const Testimonial: React.FC<TestimonialProps> = ({
  content,
  author,
  role,
  company,
  avatar,
}) => {
  return (
    <div className="p-6 border border-border rounded-lg bg-background">
      <div className="flex items-start gap-4">
        {avatar ? (
          <img
            src={avatar}
            alt={author}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
            <Icons.logo className="h-6 w-6 text-muted-foreground" />
          </div>
        )}

        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-4 italic">
            &ldquo;{content}&rdquo;
          </p>

          <div>
            <div className="font-medium text-sm">{author}</div>
            <div className="text-xs text-muted-foreground">
              {role} en {company}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Testimonials: React.FC<TestimonialsProps> = ({
  testimonials,
  title = 'Lo que dicen nuestros usuarios',
  description = 'Descubre cómo STRATO está transformando el desarrollo de aplicaciones',
}) => {
  return (
    <section className="py-16 px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
