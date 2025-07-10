'use client'

export default function AnalyticsPage() {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center py-16 px-4">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4" tabIndex={0}>
        Analytics y Reportes
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl text-center mb-8">
        Visualiza métricas clave, reportes personalizados y tendencias de uso para optimizar tus campañas y operaciones.<br /><br />
        {/* TODO: Implementar dashboards, filtros avanzados y exportación de reportes. */}
      </p>
    </section>
  )
} 