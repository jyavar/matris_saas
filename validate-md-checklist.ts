import * as fs from 'fs'
import { globby } from 'globby'
import * as path from 'path'

interface ChecklistItem {
  id: string
  file: string
  section: string
  feature: string
  statusDeclared: '✅' | '⬜️'
}

async function extractChecklistItems(): Promise<ChecklistItem[]> {
  const mdFiles = await globby(['./~*.md'], {
    ignore: ['node_modules', '.next', 'dist'],
  })

  const items: ChecklistItem[] = []
  for (const file of mdFiles) {
    const content = fs.readFileSync(file, 'utf-8')
    const lines = content.split('\n')
    let currentSection = ''

    for (const line of lines) {
      if (line.startsWith('### ')) {
        currentSection = line.replace('### ', '').trim()
      }

      const match = line.match(/^[-•]? ?(✅|⬜️)\s+(.*)$/)
      if (match) {
        const [, status, feature] = match
        const id = `${path.basename(file)}::${currentSection}::${feature}`
        items.push({
          id,
          file,
          section: currentSection,
          feature,
          statusDeclared: status as '✅' | '⬜️',
        })
      }
    }
  }

  return items
}

async function main() {
  const checklist = await extractChecklistItems()
  const outPath = path.resolve(process.cwd(), 'matrix.audit.json')
  fs.writeFileSync(outPath, JSON.stringify(checklist, null, 2))
  console.log(`✅ Audit matrix exportada en: ${outPath}`)
}

main().catch((err) => {
  console.error('Error ejecutando auditoría:', err)
  process.exit(1)
})
