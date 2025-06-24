import { execSync } from 'child_process'
import * as fs from 'fs'
import * as path from 'path'

const AUDIT_PATH = path.resolve(process.cwd(), 'matrix.audit.json')
const SRC_PATH = path.resolve(process.cwd(), './')

interface AuditItem {
  file: string
  section: string
  statusDeclared: '✅' | '⬜️'
  feature: string
}

const fileExists = (filepath: string) => fs.existsSync(filepath)

const verifyImplementation = (item: AuditItem): string => {
  const desc = item.feature.toLowerCase()

  // Reglas heurísticas simples por ahora (se puede expandir)
  if (desc.includes('tsconfig')) {
    return fileExists(path.join(SRC_PATH, 'tsconfig.json'))
      ? 'implementado'
      : 'pendiente'
  }

  if (desc.includes('eslint')) {
    return fileExists(path.join(SRC_PATH, '.eslintrc.js')) ||
      fileExists(path.join(SRC_PATH, '.eslintrc.cjs'))
      ? 'implementado'
      : 'pendiente'
  }

  if (desc.includes('vitest')) {
    return fileExists(path.join(SRC_PATH, 'vitest.config.ts'))
      ? 'implementado'
      : 'pendiente'
  }

  if (desc.includes('tailwind')) {
    return fileExists(path.join(SRC_PATH, 'tailwind.config.ts'))
      ? 'implementado'
      : 'pendiente'
  }

  if (desc.includes('routes') || desc.includes('router')) {
    return fs.existsSync(path.join(SRC_PATH, 'backend/routes'))
      ? 'implementado'
      : 'pendiente'
  }

  if (desc.includes('middleware')) {
    return fs.existsSync(path.join(SRC_PATH, 'backend/middleware'))
      ? 'implementado'
      : 'pendiente'
  }

  if (desc.includes('zod')) {
    const files = execSync(
      `grep -r --include=*.ts --include=*.js "zod" apps/ packages/`,
    ).toString()
    return files.includes('zod') ? 'implementado' : 'pendiente'
  }

  return 'no-verificado'
}

const runVerification = () => {
  const auditData: AuditItem[] = JSON.parse(
    fs.readFileSync(AUDIT_PATH, 'utf-8'),
  )
  const result = auditData.map((item) => {
    const verificado = verifyImplementation(item)
    return { ...item, verificado }
  })

  const outPath = path.resolve(process.cwd(), 'matrix.verified.json')
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2))
  console.log(`✔ Verificación completa. Resultado en: ${outPath}`)
}

runVerification()
