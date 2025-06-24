import * as fs from 'fs/promises'

const files = [
  'matrix.audit.json',
  'matrix.verified.json',
  'matrix.coverage.json',
  'matrix.logic.json',
]

async function loadJson(path: string) {
  return JSON.parse(await fs.readFile(path, 'utf-8'))
}

// Eliminar type Feature
// Usar any[] en los parámetros de mergeFeatures y byId

function mergeFeatures(
  audit: Record<string, unknown>[],
  verified: Record<string, unknown>[],
  coverage: Record<string, unknown>[],
  logic: Record<string, unknown>[],
) {
  const byId = (arr: Record<string, unknown>[]) =>
    Object.fromEntries(arr.map((f) => [f.id as string, f]))
  const v = byId(verified)
  const c = byId(coverage)
  const l = byId(logic)
  return audit.map((f) => {
    const id = f.id as string
    const merged = {
      ...f,
      ...v[id],
      ...c[id],
      ...l[id],
    }
    // Estado final: ✅ si todo verificado, ⬜️ si falta algo
    merged.estado_final =
      merged.verificado !== false &&
      merged.con_test !== false &&
      merged.con_coverage !== false &&
      merged.logica_verificada !== false
        ? '✅'
        : '⬜️'
    return merged
  })
}

async function main() {
  const [audit, verified, coverage, logic] = await Promise.all(
    files.map(loadJson),
  )
  const report = mergeFeatures(audit, verified, coverage, logic)
  await fs.writeFile('matrix.report.json', JSON.stringify(report, null, 2))
  console.log(`✅ matrix.report.json generado con ${report.length} features.`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
