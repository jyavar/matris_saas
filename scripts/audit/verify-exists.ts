import * as fg from 'fast-glob'
import * as fs from 'fs/promises'
import * as path from 'path'

interface AuditFeature {
  id: string
  feature: string
  tipo: string
  area: string
  requerido: boolean
  tag: string
  critico: boolean
}

interface VerifiedFeature {
  id: string
  existe: boolean
  tipo_encontrado: string
  path: string | null
  detalles: string
  timestamp: string
}

const ROOT = process.cwd()
const SRC_DIRS = ['apps', 'backend', 'agent', 'scripts', 'packages']

function getSearchPatterns(tipo: string, feature: string): string[] {
  // Heurística: busca por nombre de archivo, módulo, función, hook, clase, script
  const tokens = feature.match(/[a-zA-Z0-9_/-]+/g) || []
  const patterns: string[] = []
  for (const t of tokens) {
    if (t.length < 3) continue
    if (tipo === 'frontend') patterns.push(`**/${t}*.tsx`, `**/${t}*.ts`)
    else if (tipo === 'backend') patterns.push(`**/${t}*.ts`)
    else if (tipo === 'test')
      patterns.push(`**/${t}*.test.ts`, `**/${t}*.spec.ts`)
    else patterns.push(`**/${t}*.*`)
  }
  return patterns.length ? patterns : ['**/*']
}

async function verifyFeature(f: AuditFeature): Promise<VerifiedFeature> {
  let existe = false
  let tipo_encontrado = ''
  let foundPath: string | null = null
  let detalles = ''
  for (const dir of SRC_DIRS) {
    const base = path.join(ROOT, dir)
    try {
      const patterns = getSearchPatterns(f.tipo, f.feature)
      const matches = await fg(patterns, {
        cwd: base,
        absolute: true,
        onlyFiles: true,
        suppressErrors: true,
      })
      if (matches.length) {
        existe = true
        foundPath = matches[0]
        tipo_encontrado = path.extname(foundPath).replace('.', '')
        detalles = `Encontrado: ${foundPath}`
        break
      }
    } catch {
      // Silenciar errores de búsqueda
    }
  }
  return {
    id: f.id,
    existe,
    tipo_encontrado,
    path: foundPath,
    detalles: detalles || 'No encontrado',
    timestamp: new Date().toISOString(),
  }
}

async function main() {
  const auditRaw = await fs.readFile('matrix.audit.json', 'utf-8')
  const audit: AuditFeature[] = JSON.parse(auditRaw)
  const results: VerifiedFeature[] = []
  for (const f of audit) {
    results.push(await verifyFeature(f))
  }
  await fs.writeFile('matrix.verified.json', JSON.stringify(results, null, 2))
  await fs.writeFile(
    'audit.verify-exists.auditable.json',
    JSON.stringify(
      { timestamp: new Date().toISOString(), count: results.length },
      null,
      2,
    ),
  )
  console.log(
    `✅ matrix.verified.json generado con ${results.length} features verificadas.`,
  )
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
