import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

export async function POST() {
  try {
    // Ejecutar scripts de auditoría
    execSync('pnpm exec tsx scripts/audit/verify-logic.ts', {
      stdio: 'inherit',
    })
    execSync('pnpm exec tsx scripts/audit/fuse-report.ts', { stdio: 'inherit' })
    // Copiar archivos JSON a /public
    const files = [
      'matrix.report.json',
      'matrix.audit.json',
      'matrix.verified.json',
      'matrix.coverage.json',
      'matrix.logic.json',
    ]
    const publicDir = path.resolve(process.cwd(), 'apps/web/public')
    for (const file of files) {
      fs.copyFileSync(
        path.resolve(process.cwd(), file),
        path.join(publicDir, file),
      )
    }
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error: unknown) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}
