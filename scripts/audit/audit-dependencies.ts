// scripts/audit/audit-dependencies.ts
import chalk from 'chalk'
import * as fs from 'fs'
import { globSync } from 'glob'
import * as path from 'path'

const ROOT = process.cwd()
const REPORT_PATH = path.join(ROOT, 'audit-artifacts', 'dependencies')
const REPORT_FILE = path.join(REPORT_PATH, 'dependency-report.json')
const IMPORT_REGEX =
  /from\s+['"]([^'"]+)['"]|require\s*\(\s*['"]([^'"]+)['"]\s*\)/g

type DependencyInfo = {
  version: string
  packages: string[]
}

type Report = {
  paquetes_analizados: string[]
  dependencias_usadas_no_declaradas: Record<string, string[]>
  dependencias_declaradas_no_usadas: Record<string, string[]>
  dependencias_duplicadas: Record<string, DependencyInfo>
  tipados_faltantes: Record<string, string[]>
  dependencias_criticas_marcadas: Record<string, string[]>
  acciones_sugeridas: string[]
  verificacion_entorno: Record<string, unknown>
  rutas_no_afectadas: true
}

const CRITICAL_DEPS = [
  'react',
  'express',
  'vite',
  'next',
  'zod',
  'pino',
  'drizzle-orm',
  '@supabase/supabase-js',
]

function findPackageJsons(): string[] {
  const rootPkg = path.join(ROOT, 'package.json')
  const appPkgs = globSync(path.join(ROOT, 'apps', '*', 'package.json'))
  const packagePkgs = globSync(path.join(ROOT, 'packages', '*', 'package.json'))
  return [rootPkg, ...appPkgs, ...packagePkgs]
}

function getPackageName(pkgPath: string): string {
  if (pkgPath.endsWith('package.json')) {
    const relativePath = path.relative(ROOT, pkgPath)
    return relativePath === 'package.json' ? 'root' : path.dirname(relativePath)
  }
  return path.relative(ROOT, pkgPath)
}

function analyzePackage(pkgPath: string): {
  pkgName: string
  declared: string[]
  used: Set<string>
  missingTypes: string[]
} {
  const pkgName = getPackageName(pkgPath)
  const pkgDir = path.dirname(pkgPath)
  const pkgContent = fs.readFileSync(pkgPath, 'utf8')
  const pkgJson = JSON.parse(pkgContent)

  const declared = Object.keys(pkgJson.dependencies || {}).concat(
    Object.keys(pkgJson.devDependencies || {}),
  )
  const sourceFiles = globSync(path.join(pkgDir, '**/*.{ts,tsx,js,mjs}'), {
    ignore: ['**/node_modules/**', '**/dist/**', '**/build/**'],
  })

  const used = new Set<string>()
  const missingTypes = new Set<string>()

  for (const file of sourceFiles) {
    const content = fs.readFileSync(file, 'utf8')
    let match
    while ((match = IMPORT_REGEX.exec(content)) !== null) {
      const dep = match[1] || match[2]
      if (
        dep &&
        !dep.startsWith('.') &&
        !dep.startsWith('/') &&
        !dep.startsWith('#')
      ) {
        const baseDep = dep.startsWith('@')
          ? dep.split('/').slice(0, 2).join('/')
          : dep.split('/')[0]
        used.add(baseDep)
        if (
          !declared.includes(`@types/${baseDep}`) &&
          !baseDep.startsWith('@types/')
        ) {
          missingTypes.add(baseDep)
        }
      }
    }
  }

  // Filter out types that are actually present
  const finalMissingTypes = Array.from(missingTypes).filter(
    (dep) =>
      !declared.includes(`@types/${dep}`) &&
      !declared.includes(dep) &&
      used.has(dep),
  )

  return {
    pkgName,
    declared,
    used,
    missingTypes: finalMissingTypes,
  }
}

