#!/usr/bin/env tsx
import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

const REPORTS_DIR = path.resolve('audit-artifacts/reports')
const DATE = new Date().toISOString().split('T')[0]
const JSON_PATH = path.join(REPORTS_DIR, `audit-report-${DATE}.json`)
const MD_PATH = path.join(REPORTS_DIR, `audit-report-${DATE}.md`)

const runCommand = (cmd: string) => {
  try {
    const output = execSync(cmd, { stdio: 'pipe' }).toString()
    return { success: true, output }
  } catch (error: unknown) {
    const err = error as { stdout?: { toString: () => string } }
    return { success: false, output: err.stdout?.toString() || '' }
  }
}

const audit = async () => {
  console.log('📦 Iniciando auditoría STRATO...')

  // 1. Typecheck
  const typecheck = runCommand('pnpm tsc --noEmit')
  const eslint = runCommand('pnpm lint')
  const tests = runCommand('pnpm test')

  // 2. Analizar archivos ~M_*.md
  const mdFiles = fs
    .readdirSync('.')
    .filter((f) => f.startsWith('~M_') && f.endsWith('.md'))
  const modules = mdFiles.map((file) => {
    const content = fs.readFileSync(file, 'utf-8')
    const lines = content.split('\n')
    const estado =
      lines.find((l) => l.toLowerCase().includes('estado técnico')) || 'No info'
    const deuda =
      lines.find((l) => l.toLowerCase().includes('deuda técnica')) || 'No info'
    const avance =
      lines.find((l) => l.toLowerCase().includes('avance')) || 'No info'
    return { file, estado, deuda, avance }
  })

  // 3. Conteo de "any", "console.log", etc.
  const grep = (pattern: string) => {
    try {
      return execSync(`grep -rn "${pattern}" src/ || true`)
        .toString()
        .trim()
        .split('\n')
        .filter(Boolean)
    } catch {
      return []
    }
  }

  const anys = grep('any')
  const consoles = grep('console.log')
  const todos = grep('TODO')

  // 4. Crear JSON
  const report = {
    date: DATE,
    typecheck: typecheck.success,
    eslint: eslint.success,
    tests: tests.success,
    modules,
    metrics: {
      anyCount: anys.length,
      consoleLogs: consoles.length,
      todos: todos.length,
    },
  }

  fs.mkdirSync(REPORTS_DIR, { recursive: true })
  fs.writeFileSync(JSON_PATH, JSON.stringify(report, null, 2))

  // 5. Crear .md legible
  const mdReport = `
# 🧾 Audit Report – ${DATE}

## 🔍 Typecheck
${typecheck.success ? '✅ OK' : '❌ Failed'}

## 🔍 ESLint
${eslint.success ? '✅ OK' : '❌ Issues detected'}

## 🔍 Tests
${tests.success ? '✅ Passed' : '❌ Some tests failed'}

## 📊 Modules
${modules.map((m) => `- ${m.file}: ${m.estado} | ${m.deuda} | ${m.avance}`).join('\n')}

## 🧠 Code Quality Issues
- \`any\`: ${anys.length} usos
- \`console.log\`: ${consoles.length}
- \`TODO\`: ${todos.length}
`

  fs.writeFileSync(MD_PATH, mdReport.trim())

  console.log('✅ Auditoría completada.')
  console.log(`📁 Reporte generado: ${JSON_PATH}`)
}

audit()
