import React from 'react'
import dynamic from 'next/dynamic'

// Importar componentes clave (a crear en pasos siguientes)
const DashboardML = dynamic(() => import('@/components/ml/DashboardML'))
const ModelList = dynamic(() => import('@/components/ml/ModelList'))
const DatasetList = dynamic(() => import('@/components/ml/DatasetList'))
const TrainingJobList = dynamic(() => import('@/components/ml/TrainingJobList'))
const PredictionForm = dynamic(() => import('@/components/ml/PredictionForm'))
const MetricsPanel = dynamic(() => import('@/components/ml/MetricsPanel'))
const ConnectionStatus = dynamic(() => import('@/components/ml/ConnectionStatus'))

export default function MLPage() {
  return (
    <section
      className="min-h-screen w-full max-w-7xl mx-auto px-4 py-8 flex flex-col gap-8"
      aria-label="Machine Learning Module"
    >
      {/* Título y descripción accesible */}
      <header className="mb-4">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100" tabIndex={0}>
          Machine Learning
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300" tabIndex={0}>
          Enterprise-grade ML management, training, inference and monitoring. All in one place.
        </p>
      </header>

      {/* Estado de conexión y salud */}
      <ConnectionStatus /> {/* TODO: Implementar componente */}

      {/* Panel de métricas y dashboard */}
      <MetricsPanel /> {/* TODO: Implementar componente */}
      <DashboardML /> {/* TODO: Implementar componente */}

      {/* Listados y formularios */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ModelList /> {/* TODO: Implementar componente */}
        <DatasetList /> {/* TODO: Implementar componente */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <TrainingJobList /> {/* TODO: Implementar componente */}
        <PredictionForm /> {/* TODO: Implementar componente */}
      </div>
    </section>
  )
} 