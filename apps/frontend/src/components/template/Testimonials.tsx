'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'María García',
    role: 'CTO, TechStartup',
    content: 'STRATO Core OS™ transformó completamente nuestro desarrollo. Los agentes inteligentes automatizaron el 80% de nuestras tareas repetitivas.',
    rating: 5,
    avatar: '👩‍💼'
  },
  {
    name: 'Carlos Rodríguez',
    role: 'Lead Developer, EnterpriseCorp',
    content: 'La arquitectura modular y la seguridad enterprise nos permitieron escalar sin preocupaciones. El rendimiento es excepcional.',
    rating: 5,
    avatar: '👨‍💻'
  },
  {
    name: 'Ana Martínez',
    role: 'Product Manager, InnovateLab',
    content: 'Los componentes UI y el sistema de analytics nos ayudaron a lanzar productos 3 veces más rápido. ¡Increíble experiencia!',
    rating: 5,
    avatar: '👩‍🎨'
  }
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre cómo STRATO Core OS™ está transformando el desarrollo 
            de aplicaciones SaaS en todo el mundo
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-200"
            >
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-4">{testimonial.avatar}</div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed">
                "{testimonial.content}"
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center space-x-2 text-gray-600">
            <span className="text-2xl">⭐</span>
            <span className="font-semibold">4.9/5</span>
            <span>basado en 500+ reseñas</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 