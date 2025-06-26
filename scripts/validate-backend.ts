#!/usr/bin/env ts-node
import { execSync } from 'child_process'

function run(cmd: string) {
  try {
    execSync(cmd, { stdio: 'inherit' })
    return { ok: true }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) }
  }
}

function main() {
  const lint = run('pnpm run lint')
  const typecheck = run('pnpm run typecheck')
  const test = run('pnpm run test --filter backend')
  const summary = {
    lint,
    typecheck,
    test,
    status: lint.ok && typecheck.ok && test.ok ? 'OK' : 'FAIL',
  }
  console.log(JSON.stringify(summary, null, 2))
  process.exit(summary.status === 'OK' ? 0 : 1)
}

main()
