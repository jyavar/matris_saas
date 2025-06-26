import fs from 'fs'
import path from 'path'

const ALL_MODULES_MD = path.resolve(process.cwd(), '~ALL_MODULES.md')
const MODULE_PATTERN = /^~M_.*\.md$/
const MODULE_HEADER_REGEX = /<!--([\s\S]*?)-->/

function extractStatusOrProgress(header: string): string {
  try {
    const json = JSON.parse(header)
    if (
      json.status &&
      typeof json.status === 'string' &&
      json.status.match(/\d+%/)
    ) {
      return json.status.match(/\d+%/)[0]
    }
    if (json.progress && typeof json.progress === 'number') {
      return `${json.progress}%`
    }
    if (
      json.progress &&
      typeof json.progress === 'string' &&
      json.progress.match(/\d+%/)
    ) {
      return json.progress.match(/\d+%/)[0]
    }
  } catch {
    // Si falla el parseo, simplemente devolvemos '??%'
  }
  return '??%'
}

function getModuleFiles() {
  return fs.readdirSync(process.cwd()).filter((f) => MODULE_PATTERN.test(f))
}

function getModuleProgressMap() {
  const map: Record<string, string> = {}
  for (const file of getModuleFiles()) {
    const content = fs.readFileSync(file, 'utf8')
    const match = content.match(MODULE_HEADER_REGEX)
    if (match) {
      const header = match[1]
        .trim()
        .replace(/^STRATO MODULE HEADER/, '')
        .trim()
      const progress = extractStatusOrProgress(header)
      map[file] = progress
      if (progress === '??%') {
        console.warn(`[WARN] No se encontró % de avance en header de ${file}`)
      }
    } else {
      map[file] = '??%'
      console.warn(`[WARN] No se encontró header JSON en ${file}`)
    }
  }
  return map
}

function syncAllModulesMd() {
  const progressMap = getModuleProgressMap()
  let content = fs.readFileSync(ALL_MODULES_MD, 'utf8')
  let changed = false
  for (const [file, percent] of Object.entries(progressMap)) {
    const base = path.basename(file)
    let regex
    try {
      regex = new RegExp(
        `\\[${base}\\]\\(\\./${base}\\) \\((\\d+%|\\?\\?%)\\)`,
        'g',
      )
    } catch (err) {
      // Si el regex es inválido, lo reportamos y seguimos
      console.error(`Regex inválido para ${base}:`, err, `\nPatrón: [${base}]`)
      continue
    }
    const replacement = `[${base}](./${base}) (${percent})`
    if (content.match(regex)) {
      content = content.replace(regex, replacement)
      changed = true
      console.log(`[SYNC] ${base} => ${percent}`)
    }
  }
  if (changed) {
    fs.writeFileSync(ALL_MODULES_MD, content, 'utf8')
    console.log('~ALL_MODULES.md sincronizado.')
  } else {
    console.log('No hubo cambios en ~ALL_MODULES.md.')
  }
}

syncAllModulesMd()