function generateComprehensiveReport() {
  const pkgPaths = findPackageJsons()
  const report: Report = {
    paquetes_analizados: [],
    dependencias_usadas_no_declaradas: {},
    dependencias_declaradas_no_usadas: {},
    dependencias_duplicadas: {},
    tipados_faltantes: {},
    dependencias_criticas_marcadas: {},
    acciones_sugeridas: [],
    verificacion_entorno: {},
    rutas_no_afectadas: true,
  }

  const allDeclaredDeps = new Map<string, DependencyInfo>()

  for (const pkgPath of pkgPaths) {
    const { pkgName, declared, used, missingTypes } = analyzePackage(pkgPath)
    report.paquetes_analizados.push(pkgName)

    const usedArray = Array.from(used)
    const unused = declared.filter(
      (d) => !used.has(d) && !d.startsWith('@types/'),
    )
    const undeclared = usedArray.filter((u) => !declared.includes(u))

    if (undeclared.length > 0)
      report.dependencias_usadas_no_declaradas[pkgName] = undeclared
    if (unused.length > 0)
      report.dependencias_declaradas_no_usadas[pkgName] = unused
    if (missingTypes.length > 0)
      report.tipados_faltantes[pkgName] = missingTypes

    const critical = declared.filter((d) => CRITICAL_DEPS.includes(d))
    if (critical.length > 0)
      report.dependencias_criticas_marcadas[pkgName] = critical

    const pkgJson = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
    const allDeps = { ...pkgJson.dependencies, ...pkgJson.devDependencies }
    for (const dep in allDeps) {
      if (allDeclaredDeps.has(dep)) {
        const existing = allDeclaredDeps.get(dep)!
        existing.packages.push(pkgName)
        if (existing.version !== allDeps[dep]) {
          report.acciones_sugeridas.push(
            `⚠️ Versión inconsistente para '${dep}': ${existing.version} vs ${allDeps[dep]} en [${existing.packages.join(', ')}]`,
          )
        }
      } else {
        allDeclaredDeps.set(dep, { version: allDeps[dep], packages: [pkgName] })
      }
    }
  }

  allDeclaredDeps.forEach((info, dep) => {
    if (info.packages.length > 1) {
      report.dependencias_duplicadas[dep] = info
    }
  })

  const hoistable = Object.entries(report.dependencias_duplicadas).filter(
    ([, info]) => info.packages.length > 1 && !info.packages.includes('root'),
  )
  if (hoistable.length > 0) {
    report.acciones_sugeridas.push(
      `💡 Considera mover dependencias duplicadas a la raíz: ${hoistable.map((h) => h[0]).join(', ')}`,
    )
  }

  // Environment checks
  const npmrcPath = path.join(ROOT, '.npmrc')
  if (fs.existsSync(npmrcPath)) {
    const npmrcContent = fs.readFileSync(npmrcPath, 'utf8')
    report.verificacion_entorno.npmrc_encontrado = true
    report.verificacion_entorno.npmrc_hoist_config = npmrcContent.includes(
      'public-hoist-pattern[]=*',
    )
  } else {
    report.verificacion_entorno.npmrc_encontrado = false
  }
  report.verificacion_entorno.pnpm_lock_encontrado = fs.existsSync(
    path.join(ROOT, 'pnpm-lock.yaml'),
  )

  const rootPkgJson = JSON.parse(
    fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'),
  )
  const scripts = rootPkgJson.scripts || {}
  report.verificacion_entorno.scripts_disponibles = {
    lint: !!scripts.lint,
    test: !!scripts.test,
    build: !!scripts.build,
  }

  fs.mkdirSync(REPORT_PATH, { recursive: true })
  fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2))

  console.log(chalk.bold.green(`\n✅ Auditoría de dependencias completada.`))
  console.log(
    chalk.green(
      `El informe completo se ha guardado en: ${chalk.cyan(REPORT_FILE)}`,
    ),
  )

  console.log(chalk.bold.yellow(`\nResumen de Acciones Sugeridas:`))
  if (report.acciones_sugeridas.length > 0) {
    report.acciones_sugeridas.forEach((action) => console.log(`- ${action}`))
  } else {
    console.log(chalk.gray('Ninguna acción urgente requerida.'))
  }
}

generateComprehensiveReport()
