import React from 'react'

const LandingPage: React.FC = () => (
  <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 p-4">
    <header className="w-full max-w-2xl text-center mb-12">
      <h1 className="text-4xl md:text-6xl font-bold text-blue-900 mb-4">
        Lanza tu SaaS en minutos
      </h1>
      <p className="text-lg md:text-2xl text-blue-700 mb-6">
        Onboarding, pagos y panel multi-tenant listos para escalar y cobrar
        desde el día 1.
      </p>
      <a
        href="/register"
        className="inline-block bg-blue-700 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-blue-800 transition"
      >
        Regístrate gratis
      </a>
    </header>
    <section className="w-full max-w-3xl bg-white rounded-xl shadow-md p-8 mb-8">
      <h2 className="text-2xl font-semibold text-blue-800 mb-4">
        ¿Por qué elegir nuestro SaaS?
      </h2>
      <ul className="list-disc list-inside text-blue-700 space-y-2">
        <li>Automatización total: onboarding, pagos, métricas y soporte.</li>
        <li>Multi-tenant real: cada cliente, su espacio y datos aislados.</li>
        <li>Panel de control intuitivo y seguro.</li>
        <li>Despliegue en la nube, dominio propio y compliance.</li>
        <li>Soporte y actualizaciones continuas.</li>
      </ul>
    </section>
    <section className="w-full max-w-3xl bg-blue-50 rounded-xl shadow-inner p-8 mb-8">
      <h2 className="text-xl font-semibold text-blue-800 mb-2">
        ¿Tienes dudas?
      </h2>
      <p className="text-blue-700 mb-2">
        Escríbenos a{' '}
        <a href="mailto:soporte@saas.com" className="underline">
          soporte@saas.com
        </a>{' '}
        o revisa nuestras{' '}
        <a href="#faq" className="underline">
          preguntas frecuentes
        </a>
        .
      </p>
    </section>
    <footer className="text-blue-600 mt-8">
      &copy; {new Date().getFullYear()} SaaS Launch Platform. Todos los derechos
      reservados.
    </footer>
  </main>
)

export default LandingPage
