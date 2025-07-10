'use client'

export default function PrivacyPage() {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center py-16 px-4">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4" tabIndex={0}>
        Política de Privacidad
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl text-center mb-8">
        En STRATO Core OS™ la privacidad y protección de tus datos es una prioridad. Cumplimos con las normativas internacionales de protección de datos (GDPR, CCPA) y aplicamos medidas de seguridad avanzadas para resguardar tu información.<br /><br />
        Solo recopilamos los datos estrictamente necesarios para el funcionamiento de la plataforma y nunca compartimos información personal con terceros sin consentimiento explícito.<br /><br />
        Puedes ejercer tus derechos de acceso, rectificación o eliminación de datos en cualquier momento. <a href="/contact" className="text-blue-600 dark:text-blue-400 underline">Contáctanos para más información</a>.
      </p>
    </section>
  )
}
