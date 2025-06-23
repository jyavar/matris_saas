import * as fs from 'fs'
import * as path from 'path'

type ModuleReport = {
  status: 'complete' | 'partial' | 'absent'
  controllers?: string
  services?: string
  routes?: string
  tests?: string
  coverage?: string
  frontend?: string
  criticity?: string
  blindaje?: string
}

type AuditResult = {
  modules: Record<string, ModuleReport>
  score: {
    validatedModules: number
    totalModulesExpected: number
    completionRate: string
    criticalModulesWithoutTests: string[]
  }
}

const backendModulesDir = path.resolve('apps/backend/src/modules')
const frontendModulesDir = path.resolve('apps/frontend/src/modules')
const expectedModulesPath = path.resolve('scripts/audit/modules.expected.json')
const outputPath = path.resolve('audit-artifacts/core-audit.json')

const readDir = (dir: string) => {
  try {
    return fs.readdirSync(dir)
  } catch {
    return []
  }
}

const fileExists = (filePath: string) => fs.existsSync(filePath)

const generateAudit = () => {
  const expectedModules: string[] = JSON.parse(
    fs.readFileSync(expectedModulesPath, 'utf8'),
  )
  const report: AuditResult = {
    modules: {},
    score: {
      validatedModules: 0,
      totalModulesExpected: expectedModules.length,
      completionRate: '0%',
      criticalModulesWithoutTests: [],
    },
  }

  for (const mod of expectedModules) {
    const modPath = path.join(backendModulesDir, mod)
    const modFrontendPath = path.join(frontendModulesDir, mod)

    const exists = fs.existsSync(modPath)
    if (!exists) {
      report.modules[mod] = { status: 'absent' }
      continue
    }

    const hasRoutes =
      fileExists(path.join(modPath, 'routes')) ||
      fileExists(path.join(modPath, 'routes.ts'))
    const hasControllers =
      fileExists(path.join(modPath, 'controllers')) ||
      fileExists(path.join(modPath, 'controller.ts'))
    const hasServices =
      fileExists(path.join(modPath, 'services')) ||
      fileExists(path.join(modPath, 'service.ts'))

    const testFiles = readDir(modPath).filter((f) => f.includes('.test.ts'))
    const frontendExists = fs.existsSync(modFrontendPath)

    const moduleScore: ModuleReport = {
      status: 'partial',
      controllers: hasControllers ? 'ok' : 'missing',
      services: hasServices ? 'ok' : 'missing',
      routes: hasRoutes ? 'ok' : 'missing',
      tests: testFiles.length > 0 ? `${testFiles.length}` : 'none',
      frontend: frontendExists ? 'connected' : 'absent',
      blindaje: 'unknown',
    }

    if (
      hasRoutes &&
      hasControllers &&
      hasServices &&
      testFiles.length > 0 &&
      frontendExists
    ) {
      moduleScore.status = 'complete'
      report.score.validatedModules += 1
    } else if (mod === 'auth' || mod === 'payments') {
      report.score.criticalModulesWithoutTests.push(mod)
    }

    report.modules[mod] = moduleScore
  }

  report.score.completionRate = `${Math.round(
    (report.score.validatedModules / report.score.totalModulesExpected) * 100,
  )}%`

  fs.mkdirSync(path.dirname(outputPath), { recursive: true })
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2))

  console.log(`✅ Auditoría STRATO Core OS™ generada en ${outputPath}`)
}

generateAudit()
