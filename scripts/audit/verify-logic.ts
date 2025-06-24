// @ts-expect-error: fast-glob no tiene tipos ESM compatibles
import fg from 'fast-glob'
import * as fs from 'fs/promises'

interface AuditFeature {
  id: string
  nombre: string
  feature?: string
  tipo?: string
  area?: string
  requerido?: boolean
  tag?: string
  critico?: boolean
  hint?: string
}

interface LogicOverride {
  detalle?: string
}

interface LogicResult {
  id: string
  nombre: string
  logica_verificada: boolean
  fuente_verificacion: 'override' | 'hint' | 'regex'
  detalle: string
}

const AUDIT_PATH = 'matrix.audit.json'
const OVERRIDES_PATH = 'logic.overrides.json'
const OUTPUT_PATH = 'matrix.logic.json'
const SRC_DIRS = ['frontend', 'backend', 'agent', 'packages', 'scripts']

async function loadJson<T>(filepath: string): Promise<T | undefined> {
  try {
    const raw = await fs.readFile(filepath, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return undefined
  }
}

async function findMatchInFiles(
  patterns: string[],
): Promise<{ found: boolean; match: string }> {
  const files = await fg(
    SRC_DIRS.map((d) => `${d}/**/*.{ts,tsx}`),
    { ignore: ['**/node_modules/**', '**/.next/**'], onlyFiles: true },
  )
  for (const file of files) {
    const content = await fs.readFile(file, 'utf-8')
    for (const pattern of patterns) {
      const regex = new RegExp(pattern, 'i')
      if (regex.test(content)) {
        return { found: true, match: `${pattern} in ${file}` }
      }
    }
  }
  return { found: false, match: '' }
}

async function main() {
  const audit: AuditFeature[] =
    (await loadJson<AuditFeature[]>(AUDIT_PATH)) || []
  const overrides: Record<string, LogicOverride> =
    (await loadJson<Record<string, LogicOverride>>(OVERRIDES_PATH)) || {}
  const logicReport: LogicResult[] = []
  for (const feature of audit) {
    const id = feature.id || feature.nombre || 'feature_sin_id'
    const nombre = feature.nombre || feature.feature || id
    // 1. Check override
    if (overrides[id]) {
      logicReport.push({
        id,
        nombre,
        logica_verificada: true,
        fuente_verificacion: 'override',
        detalle: overrides[id].detalle || 'Verificado por override manual',
      })
      continue
    }
    // 2. Check hint
    const hint = feature.hint
      ? feature.hint
          .split('|')
          .map((h) => h.trim())
          .filter(Boolean)
      : []
    if (hint.length > 0) {
      const res = await findMatchInFiles(hint)
      logicReport.push({
        id,
        nombre,
        logica_verificada: res.found,
        fuente_verificacion: 'hint',
        detalle: res.found ? res.match : 'No se encontró lógica con hint',
      })
      continue
    }
    // 3. Fallback: regex por tokens
    const tokens = nombre
      .split(/\s+/)
      .filter((w) => w.length > 3)
      .map((t) => t.replace(/[^\w]/g, ''))
    const res = await findMatchInFiles(tokens)
    logicReport.push({
      id,
      nombre,
      logica_verificada: res.found,
      fuente_verificacion: 'regex',
      detalle: res.found ? res.match : 'No se encontró lógica relevante',
    })
  }
  await fs.writeFile(OUTPUT_PATH, JSON.stringify(logicReport, null, 2))
  console.log(
    `✅ Archivo ${OUTPUT_PATH} generado con ${logicReport.length} features auditadas`,
  )
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
