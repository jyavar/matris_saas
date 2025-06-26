import fg from 'fast-glob'
import { promises as fs } from 'fs'
import path from 'path'

export async function runAgent(): Promise<void> {
  const checks: Array<{ name: string; status: string; desc: string }> = []
  const root = process.cwd()
  // 1. Accesibilidad básica (aria-*)
  const uiFiles = await fg(['apps/frontend/src/components/ui/**/*.tsx'], {
    cwd: root,
    absolute: true,
  })
  let ariaOk = true
  for (const file of uiFiles) {
    const content = await fs.readFile(file, 'utf8')
    if (!/aria-/.test(content)) ariaOk = false
  }
  checks.push({
    name: 'Accesibilidad aria-*',
    status: ariaOk ? 'OK' : 'WARN',
    desc: 'Debe haber atributos aria-* en componentes UI',
  })
  // 2. Consistencia de componentes (estructura y nombrado)
  let consistent = true
  for (const file of uiFiles) {
    if (
      !/export function [A-Z][A-Za-z0-9]+/.test(await fs.readFile(file, 'utf8'))
    )
      consistent = false
  }
  checks.push({
    name: 'Consistencia de componentes',
    status: consistent ? 'OK' : 'WARN',
    desc: 'Componentes deben exportar funciones con PascalCase',
  })
  // 3. Uso de clsx o cn
  let usesClsx = false
  for (const file of uiFiles) {
    const content = await fs.readFile(file, 'utf8')
    if (/clsx|cn\(/.test(content)) usesClsx = true
  }
  checks.push({
    name: 'Uso de clsx/cn',
    status: usesClsx ? 'OK' : 'FAIL',
    desc: 'Debe usarse clsx o cn() en componentes UI',
  })
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
  const reportPath = path.join(root, 'audit-artifacts/reports/ui-report.json')
  await fs.writeFile(reportPath, JSON.stringify(report, null, 2))
  console.log(`@ui: Reporte generado en ${reportPath}`)
}
