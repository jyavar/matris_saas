import * as fs from 'fs'
import * as path from 'path'

const VERIFIED_PATH = path.resolve(process.cwd(), 'matrix.verified.json')
const COVERAGE_PATH = path.resolve(
  process.cwd(),
  'coverage/coverage-final.json',
)
const TEST_DIRS = ['apps/', 'packages/']

// Definir tipo VerifiedFeature
interface VerifiedFeature {
  id: string
  feature: string
  [key: string]: unknown
}

function findTestFile(feature: string): boolean {
  // Heurística simple: busca archivos que contengan parte del feature en el nombre y terminen en .test.ts
  const featureKey = feature
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .slice(0, 10) // solo los primeros 10 chars normalizados
  for (const dir of TEST_DIRS) {
    if (!fs.existsSync(dir)) continue
    const files = fs.readdirSync(dir, { recursive: true })
    for (const file of files) {
      if (
        typeof file === 'string' &&
        file.endsWith('.test.ts') &&
        file
          .toLowerCase()
          .replace(/[^a-z0-9]/g, '')
          .includes(featureKey)
      ) {
        return true
      }
    }
  }
  return false
}

function findCoverage(
  feature: string,
  coverageData: Record<string, { s: Record<string, number> }>,
): boolean {
  if (!coverageData) return false
  const featureKey = feature
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .slice(0, 10)
  for (const file in coverageData) {
    if (
      file
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '')
        .includes(featureKey)
    ) {
      // Considera cubierto si hay al menos 1 statement cubierto
      const s = coverageData[file].s || {}
      const covered = Object.values(s).some((v) => Number(v) > 0)
      if (covered) return true
    }
  }
  return false
}

function main() {
  const verified = JSON.parse(fs.readFileSync(VERIFIED_PATH, 'utf-8'))
  let coverageData = null
  if (fs.existsSync(COVERAGE_PATH)) {
    coverageData = JSON.parse(fs.readFileSync(COVERAGE_PATH, 'utf-8'))
  }

  const result = verified.map((item: VerifiedFeature) => {
    const con_test = findTestFile(item.feature)
    const con_coverage = findCoverage(item.feature, coverageData)
    return { ...item, con_test, con_coverage }
  })

  const outPath = path.resolve(process.cwd(), 'matrix.coverage.json')
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2))
  console.log(`✅ matrix.coverage.json generado en: ${outPath}`)
}

main()
