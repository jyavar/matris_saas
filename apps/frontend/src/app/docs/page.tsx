'use client'

export default function DocsPage() {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center py-16 px-4">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4" tabIndex={0}>
        Documentación
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl text-center mb-8">
        Encuentra guías, referencias API y mejores prácticas para aprovechar al máximo STRATO Core OS™.<br /><br />
        {/* TODO: Implementar buscador, estructura de docs y ejemplos interactivos. */}
      </p>
    </section>
  )
} 