'use client'

export default function PricingPage() {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center py-16 px-4">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4" tabIndex={0}>
        Precios y Planes
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl text-center mb-8">
        Elige el plan que mejor se adapte a las necesidades de tu empresa. Todos los planes incluyen seguridad avanzada, soporte dedicado y acceso a las últimas innovaciones de STRATO Core OS™.<br /><br />
        <strong>Starter:</strong> Ideal para equipos pequeños que inician su transformación digital.<br />
        <strong>Business:</strong> Funcionalidades avanzadas, analytics y automatización para empresas en crecimiento.<br />
        <strong>Enterprise:</strong> Soluciones personalizadas, SLA premium y soporte 24/7 para organizaciones de alto volumen.<br /><br />
        ¿Listo para escalar tu negocio? <a href="/contact" className="text-blue-600 dark:text-blue-400 underline">Contáctanos para una demo personalizada</a>.
      </p>
    </section>
  )
}
