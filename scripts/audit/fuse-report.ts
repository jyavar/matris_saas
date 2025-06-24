import * as fs from 'fs'
import * as path from 'path'

interface FeatureObj {
  feature?: string
  verificado?: string
  con_test?: boolean
  con_coverage?: boolean
  logica_verificada?: boolean
  section?: string
  file?: string
  statusDeclared?: string
}

function loadById(file: string) {
  const arr = JSON.parse(
    fs.readFileSync(path.resolve(process.cwd(), file), 'utf-8'),
  )
  const map: Record<string, unknown> = {}
  for (const item of arr) {
    map[item.id] = item
  }
  return map
}

function main() {
  const audit = loadById('matrix.audit.json') as Record<string, unknown>
  const verified = loadById('matrix.verified.json') as Record<string, unknown>
  const coverage = loadById('matrix.coverage.json') as Record<string, unknown>
  const logic = loadById('matrix.logic.json') as Record<string, unknown>

  const allIds = Array.from(
    new Set([
      ...Object.keys(audit),
      ...Object.keys(verified),
      ...Object.keys(coverage),
      ...Object.keys(logic),
    ]),
  )

  const report = allIds.map((id) => {
    const a = audit[id] || {}
    const v = verified[id] || {}
    const c = coverage[id] || {}
    const l = logic[id] || {}
    const existe =
      (v as FeatureObj).verificado === 'implementado' ||
      (v as FeatureObj).verificado === 'pendiente' ||
      (v as FeatureObj).verificado === 'no-verificado'
    const tiene_test = !!(c as FeatureObj).con_test
    const tiene_coverage = !!(c as FeatureObj).con_coverage
    const logica_verificada = !!(l as FeatureObj).logica_verificada
    const score = [
      existe,
      tiene_test,
      tiene_coverage,
      logica_verificada,
    ].filter(Boolean).length
    return {
      id,
      feature:
        (a as FeatureObj).feature ||
        (v as FeatureObj).feature ||
        (c as FeatureObj).feature ||
        (l as FeatureObj).feature,
      existe,
      tiene_test,
      tiene_coverage,
      logica_verificada,
      score,
      max_score: 4,
      section:
        (a as FeatureObj).section ||
        (v as FeatureObj).section ||
        (c as FeatureObj).section ||
        (l as FeatureObj).section,
      file:
        (a as FeatureObj).file ||
        (v as FeatureObj).file ||
        (c as FeatureObj).file ||
        (l as FeatureObj).file,
      statusDeclared:
        (a as FeatureObj).statusDeclared ||
        (v as FeatureObj).statusDeclared ||
        (c as FeatureObj).statusDeclared ||
        (l as FeatureObj).statusDeclared,
    }
  })

  const outPath = path.resolve(process.cwd(), 'matrix.report.json')
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2))
  console.log(`✅ matrix.report.json generado en: ${outPath}`)
}

main()
