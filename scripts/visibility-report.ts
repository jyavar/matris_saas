#!/usr/bin/env tsx

import { readFile, stat, writeFile } from 'fs/promises'
import { glob } from 'glob'
import { basename, extname, relative } from 'path'

interface ModuleHeader {
  module: string
  description: string
  paths: string[]
  tests: string[]
  routes: string[]
  docs: string[]
  last_synced: string
  responsible: string
  coverage: number
  status: string
  criticality: string
}

interface FileInfo {
  path: string
  relativePath: string
  type: 'source' | 'test' | 'config' | 'doc' | 'script' | 'other'
  size: number
  module?: string
  isDeclared: boolean
  isInHeader: boolean
  isInArchivosClave: boolean
}

interface VisibilityReport {
  generated_at: string
  summary: {
    total_files: number
    declared_files: number
    orphaned_files: number
    coverage_percentage: number
    modules_with_header: number
    modules_without_header: number
    routes_without_docs: number
    tests_without_association: number
  }
  orphaned_files: FileInfo[]
  modules_without_header: string[]
  routes_without_docs: string[]
  tests_without_association: string[]
  module_coverage: Record<
    string,
    {
      files: number
      declared: number
      orphaned: number
      coverage: number
    }
  >
}

class VisibilityReporter {
  private allFiles: FileInfo[] = []
  private moduleHeaders: Map<string, ModuleHeader> = new Map()
  private declaredPaths: Set<string> = new Set()
  private declaredTests: Set<string> = new Set()
  private declaredRoutes: Set<string> = new Set()

  async generateReport(): Promise<VisibilityReport> {
    console.log(
      '📊 STRATO Visibility Report - Generando reporte de visibilidad...\n',
    )

    try {
      // 1. Escanear todos los archivos relevantes
      await this.scanAllFiles()

      // 2. Extraer headers JSON de módulos
      await this.extractModuleHeaders()

      // 3. Validar archivos declarados vs. reales
      await this.validateFileDeclarations()

      // 4. Detectar archivos huérfanos
      const orphanedFiles = this.detectOrphanedFiles()

      // 5. Validar rutas documentadas
      const routesWithoutDocs = await this.validateRouteDocumentation()

      // 6. Validar tests asociados
      const testsWithoutAssociation = this.validateTestAssociations()

      // 7. Calcular cobertura por módulo
      const moduleCoverage = this.calculateModuleCoverage()

      // 8. Generar reporte
      const report = this.createReport(
        orphanedFiles,
        routesWithoutDocs,
        testsWithoutAssociation,
        moduleCoverage,
      )

      // 9. Guardar reporte
      await this.saveReport(report)

      return report
    } catch (error) {
      console.error('❌ Error generando reporte:', error)
      throw error
    }
  }

  private async scanAllFiles() {
    const patterns = [
      'apps/**/*.{ts,tsx,js,jsx,md,json}',
      'packages/**/*.{ts,tsx,js,jsx,md,json}',
      'scripts/**/*.{ts,tsx,js,jsx,md,json}',
      'supabase/**/*.{sql,json}',
      '*.{ts,tsx,js,jsx,md,json}',
      '~M_*.md',
    ]

    for (const pattern of patterns) {
      const files = await glob(pattern, {
        ignore: ['node_modules/**', '.git/**', 'dist/**'],
      })

      for (const file of files) {
        const stats = await stat(file)
        const ext = extname(file).toLowerCase()

        let type: FileInfo['type'] = 'other'
        if (['.ts', '.tsx', '.js', '.jsx'].includes(ext)) {
          type =
            file.includes('.test.') || file.includes('.spec.')
              ? 'test'
              : 'source'
        } else if (ext === '.md') type = 'doc'
        else if (
          ext === '.json' ||
          ext === '.config.ts' ||
          ext === '.config.js'
        )
          type = 'config'
        else if (file.includes('scripts/')) type = 'script'

        this.allFiles.push({
          path: file,
          relativePath: relative(process.cwd(), file),
          type,
          size: stats.size,
          isDeclared: false,
          isInHeader: false,
          isInArchivosClave: false,
        })
      }
    }

    console.log(`📁 Escaneados ${this.allFiles.length} archivos`)
  }

  private async extractModuleHeaders() {
    const moduleFiles = await glob('~M_*.md')

    for (const moduleFile of moduleFiles) {
      try {
        const content = await readFile(moduleFile, 'utf-8')
        const headerMatch = content.match(
          /<!--\s*STRATO MODULE HEADER\s*(\{[\s\S]*?\})\s*-->/,
        )

        if (headerMatch) {
          const headerJson = JSON.parse(headerMatch[1])
          const moduleName = basename(moduleFile, '.md').replace('~M_', '')
          this.moduleHeaders.set(moduleName, headerJson)

          // Agregar paths declarados a sets
          headerJson.paths?.forEach((path: string) =>
            this.declaredPaths.add(path),
          )
          headerJson.tests?.forEach((test: string) =>
            this.declaredTests.add(test),
          )
          headerJson.routes?.forEach((route: string) =>
            this.declaredRoutes.add(route),
          )
        }
      } catch (error) {
        console.warn(`⚠️ Error parsing header in ${moduleFile}: ${error}`)
      }
    }

    console.log(`📋 Extraídos ${this.moduleHeaders.size} headers de módulos`)
  }

