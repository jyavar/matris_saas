import { BarChart, DollarSign, Zap } from 'lucide-react'
import Link from 'next/link'

import { Button, Card } from '@/components/ui'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            Plataforma SaaS
            <span className="text-blue-600 dark:text-blue-400">
              {' '}
              Enterprise-Grade
            </span>
          </h2>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Gestión avanzada de campañas, analytics en tiempo real y
            herramientas de marketing automatizado.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link href="/login">
                <Button size="lg" className="w-full">
                  Comenzar ahora
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                  <BarChart className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                  Analytics Avanzados
                </h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-300">
                  Métricas en tiempo real y reportes detallados para optimizar
                  tus campañas.
                </p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white mx-auto">
                  <DollarSign className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                  Gestión de Campañas
                </h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-300">
                  Crea, gestiona y optimiza campañas de marketing de forma
                  eficiente.
                </p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white mx-auto">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                  Automatización
                </h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-300">
                  Flujos de trabajo automatizados para maximizar la eficiencia.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
