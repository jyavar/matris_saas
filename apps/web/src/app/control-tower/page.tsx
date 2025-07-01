'use client'

import { useEffect, useState } from 'react'

// @ts-expect-error - Module resolution issue
import AuditTable from './AuditTable'

// Definir el tipo Feature para tipado estricto
export interface Feature {
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
  score?: number
  max_score?: number
  section?: string
}

const files = [
  'matrix.report.json',
  'matrix.audit.json',
  'matrix.verified.json',
  'matrix.coverage.json',
  'matrix.logic.json',
]

async function fetchJson(file: string) {
  // Intenta cargar desde /public
  const res = await fetch(`/${file}`)
  if (!res.ok) throw new Error(`No se pudo cargar ${file}`)
  return res.json()
}

export default function ControlTowerPage() {
  const [data, setData] = useState<Record<string, unknown>>({})
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function loadAll() {
    try {
      setLoading(true)
      const loaded: Record<string, unknown> = {}
      for (const file of files) {
        loaded[file] = await fetchJson(file)
      }
      setData(loaded)
      setError(null)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAll()
  }, [])

  if (error) return <div className="text-red-600">Error: {error}</div>
  if (loading || !data['matrix.report.json'])
    return <div>Cargando dashboard STRATO CONTROL TOWER™...</div>

  // Score técnico acumulado
  const report = data['matrix.report.json'] as Feature[]

  // Semáforos por módulo (section)
  const bySection: Record<string, Feature[]> = {}
  for (const r of report) {
    if (!bySection[r.section]) bySection[r.section] = []
    bySection[r.section].push(r)
  }

  return (
    <main className="min-h-screen w-full bg-zinc-50 dark:bg-zinc-950 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-zinc-800 dark:text-zinc-100">
          STRATO CONTROL TOWER™ – Auditoría Técnica
        </h1>
        <AuditTable />
      </div>
    </main>
  )
}
