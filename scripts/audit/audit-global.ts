// scripts/audit/audit-global.ts
import chalk from 'chalk'
import * as fs from 'fs'
import { globSync } from 'glob'
import * as path from 'path'

const ROOT = process.cwd()
const MODULES_PATH = path.join(ROOT, 'apps')
const REPORT_PATH = path.join(ROOT, 'audit-artifacts', 'global-audit.json')

type ModuleStatus = {
  name: string
  hasRoutes: boolean
  hasTests: boolean
  hasTypes: boolean
  isVisible: boolean
  hasIndex: boolean
}

function scanModules(): ModuleStatus[] {
  const modules: ModuleStatus[] = []
  const folders = fs
    .readdirSync(MODULES_PATH)
    .filter((f) => fs.statSync(path.join(MODULES_PATH, f)).isDirectory())

  for (const name of folders) {
    const basePath = path.join(MODULES_PATH, name)
    const status: ModuleStatus = {
      name,
      hasRoutes: fs.existsSync(path.join(basePath, 'src', 'routes')),
      hasTests:
        fs.existsSync(path.join(basePath, 'tests')) ||
        globSync(`${basePath}/**/*.test.ts`).length > 0,
      hasTypes:
        fs.existsSync(path.join(basePath, 'types')) ||
        globSync(`${basePath}/**/*.d.ts`).length > 0,
      isVisible: !!globSync(`${ROOT}/**/*${name}*`).length,
      hasIndex: fs.existsSync(path.join(basePath, 'index.ts')),
    }
    modules.push(status)
  }

  return modules
}

function analyzeDependencies(): {
  used: string[]
  declared: string[]
  missing: string[]
  unused: string[]
} {
  const allFiles = globSync(`${ROOT}/**/*.{ts,tsx}`, {
    ignore: ['**/node_modules/**'],
  })
  const importRegex = /from ['"]([^'"]+)['"]/g

  const used = new Set<string>()
  for (const file of allFiles) {
    const content = fs.readFileSync(file, 'utf-8')
    let match
    while ((match = importRegex.exec(content)) !== null) {
      const dep = match[1]
      if (!dep.startsWith('.') && !dep.startsWith('/'))
        used.add(dep.split('/')[0])
    }
  }

  const pkg = JSON.parse(
    fs.readFileSync(path.join(ROOT, 'package.json'), 'utf-8'),
  )
  const declared = Object.keys(pkg.dependencies || {}).concat(
    Object.keys(pkg.devDependencies || {}),
  )
  const missing = Array.from(used).filter((u) => !declared.includes(u))
  const unused = declared.filter((d) => !used.has(d))

  return { used: Array.from(used), declared, missing, unused }
}

function generateReport() {
  const modules = scanModules()
  const deps = analyzeDependencies()

  const report = {
    date: new Date().toISOString(),
    modules,
    dependencies: deps,
  }

  fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true })
  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2))

  console.log(chalk.green(`✅ Auditoría global completada.`))
  console.table(
    modules.map((m) => ({
      Módulo: m.name,
      Rutas: m.hasRoutes ? '✅' : '❌',
      Tests: m.hasTests ? '✅' : '❌',
      Tipos: m.hasTypes ? '✅' : '❌',
      Visible: m.isVisible ? '✅' : '❌',
      Index: m.hasIndex ? '✅' : '❌',
    })),
  )

  console.log(chalk.blue(`\n📦 Dependencias detectadas:`))
  console.log(chalk.yellow(`Usadas no declaradas:`), deps.missing)
  console.log(chalk.cyan(`Declaradas no usadas:`), deps.unused)
}

generateReport()
