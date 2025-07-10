'use client'

export default function TermsPage() {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center py-16 px-4">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4" tabIndex={0}>
        Términos y Condiciones
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl text-center mb-8">
        Al utilizar STRATO Core OS™, aceptas nuestros términos y condiciones de uso. Nos comprometemos a ofrecer un servicio seguro, confiable y conforme a la legislación vigente. El usuario es responsable de la veracidad de los datos proporcionados y del uso adecuado de la plataforma.<br /><br />
        Para más detalles sobre licencias, limitaciones de responsabilidad y derechos de uso, consulta el documento completo o contáctanos para aclaraciones legales.<br /><br />
        <a href="/contact" className="text-blue-600 dark:text-blue-400 underline">Solicitar información legal</a>
      </p>
    </section>
  )
}
