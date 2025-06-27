#!/usr/bin/env ts-node
import { execSync } from 'child_process'
import * as fs from 'fs-extra'
import * as path from 'path'
import * as tar from 'tar'

const SNAPSHOT_PATH = path.resolve('audit-artifacts', 'repo-snapshot.tar.gz')

function log(msg: string, data?: unknown) {
  const entry = { ts: new Date().toISOString(), msg, ...(data ? { data } : {}) }
  console.log(JSON.stringify(entry))
}

function run(cmd: string) {
  try {
    execSync(cmd, { stdio: 'inherit' })
    return { ok: true }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) }
  }
}

async function validate() {
  log('Validando lint, typecheck, test...')
  const lint = run('pnpm lint')
  const typecheck = run('pnpm typecheck')
  const test = run('pnpm test')
  log('Generando reporte de checklist...')
  run('pnpm exec tsx scripts/audit-checklist.ts')
  log('Validación completa', { lint, typecheck, test })
  if (!lint.ok || !typecheck.ok || !test.ok) process.exit(1)
}

async function snapshot() {
  log('Creando snapshot del repo...')
  await fs.ensureDir(path.dirname(SNAPSHOT_PATH))
  await tar.c(
    {
      gzip: true,
      file: SNAPSHOT_PATH,
      cwd: '.',
      filter: (p) =>
        !/node_modules|\.git|dist|build|\.next|\.turbo|\.DS_Store|coverage|cache|logs/.test(
          p,
        ),
    },
    ['.'],
  )
  log('Snapshot creado', { SNAPSHOT_PATH })
}

async function rollback() {
  if (!fs.existsSync(SNAPSHOT_PATH)) {
    log('No existe snapshot para restaurar')
    process.exit(1)
  }
  log('Restaurando snapshot...')
  await tar.x({ file: SNAPSHOT_PATH, cwd: '.' })
  log('Snapshot restaurado')
}

async function e2e() {
  log('Ejecutando tests E2E...')
  run('pnpm --filter web test:e2e')
}

async function a11y() {
  log('Validando accesibilidad (a11y)...')
  // Aquí se puede integrar axe, pa11y o playwright-accessibility
  run('echo "TODO: integrar validación a11y real"')
}

async function coverage() {
  log('Generando reporte de coverage global...')
  run('pnpm --filter backend test -- --coverage')
  run('pnpm --filter frontend test -- --coverage')
}

async function blindaje() {
  log('Ejecutando blindaje técnico...')
  run('pnpm ts-node scripts/check-blindaje-real.ts')
}

async function syncDocs() {
  log('Sincronizando docs y checklists...')
  run('pnpm ts-node scripts/sync-modules-index.ts')
}

async function main() {
  const cmd = process.argv[2]
  switch (cmd) {
    case 'validate':
      await validate()
      break
    case 'snapshot':
      await snapshot()
      break
    case 'rollback':
      await rollback()
      break
    case 'e2e':
      await e2e()
      break
    case 'a11y':
      await a11y()
      break
    case 'coverage':
      await coverage()
      break
    case 'blindaje':
      await blindaje()
      break
    case 'sync-docs':
      await syncDocs()
      break
    default:
      console.log(
        'Uso: pnpm ts-node scripts/taskmaster.prd.ts <validate|snapshot|rollback|e2e|a11y|coverage|blindaje|sync-docs>',
      )
      process.exit(1)
  }
}

main()
