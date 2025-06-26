import crypto from 'crypto'
import fg from 'fast-glob'
import fs from 'fs'
import path from 'path'

export const agentMeta = {
  severity: '🔴 alta',
  estimatedSeconds: 10,
  supportsDryRun: true,
  coveredPaths: ['src/', 'apps/'],
  impact: ['deuda', 'refactor', 'CI'],
}

// Utilidades para hashing y escaneo
function hashContent(content: string) {
  return crypto.createHash('sha256').update(content).digest('hex')
}

export async function runAgent({ dryRun = true } = {}) {
  const root = process.cwd()
  const patterns = [
    '**/*.{ts,tsx,js,jsx}',
    '!node_modules/**',
    '!.next/**',
    '!.turbo/**',
    '!audit-artifacts/**',
    '!coverage/**',
    '!dist/**',
    '!build/**',
    '!test-results/**',
    '!playwright-report/**',
    '!logs/**',
    '!**/__tests__/**',
    '!**/*.test.*',
    '!**/*.spec.*',
  ]
  const files = await fg(patterns, { cwd: root, absolute: true })

  const nameMap = new Map<string, string[]>()
  const hashMap = new Map<string, string[]>()
  const findings: Array<{ file: string; error: string }> = []

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8')
    const base = path.basename(file)
    // Por nombre
    if (!nameMap.has(base)) nameMap.set(base, [])
    nameMap.get(base)!.push(file)
    // Por hash de contenido
    const hash = hashContent(content)
    if (!hashMap.has(hash)) hashMap.set(hash, [])
    hashMap.get(hash)!.push(file)
  }

  // Duplicados por nombre
  for (const [name, filesArr] of nameMap.entries()) {
    if (filesArr.length > 1) {
      findings.push({
        file: name,
        error: 'Renombrar o consolidar archivos duplicados.',
      })
    }
  }
  // Duplicados por contenido
  for (const [hash, filesArr] of hashMap.entries()) {
    if (filesArr.length > 1) {
      findings.push({
        file: hash,
        error: 'Eliminar duplicados o extraer a un módulo compartido.',
      })
    }
  }

  const report = {
    ...agentMeta,
    timestamp: new Date().toISOString(),
    status: findings.length === 0 ? 'OK' : 'DUPLICATES_FOUND',
    findings,
    totalFiles: files.length,
    dryRun,
  }
  const reportPath = 'audit-artifacts/reports/refactor-report.json'
  if (!dryRun) {
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))
  }
  // Validar logging
  let validLog = false
  try {
    if (fs.existsSync(reportPath)) {
      const content = fs.readFileSync(reportPath, 'utf8')
      JSON.parse(content)
      validLog = true
    }
  } catch {
    // Ignorar error de validación de logging
  }
  if (!dryRun) {
    if (validLog) {
      console.log(`@refactor: Log JSON válido generado en ${reportPath}`)
    } else {
      console.log(`@refactor: Error en logging JSON`)
    }
  } else {
    console.log(
      `@refactor: (dry-run) Reporte simulado, no se escribió archivo.`,
    )
  }
}

if (import.meta.url === `file://${process.argv[1]}`) runAgent({ dryRun: false })
