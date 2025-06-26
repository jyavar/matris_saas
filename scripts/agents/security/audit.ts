import { execSync } from 'child_process'
import { promises as fs } from 'fs'
import path from 'path'

export async function runAgent(): Promise<void> {
  const checks: Array<{
    name: string
    status: string
    desc: string
    output?: string
  }> = []
  const root = process.cwd()
  // 1. Headers de seguridad en Next.js
  const nextConfig = path.join(root, 'apps/frontend/next.config.js')
  let headersOk = false
  try {
    const content = await fs.readFile(nextConfig, 'utf8')
    headersOk =
      /headers\s*:\s*\[/.test(content) &&
      /Content-Security-Policy/.test(content)
    checks.push({
      name: 'Next.js security headers',
      status: headersOk ? 'OK' : 'FAIL',
      desc: 'Debe haber headers de seguridad en next.config.js',
    })
  } catch {
    checks.push({
      name: 'Next.js security headers',
      status: 'WARN',
      desc: 'No se encontró next.config.js',
    })
  }
  // 2. Uso de helmet o similar
  let helmetOk = false
  try {
    const backendEntry = path.join(
      root,
      'apps/backend/src/middleware/logger.middleware.ts',
    )
    const content = await fs.readFile(backendEntry, 'utf8')
    helmetOk = /helmet/.test(content)
    checks.push({
      name: 'Uso de helmet',
      status: helmetOk ? 'OK' : 'FAIL',
      desc: 'Debe usarse helmet en el backend',
    })
  } catch {
    checks.push({
      name: 'Uso de helmet',
      status: 'WARN',
      desc: 'No se encontró middleware de backend',
    })
  }
  // 3. Rate limiting
  let rateLimitOk = false
  try {
    const backendEntry = path.join(
      root,
      'apps/backend/src/middleware/logger.middleware.ts',
    )
    const content = await fs.readFile(backendEntry, 'utf8')
    rateLimitOk = /rateLimit|express-rate-limit/.test(content)
    checks.push({
      name: 'Rate limiting',
      status: rateLimitOk ? 'OK' : 'FAIL',
      desc: 'Debe haber rate limiting en el backend',
    })
  } catch {
    checks.push({
      name: 'Rate limiting',
      status: 'WARN',
      desc: 'No se encontró middleware de backend',
    })
  }
  // 4. Dependencias inseguras (npm audit)
  let auditOk = false
  let auditOutput = ''
  try {
    auditOutput = execSync('npm audit --json', { encoding: 'utf8' })
    const audit = JSON.parse(auditOutput)
    auditOk =
      audit.metadata &&
      audit.metadata.vulnerabilities &&
      Object.values(audit.metadata.vulnerabilities).every(
        (v: unknown) => v === 0,
      )
    checks.push({
      name: 'npm audit',
      status: auditOk ? 'OK' : 'FAIL',
      desc: 'Dependencias inseguras detectadas',
      output: auditOutput.slice(0, 500),
    })
  } catch (e: unknown) {
    checks.push({
      name: 'npm audit',
      status: 'WARN',
      desc: 'No se pudo ejecutar npm audit',
      output: e as string,
    })
  }
  const status = checks.some((c) => c.status === 'FAIL')
    ? 'FAIL'
    : checks.some((c) => c.status === 'WARN')
      ? 'WARN'
      : 'OK'
  const report = {
    status,
    checks,
    timestamp: new Date().toISOString(),
  }
  const reportPath = path.join(
    root,
    'audit-artifacts/reports/security-report.json',
  )
  await fs.writeFile(reportPath, JSON.stringify(report, null, 2))
  console.log(`@security: Reporte generado en ${reportPath}`)
}
