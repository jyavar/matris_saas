'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  Shield, 
  Zap, 
  Code, 
  BarChart3, 
  Rocket 
} from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'Agentes Inteligentes',
    description: 'Sistema de agentes autónomos para automatización de tareas complejas y toma de decisiones inteligentes.'
  },
  {
    icon: Shield,
    title: 'Seguridad Enterprise',
    description: 'Arquitectura de seguridad por defecto con autenticación JWT, rate limiting y auditoría completa.'
  },
  {
    icon: Zap,
    title: 'Performance Optimizada',
    description: 'Optimización automática de rendimiento con caching inteligente y lazy loading de componentes.'
  },
  {
    icon: Code,
    title: 'UI Components',
    description: 'Biblioteca completa de componentes reutilizables con TypeScript y Tailwind CSS.'
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reporting',
    description: 'Sistema de analytics en tiempo real con dashboards personalizables y reportes automáticos.'
  },
  {
    icon: Rocket,
    title: 'DevOps Ready',
    description: 'Configuración CI/CD integrada con testing automatizado y deployment continuo.'
  }
]

export default function FeaturesSection() {
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
            Características Principales
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            STRATO Core OS™ combina las mejores tecnologías modernas para crear 
            aplicaciones SaaS escalables y mantenibles
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-200"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 