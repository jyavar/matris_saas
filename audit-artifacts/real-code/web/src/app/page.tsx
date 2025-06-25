import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-green-400">
      <div className="bg-white/90 rounded-2xl shadow-2xl p-10 flex flex-col items-center max-w-md w-full">
        <div className="flex items-center gap-3 mb-6">
          <span className="bg-gradient-to-r from-blue-400 to-green-400 w-12 h-12 rounded flex items-center justify-center font-bold text-2xl text-white shadow-lg">
            S
          </span>
          <span className="font-bold text-3xl tracking-tight text-gray-800">
            STRATO
          </span>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Bienvenido a STRATO Core OS™
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          Plataforma de auditoría técnica, control y automatización de calidad
          para tu monorepo.
        </p>
        <Link href="/control-tower" className="w-full">
          <button className="w-full py-3 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-lg shadow transition">
            Ir al Dashboard
          </button>
        </Link>
      </div>
    </div>
  )
}
