#!/usr/bin/env ts-node
import * as fs from 'fs'
import * as path from 'path'
import * as readline from 'readline'

const ROOT = process.cwd()
const CHECKLIST_PATH = path.join(ROOT, '~12_CHECKLIST_MAESTRO.md')
const REPORT_PATH = path.join(
  ROOT,
  'audit-artifacts/reports/checklist-audit.json',
)

// Utilidad para buscar archivos recursivamente, ignorando carpetas temporales
function walk(dir: string, filelist: string[] = []): string[] {
  const IGNORE_DIRS = [
    'node_modules',
    '.git',
    '.turbo',
    '.next',
    '.DS_Store',
    'coverage',
    'cache',
    'logs',
  ]
  if (!fs.existsSync(dir)) return filelist
  fs.readdirSync(dir).forEach((file) => {
    const filepath = path.join(dir, file)
    const stat = fs.statSync(filepath)
    if (stat.isDirectory()) {
      if (
        IGNORE_DIRS.some((ignored) => file === ignored || file.startsWith('.'))
      )
        return
      filelist = walk(filepath, filelist)
    } else {
      filelist.push(filepath)
    }
  })
  return filelist
}

// Parsear el checklist maestro y extraer los ítems
async function parseChecklist(): Promise<{ section: string; item: string }[]> {
  const items: { section: string; item: string }[] = []
  const rl = readline.createInterface({
    input: fs.createReadStream(CHECKLIST_PATH),
    crlfDelay: Infinity,
  })
  let currentSection = ''
  const icons = ['✅', '🟡', '🔲', '❌', '⚠️', '⬜️']
  for await (const line of rl) {
    if (line.startsWith('### ')) {
      currentSection = line.replace('### ', '').trim()
    }
    const trimmed = line.trim()
    if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
      const afterDash = trimmed.slice(2).trim()
      const icon = icons.find((icon) => afterDash.startsWith(icon + ' '))
      let clean = afterDash
      if (icon) {
        clean = afterDash.slice(icon.length + 1) // Elimina el icono y el espacio
      }
      items.push({ section: currentSection, item: clean })
    }
  }
  return items
}

// Analizar evidencia para cada ítem (versión simple, se puede mejorar)
function analyzeItem(
  item: string,
  allFiles: string[],
): { score: number; evidence: string[] } {
  const evidence: string[] = []
  let score = 0
  // Estructura: buscar si hay carpeta/archivo mencionado
  const estructura = /`?\/?([\w-]+)\/?`?/.exec(item)
  if (estructura) {
    const name = estructura[1]
    if (allFiles.some((f) => f.includes(name))) {
      score += 0.2
      evidence.push(`Estructura encontrada: ${name}`)
    }
  }
  // Lógica: buscar si hay archivo .ts relevante
  if (
    /middleware|service|controller|route|validator|test|auth|stripe|resend|openai|posthog/i.test(
      item,
    )
  ) {
    const found = allFiles.filter((f) =>
      new RegExp(item.split(' ')[0], 'i').test(f),
    )
    if (found.length > 0) {
      score += 0.4
      evidence.push(`Lógica encontrada: ${found.join(', ')}`)
    }
  }
  // Integración: buscar dependencias en package.json
  if (
    /stripe|resend|openai|posthog|supabase|zod|vitest|supertest|dotenv/i.test(
      item,
    )
  ) {
    const pkg = fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8')
    if (new RegExp(item.split(' ')[0], 'i').test(pkg)) {
      score += 0.2
      evidence.push('Integración encontrada en package.json')
    }
  }
  // Tests: buscar archivos de test
  if (/test|coverage|vitest|supertest/i.test(item)) {
    const found = allFiles.filter((f) => /test/i.test(f))
    if (found.length > 0) {
      score += 0.2
      evidence.push(`Tests encontrados: ${found.join(', ')}`)
    }
  }
  return { score: Math.min(score, 1), evidence }
}

async function main() {
  console.log('Iniciando auditoría del checklist maestro...')
  const items = await parseChecklist()
  const allFiles = walk(ROOT)
  const results = []
  for (const { section, item } of items) {
    const { score, evidence } = analyzeItem(item, allFiles)
    let status = '❌ Pendiente'
    if (score === 1) status = '✅ Implementado'
    else if (score >= 0.6) status = '🟡 Parcial'
    else if (score >= 0.2) status = '🔲 Estructura'
    results.push({ section, item, status, score, evidence })
  }
  fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true })
  fs.writeFileSync(REPORT_PATH, JSON.stringify(results, null, 2))
  console.log(`Reporte generado en: ${REPORT_PATH}`)
}

main().catch((err) => {
  console.error('Error en la auditoría:', err)
  process.exit(1)
})
