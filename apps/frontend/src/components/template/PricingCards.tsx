'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    price: '$29',
    period: '/mes',
    description: 'Perfecto para proyectos pequeños y startups',
    features: [
      'Hasta 5 agentes inteligentes',
      '10GB almacenamiento',
      'Soporte por email',
      'Analytics básicos',
      'Deploy automático'
    ],
    popular: false
  },
  {
    name: 'Pro',
    price: '$99',
    period: '/mes',
    description: 'Ideal para equipos de desarrollo y empresas medianas',
    features: [
      'Hasta 25 agentes inteligentes',
      '100GB almacenamiento',
      'Soporte prioritario 24/7',
      'Analytics avanzados',
      'CI/CD completo',
      'Backup automático',
      'Integraciones premium'
    ],
    popular: true
  },
  {
    name: 'Enterprise',
    price: '$299',
    period: '/mes',
    description: 'Para grandes organizaciones con necesidades complejas',
    features: [
      'Agentes ilimitados',
      'Almacenamiento ilimitado',
      'Soporte dedicado',
      'Analytics personalizados',
      'Infraestructura dedicada',
      'SLA garantizado',
      'Onboarding personalizado',
      'API personalizada'
    ],
    popular: false
  }
]

export default function PricingCards() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Planes y Precios
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Elige el plan que mejor se adapte a tus necesidades. Todos incluyen 
            actualizaciones gratuitas y soporte técnico
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ${
                plan.popular ? 'ring-2 ring-purple-600 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Más Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center mb-4">
                  <span className="text-5xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-gray-600 ml-1">
                    {plan.period}
                  </span>
                </div>
                <p className="text-gray-600">
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                Comenzar Ahora
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 