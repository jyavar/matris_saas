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

interface CoverageFeature {
  id: string
  con_test: boolean
  con_coverage: boolean
  coverage_pct: number
  archivos_test: string[]
  timestamp: string
}

const ROOT = process.cwd()
const COVERAGE_PATH = path.join(ROOT, 'coverage', 'coverage-final.json')

function findTestFiles(): string[] {
  // Heurística: busca archivos de test que mencionen el nombre del feature
  // (esto puede mejorarse con AST o mapping real)
  const testFiles: string[] = []
  // No implementado: se puede usar fast-glob para buscar archivos test
  return testFiles
}

async function main() {
  const auditRaw = await fs.readFile('matrix.audit.json', 'utf-8')
  const audit: AuditFeature[] = JSON.parse(auditRaw)
  let coverageData: Record<string, { s: Record<string, number> }> = {}
  try {
    coverageData = JSON.parse(await fs.readFile(COVERAGE_PATH, 'utf-8'))
  } catch {
    console.warn(
      'No se encontró coverage/coverage-final.json. Todos los features tendrán con_coverage: false',
    )
  }
  const results: CoverageFeature[] = []
  for (const f of audit) {
    // Buscar archivos de test asociados (stub, se puede mejorar)
    const archivos_test: string[] = findTestFiles()
    // Buscar cobertura real
    let con_coverage = false
    let coverage_pct = 0
    for (const file in coverageData) {
      if (f.feature && file.toLowerCase().includes(f.area.toLowerCase())) {
        const pct = coverageData[file]?.s
          ? (Object.values(coverageData[file].s).filter((v: number) => v > 0)
              .length /
              Object.values(coverageData[file].s).length) *
            100
          : 0
        if (pct > 0) {
          con_coverage = true
          coverage_pct = Math.max(coverage_pct, pct)
        }
      }
    }
    // Heurística: si el tipo es test o coverage, asumimos que debe tener test
    const con_test =
      f.tipo === 'test' || archivos_test.length > 0 || con_coverage
    results.push({
      id: f.id,
      con_test,
      con_coverage,
      coverage_pct: Math.round(coverage_pct),
      archivos_test,
      timestamp: new Date().toISOString(),
    })
  }
  await fs.writeFile('matrix.coverage.json', JSON.stringify(results, null, 2))
  await fs.writeFile(
    'audit.verify-coverage.auditable.json',
    JSON.stringify(
      { timestamp: new Date().toISOString(), count: results.length },
      null,
      2,
    ),
  )
  console.log(
    `✅ matrix.coverage.json generado con ${results.length} features evaluadas.`,
  )
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
