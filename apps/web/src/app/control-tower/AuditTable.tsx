'use client'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

interface Feature {
  id: string
  feature: string
  nombre?: string
  estado_final: string
  logica_verificada?: boolean
  fuente_verificacion?: string
  con_test?: boolean
  con_coverage?: boolean
  verificado?: boolean
  coverage_pct?: number
  detalle?: string
}

function score(f: Feature) {
  let s = 0
  if (f.verificado) s++
  if (f.con_test) s++
  if (f.con_coverage) s++
  if (f.logica_verificada) s++
  return s
}

const fuenteLabel: Record<string, string> = {
  override: 'Override',
  hint: 'Hint',
  regex: 'Heurística',
  undefined: '-',
}

export default function AuditTable() {
  const [features, setFeatures] = useState<Feature[]>([])
  const [filter, setFilter] = useState('')
  const [showOnlyPending, setShowOnlyPending] = useState(false)

  useEffect(() => {
    fetch('/matrix.report.json')
      .then((r) => r.json())
      .then(setFeatures)
  }, [])

  const filtered = features.filter((f) => {
    const text = `${f.feature} ${f.nombre} ${f.id}`.toLowerCase()
    if (showOnlyPending && f.estado_final === '✅') return false
    return text.includes(filter.toLowerCase())
  })

  return (
    <div className="w-full p-4 bg-white dark:bg-zinc-900 rounded-xl shadow overflow-x-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
        <input
          className="border rounded px-2 py-1 w-full md:w-64 dark:bg-zinc-800 dark:text-zinc-100"
          placeholder="Buscar feature..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={showOnlyPending}
            onChange={(e) => setShowOnlyPending(e.target.checked)}
          />
          Solo pendientes
        </label>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          Total: {filtered.length} / {features.length}
        </span>
      </div>
      <table className="min-w-full text-xs md:text-sm">
        <thead>
          <tr className="bg-zinc-100 dark:bg-zinc-800">
            <th className="p-2 text-left">Feature</th>
            <th className="p-2">Estado</th>
            <th className="p-2">Score</th>
            <th className="p-2">Fuente</th>
            <th className="p-2">Detalle</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((f) => (
            <tr
              key={f.id}
              className={clsx(
                'border-b last:border-none',
                f.estado_final === '✅'
                  ? 'bg-green-50 dark:bg-green-900/20'
                  : 'bg-red-50 dark:bg-red-900/10',
              )}
            >
              <td
                className="p-2 max-w-xs truncate"
                title={f.feature || f.nombre}
              >
                {f.feature || f.nombre}
              </td>
              <td className="p-2 text-center">
                <span
                  className={clsx(
                    'inline-block w-6 h-6 rounded-full font-bold',
                    f.estado_final === '✅'
                      ? 'bg-green-500 text-white'
                      : 'bg-red-400 text-white',
                  )}
                >
                  {f.estado_final}
                </span>
              </td>
              <td className="p-2 text-center font-mono">{score(f)}/4</td>
              <td className="p-2 text-center">
                {fuenteLabel[f.fuente_verificacion ?? 'undefined']}
              </td>
              <td className="p-2 max-w-xs truncate" title={f.detalle}>
                {f.detalle}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filtered.length === 0 && (
        <div className="text-center text-zinc-400 py-8">
          No hay features para mostrar.
        </div>
      )}
    </div>
  )
}