  private async validateFileDeclarations() {
    for (const file of this.allFiles) {
      // Verificar si está declarado en algún header
      for (const [moduleName, header] of this.moduleHeaders) {
        if (header.paths?.includes(file.relativePath)) {
          file.isDeclared = true
          file.module = moduleName
          file.isInHeader = true
          break
        }
        if (header.tests?.includes(file.relativePath)) {
          file.isDeclared = true
          file.module = moduleName
          file.isInHeader = true
          break
        }
      }

      // Verificar si está en sección "Archivos clave"
      const moduleFiles = this.allFiles.filter((f) => f.path.includes('~M_'))
      for (const moduleFile of moduleFiles) {
        try {
          const content = await readFile(moduleFile.path, 'utf-8')
          if (content.includes(file.relativePath)) {
            file.isInArchivosClave = true
            break
          }
        } catch {
          // Ignore read errors
        }
      }
    }
  }

  private detectOrphanedFiles(): FileInfo[] {
    return this.allFiles.filter(
      (file) =>
        !file.isDeclared &&
        !file.isInArchivosClave &&
        !file.path.includes('node_modules') &&
        !file.path.includes('.git') &&
        !file.path.includes('dist') &&
        !file.path.includes('coverage') &&
        file.type !== 'other',
    )
  }

