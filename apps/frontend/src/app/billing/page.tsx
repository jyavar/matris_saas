'use client'

export default function BillingPage() {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center py-16 px-4">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4" tabIndex={0}>
        Facturación y Pagos
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl text-center mb-8">
        Administra tus métodos de pago, historial de facturación y suscripciones de STRATO Core OS™ desde un solo lugar.<br /><br />
        {/* TODO: Implementar gestión de facturación, integración con Stripe y visualización de recibos. */}
      </p>
    </section>
  )
} 