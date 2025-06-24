import * as fs from 'fs/promises'
import * as path from 'path'

// Tipos estrictos
interface AuditFeature {
  id: string
  feature: string
  tipo: string
  area: string
  requerido: boolean
  tag: string
  critico: boolean
}

const CHECKLIST_GLOBS = [/^~CHECKLIST_.*\.md$/, /^~PLAYBOOK.*\.md$/]
const CHECKLIST_FILES = [
  '~12_CHECKLIST_MAESTRO.md',
  '~10_CHECKLIST_FULL_STRATO.md',
  '~1_BACKEND_ROADMAP.md',
  '~2_CHECKLIST_PRE_DEPLOY.md',
  '~3_MATRIX_ROADMAP.md',
  '~4_PLAYBOOK_RULES.md',
  '~5_PLAYBOOK.md',
  '~6_README.cursor.md',
  '~7_SAAS_MATRIX_ROADMAP.md',
  '~8_SCORECARD.md',
  '~9_STRATO_FULL_CLEAN_COVERAGE.md',
  '~11_LOCAL_WORKAROUNDS.md',
  '~13_PIPE_AUDITORIA_STRATO.md',
]
const ROOT = process.cwd()

function inferTipo(text: string): string {
  if (/test|prueba|coverage/i.test(text)) return 'test'
  if (/api|endpoint|route|ruta/i.test(text)) return 'api'
  if (/middleware|auth|seguridad/i.test(text)) return 'seguridad'
  if (/frontend|ui|react|next/i.test(text)) return 'frontend'
  if (/backend|express|service/i.test(text)) return 'backend'
  return 'otro'
}

function inferArea(text: string): string {
  if (/user|usuario|auth/i.test(text)) return 'usuarios'
  if (/analytics|metric/i.test(text)) return 'analytics'
  if (/profile|perfil/i.test(text)) return 'perfiles'
  if (/todo|task/i.test(text)) return 'todos'
  if (/infra|deploy|docker/i.test(text)) return 'infra'
  return 'core'
}

function inferTag(text: string): string {
  if (/critico|obligatorio|must/i.test(text)) return 'critico'
  if (/opcional|mejora|should/i.test(text)) return 'mejora'
  return 'core'
}

function inferCritico(text: string): boolean {
  return /critico|obligatorio|must/i.test(text)
}

function inferRequerido(text: string): boolean {
  return !/opcional|mejora|should/i.test(text)
}

async function getChecklistFiles(): Promise<string[]> {
  const files = await fs.readdir(ROOT)
  const globMatches = files.filter((f) =>
    CHECKLIST_GLOBS.some((r) => r.test(f)),
  )
  return Array.from(
    new Set([
      ...globMatches,
      ...CHECKLIST_FILES.filter((f) => files.includes(f)),
    ]),
  )
}

async function extractFeaturesFromMd(file: string): Promise<AuditFeature[]> {
  const content = await fs.readFile(path.join(ROOT, file), 'utf-8')
  const lines = content.split(/\r?\n/)
  const features: AuditFeature[] = []
  let section = ''
  for (const line of lines) {
    if (/^#+\s/.test(line)) section = line.replace(/^#+\s*/, '').trim()
    if (/^[-*]\s|^\d+\.\s/.test(line)) {
      const feature = line.replace(/^[-*\d.]\s*/, '').trim()
      const id = `${file}::${section}::${feature}`
      features.push({
        id,
        feature,
        tipo: inferTipo(feature),
        area: inferArea(feature),
        requerido: inferRequerido(feature),
        tag: inferTag(feature),
        critico: inferCritico(feature),
      })
    }
  }
  return features
}

async function main() {
  const files = await getChecklistFiles()
  let all: AuditFeature[] = []
  for (const file of files) {
    const feats = await extractFeaturesFromMd(file)
    all = all.concat(feats)
  }
  await fs.writeFile('matrix.audit.json', JSON.stringify(all, null, 2))
  await fs.writeFile(
    'audit.extract-audit.auditable.json',
    JSON.stringify(
      { timestamp: new Date().toISOString(), count: all.length, files },
      null,
      2,
    ),
  )
  console.log(
    `✅ matrix.audit.json generado con ${all.length} features extraídas de ${files.length} archivos.`,
  )
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
