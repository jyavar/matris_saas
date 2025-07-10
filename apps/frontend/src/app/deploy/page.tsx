'use client'

export default function DeployPage() {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center py-16 px-4">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4" tabIndex={0}>
        Despliegue y Entornos
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl text-center mb-8">
        Gestiona entornos, despliegues y versiones de tus aplicaciones SaaS de forma segura y automatizada.<br /><br />
        {/* TODO: Implementar gestión de entornos, historial de despliegues y rollback. */}
      </p>
    </section>
  )
} 