'use client'

export default function CampaignsPage() {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center py-16 px-4">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4" tabIndex={0}>
        Gestión de Campañas
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl text-center mb-8">
        Crea, edita y analiza campañas de marketing multicanal con herramientas avanzadas de automatización y segmentación.<br /><br />
        {/* TODO: Implementar CRUD de campañas, integración con canales y analítica de resultados. */}
      </p>
    </section>
  )
} 