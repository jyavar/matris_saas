'use client'

export default function AboutPage() {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center py-16 px-4">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4" tabIndex={0}>
        Sobre STRATO Core OS™
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl text-center mb-8">
        STRATO Core OS™ es una plataforma SaaS enterprise diseñada para transformar la gestión de campañas, analytics y operaciones digitales en empresas modernas. Nuestra misión es empoderar a equipos con tecnología robusta, segura y escalable, permitiendo tomar decisiones basadas en datos y automatizar procesos críticos.<br /><br />
        <strong>Visión:</strong> Ser el estándar global en sistemas operativos SaaS para negocios digitales, impulsando innovación, eficiencia y crecimiento sostenible.<br /><br />
        <strong>Equipo:</strong> STRATO está conformado por expertos en ingeniería, producto y experiencia de usuario, comprometidos con la excelencia, la seguridad y la evolución constante de la plataforma. Creemos en la colaboración, la transparencia y el impacto positivo en nuestros clientes.
      </p>
    </section>
  )
}