  private async validateRouteDocumentation(): Promise<string[]> {
    const routesWithoutDocs: string[] = []

    // Buscar rutas en archivos de routes
    const routeFiles = this.allFiles.filter(
      (f) => f.path.includes('routes/') && f.type === 'source',
    )

    for (const routeFile of routeFiles) {
      try {
        const content = await readFile(routeFile.path, 'utf-8')
        const routeMatches = content.match(
          /router\.(get|post|put|delete|patch)\s*\(\s*['"`]([^'"`]+)['"`]/g,
        )

        if (routeMatches) {
          for (const match of routeMatches) {
            const route = match.match(/['"`]([^'"`]+)['"`]/)?.[1]
            if (route && !this.declaredRoutes.has(route)) {
              routesWithoutDocs.push(route)
            }
          }
        }
      } catch {
        // Ignore read errors
      }
    }

    return routesWithoutDocs
  }

  private validateTestAssociations(): string[] {
    const testsWithoutAssociation: string[] = []
    const testFiles = this.allFiles.filter((f) => f.type === 'test')

    for (const testFile of testFiles) {
      if (!testFile.isDeclared) {
        testsWithoutAssociation.push(testFile.relativePath)
      }
    }

    return testsWithoutAssociation
  }

  private calculateModuleCoverage(): Record<
    string,
    { files: number; declared: number; orphaned: number; coverage: number }
  > {
    const moduleCoverage: Record<
      string,
      { files: number; declared: number; orphaned: number; coverage: number }
    > = {}

    for (const [moduleName] of this.moduleHeaders) {
      const moduleFiles = this.allFiles.filter((f) => f.module === moduleName)
      const declaredFiles = moduleFiles.filter((f) => f.isDeclared)
      const orphanedFiles = moduleFiles.filter((f) => !f.isDeclared)

      moduleCoverage[moduleName] = {
        files: moduleFiles.length,
        declared: declaredFiles.length,
        orphaned: orphanedFiles.length,
        coverage:
          moduleFiles.length > 0
            ? Math.round((declaredFiles.length / moduleFiles.length) * 100)
            : 0,
      }
    }

    return moduleCoverage
  }

  private createReport(
    orphanedFiles: FileInfo[],
    routesWithoutDocs: string[],
    testsWithoutAssociation: string[],
    moduleCoverage: Record<
      string,
      { files: number; declared: number; orphaned: number; coverage: number }
    >,
  ): VisibilityReport {
    const relevantFiles = this.allFiles.filter(
      (f) =>
        f.type !== 'other' &&
        !f.path.includes('node_modules') &&
        !f.path.includes('.git'),
    )

    const declaredFiles = relevantFiles.filter((f) => f.isDeclared)
    const coveragePercentage = Math.round(
      (declaredFiles.length / relevantFiles.length) * 100,
    )

    const expectedModules = [
      'AUTH',
      'ANALYTICS',
      'BILLING',
      'CAMPAIGNS',
      'COPILOT',
      'LAUNCHBOARD',
      'RUNTIME_DEFENSE',
      'SAAS_MATRIX',
      'UI_FULL',
      'BACKEND_CORE',
      'DEV',
      'TESTS',
      'PRICING',
      'EMAIL_CAMPAIGNS',
      'ANALYTICS_REPORTING',
      'MULTI_TENANCY',
      'WEB_PUBLIC',
      'AUTOMATION_ENGINE',
    ]

    const modulesWithoutHeader = expectedModules.filter(
      (module) => !this.moduleHeaders.has(module),
    )

    return {
      generated_at: new Date().toISOString(),
      summary: {
        total_files: relevantFiles.length,
        declared_files: declaredFiles.length,
        orphaned_files: orphanedFiles.length,
        coverage_percentage: coveragePercentage,
        modules_with_header: this.moduleHeaders.size,
        modules_without_header: modulesWithoutHeader.length,
        routes_without_docs: routesWithoutDocs.length,
        tests_without_association: testsWithoutAssociation.length,
      },
      orphaned_files: orphanedFiles,
      modules_without_header: modulesWithoutHeader,
      routes_without_docs: routesWithoutDocs,
      tests_without_association: testsWithoutAssociation,
      module_coverage: moduleCoverage,
    }
  }

  private async saveReport(report: VisibilityReport) {
    // Crear directorio si no existe
    const reportsDir = 'audit-artifacts/reports'
    try {
      await writeFile(
        `${reportsDir}/visibility-report.json`,
        JSON.stringify(report, null, 2),
      )
      console.log(
        `✅ Reporte JSON guardado en ${reportsDir}/visibility-report.json`,
      )
    } catch (error) {
      console.warn(`⚠️ No se pudo guardar reporte JSON: ${error}`)
    }

    // Generar reporte markdown
    const markdownReport = this.generateMarkdownReport(report)
    try {
      await writeFile(`${reportsDir}/visibility-report.md`, markdownReport)
      console.log(
        `✅ Reporte Markdown guardado en ${reportsDir}/visibility-report.md`,
      )
    } catch (error) {
      console.warn(`⚠️ No se pudo guardar reporte Markdown: ${error}`)
    }

    // Mostrar resumen en consola
    this.displaySummary(report)
  }

  private generateMarkdownReport(report: VisibilityReport): string {
    return `# 📊 STRATO Visibility Report

**Generado:** ${report.generated_at}

## 📈 Resumen Ejecutivo

- **Archivos totales:** ${report.summary.total_files}
- **Archivos declarados:** ${report.summary.declared_files}
- **Archivos huérfanos:** ${report.summary.orphaned_files}
- **Cobertura de trazabilidad:** ${report.summary.coverage_percentage}%
- **Módulos con header:** ${report.summary.modules_with_header}
- **Módulos sin header:** ${report.summary.modules_without_header}
- **Rutas sin documentar:** ${report.summary.routes_without_docs}
- **Tests sin asociar:** ${report.summary.tests_without_association}

## 🚨 Archivos Huérfanos (${report.orphaned_files.length})

${report.orphaned_files.map((file) => `- \`${file.relativePath}\` (${file.type})`).join('\n')}

## ❌ Módulos Sin Header (${report.modules_without_header.length})

${report.modules_without_header.map((module) => `- \`${module}\``).join('\n')}

## ⚠️ Rutas Sin Documentar (${report.routes_without_docs.length})

${report.routes_without_docs.map((route) => `- \`${route}\``).join('\n')}

## ⚠️ Tests Sin Asociar (${report.tests_without_association.length})

${report.tests_without_association.map((test) => `- \`${test}\``).join('\n')}

## 📊 Cobertura por Módulo

${Object.entries(report.module_coverage)
  .map(
    ([module, coverage]) =>
      `### ${module}\n- Archivos: ${coverage.files}\n- Declarados: ${coverage.declared}\n- Huérfanos: ${coverage.orphaned}\n- Cobertura: ${coverage.coverage}%\n`,
  )
  .join('\n')}

## 🎯 Próximos Pasos

1. **Asociar archivos huérfanos** a sus módulos correspondientes
2. **Crear headers JSON** para módulos faltantes
3. **Documentar rutas** en los headers de módulos
4. **Asociar tests** a sus módulos correspondientes
5. **Ejecutar sincronización** para actualizar headers

---
*Reporte generado automáticamente por STRATO Visibility Reporter*
`
  }

  private displaySummary(report: VisibilityReport) {
    console.log('\n📊 RESUMEN DE VISIBILIDAD')
    console.log('='.repeat(50))
    console.log(`📁 Archivos totales: ${report.summary.total_files}`)
    console.log(`📋 Archivos declarados: ${report.summary.declared_files}`)
    console.log(`🚨 Archivos huérfanos: ${report.summary.orphaned_files}`)
    console.log(`📈 Cobertura: ${report.summary.coverage_percentage}%`)
    console.log(`📦 Módulos con header: ${report.summary.modules_with_header}`)
    console.log(
      `❌ Módulos sin header: ${report.summary.modules_without_header}`,
    )
    console.log(
      `⚠️ Rutas sin documentar: ${report.summary.routes_without_docs}`,
    )
    console.log(
      `⚠️ Tests sin asociar: ${report.summary.tests_without_association}`,
    )
    console.log('='.repeat(50))
  }
}

// Ejecutar generación de reporte
const reporter = new VisibilityReporter()
reporter.generateReport().catch(console.error)
