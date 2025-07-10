'use client'

export default function MergePage() {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center py-16 px-4">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4" tabIndex={0}>
        Gestión de Merges
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl text-center mb-8">
        Orquesta y resuelve merges de código, datos y configuraciones de forma segura y colaborativa.<br /><br />
        {/* TODO: Implementar historial de merges, resolución de conflictos y auditoría. */}
      </p>
    </section>
  )
} 