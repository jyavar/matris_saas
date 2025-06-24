import * as fs from 'fs'
import * as path from 'path'

const CHECKLIST_PATH = path.join(process.cwd(), '~12_CHECKLIST_MAESTRO.md')

// Define patrones para validar la presencia real de los ítems
const patterns: Record<string, (baseDir: string) => boolean> = {
  'router.ts central': (baseDir) =>
    fs.existsSync(path.join(baseDir, 'apps/backend/src/routes/router.ts')),
  'middleware de autenticación': (baseDir) =>
    fs.existsSync(
      path.join(baseDir, 'apps/backend/src/middleware/auth.middleware.ts'),
    ),
  'validación Zod': (baseDir) => {
    const controllersDir = path.join(baseDir, 'apps/backend/src/controllers')
    if (!fs.existsSync(controllersDir)) return false
    return fs.readdirSync(controllersDir).some((f) => {
      const content = fs.readFileSync(path.join(controllersDir, f), 'utf8')
      return content.includes('zod')
    })
  },
  'tests unitarios e integración': (baseDir) =>
    fs.existsSync(path.join(baseDir, 'apps/backend/src/tests')),
  'fixtures de datos dummy': (baseDir) =>
    fs.existsSync(path.join(baseDir, 'apps/backend/src/tests/fixtures.ts')),
  'logger estructurado': (baseDir) =>
    fs.existsSync(
      path.join(baseDir, 'apps/backend/src/services/logger.service.ts'),
    ),
  migraciones: (baseDir) =>
    fs.existsSync(path.join(baseDir, 'supabase/migrations')),
  workarounds: (baseDir) =>
    fs.existsSync(path.join(baseDir, '~11_LOCAL_WORKAROUNDS.md')),
  'checklist maestro': (baseDir) =>
    fs.existsSync(path.join(baseDir, '~12_CHECKLIST_MAESTRO.md')),
  dockerfile: (baseDir) => fs.existsSync(path.join(baseDir, 'Dockerfile')),
  'dependencias críticas': (baseDir) => {
    const pkg = JSON.parse(
      fs.readFileSync(path.join(baseDir, 'package.json'), 'utf8'),
    )
    return [
      'zod',
      'vitest',
      'supertest',
      '@supabase/supabase-js',
      'stripe',
      'resend',
      'openai',
      'dotenv',
    ].every(
      (dep) =>
        dep in (pkg.dependencies || {}) || dep in (pkg.devDependencies || {}),
    )
  },
  // Agrega más patrones según el checklist
}

function extractChecklistItems(md: string) {
  const lines = md.split('\n')
  const implemented: string[] = []
  const pending: string[] = []
  for (const line of lines) {
    if (line.trim().startsWith('- ✅'))
      implemented.push(line.replace('- ✅', '').trim())
    if (line.trim().startsWith('- ⬜️'))
      pending.push(line.replace('- ⬜️', '').trim())
  }
  return { implemented, pending }
}

function auditChecklist() {
  const baseDir = process.cwd()
  if (!fs.existsSync(CHECKLIST_PATH)) {
    console.error('No se encontró el checklist maestro:', CHECKLIST_PATH)
    process.exit(1)
  }
  const md = fs.readFileSync(CHECKLIST_PATH, 'utf8')
  const { implemented, pending } = extractChecklistItems(md)

  console.log('---\nAUDITORÍA CHECKLIST MAESTRO\n---')
  let falsePos = 0,
    falseNeg = 0

  for (const item of implemented) {
    const key = Object.keys(patterns).find((p) =>
      item.toLowerCase().includes(p),
    )
    if (key && !patterns[key](baseDir)) {
      console.log(
        `❌ FALSO POSITIVO: Marcado como implementado pero no encontrado: ${item}`,
      )
      falsePos++
    }
  }
  for (const item of pending) {
    const key = Object.keys(patterns).find((p) =>
      item.toLowerCase().includes(p),
    )
    if (key && patterns[key](baseDir)) {
      console.log(
        `⚠️  FALSO NEGATIVO: Marcado como pendiente pero ya implementado: ${item}`,
      )
      falseNeg++
    }
  }
  console.log('\nResumen:')
  console.log(`Falsos positivos: ${falsePos}`)
  console.log(`Falsos negativos: ${falseNeg}`)
  console.log('---')
}

auditChecklist()
