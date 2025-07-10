'use client'

export default function ContactPage() {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center py-16 px-4">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4" tabIndex={0}>
        Contacto
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl text-center mb-8">
        ¿Tienes preguntas, necesitas soporte o quieres una demo personalizada de STRATO Core OS™? Nuestro equipo está disponible para ayudarte.<br /><br />
        <strong>Email:</strong> <a href="mailto:soporte@stratocore.com" className="text-blue-600 dark:text-blue-400 underline">soporte@stratocore.com</a><br />
        <strong>Teléfono:</strong> +34 900 123 456<br /><br />
        También puedes completar el siguiente formulario y te responderemos en menos de 24 horas.
      </p>
      <form className="w-full max-w-md bg-white dark:bg-gray-900 rounded-lg shadow p-6 flex flex-col gap-4" aria-label="Formulario de contacto">
        <label htmlFor="name" className="text-gray-700 dark:text-gray-200 font-medium">Nombre</label>
        <input id="name" name="name" type="text" required className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <label htmlFor="email" className="text-gray-700 dark:text-gray-200 font-medium">Email</label>
        <input id="email" name="email" type="email" required className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <label htmlFor="message" className="text-gray-700 dark:text-gray-200 font-medium">Mensaje</label>
        <textarea id="message" name="message" rows={4} required className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button type="submit" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
          Enviar mensaje
        </button>
      </form>
    </section>
  )
}
