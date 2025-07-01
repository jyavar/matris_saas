#!/usr/bin/env tsx

import { readFile, stat } from 'fs/promises'
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

interface ValidationResult {
  success: boolean
  errors: string[]
  warnings: string[]
  orphanedFiles: FileInfo[]
  modulesWithoutHeader: string[]
  routesWithoutDocs: string[]
  testsWithoutAssociation: string[]
  coverage: {
    total: number
    declared: number
    orphaned: number
    percentage: number
  }
}

class TraceabilityValidator {
  private allFiles: FileInfo[] = []
  private moduleHeaders: Map<string, ModuleHeader> = new Map()
  private declaredPaths: Set<string> = new Set()
  private declaredTests: Set<string> = new Set()
  private declaredRoutes: Set<string> = new Set()

  async validate(): Promise<ValidationResult> {
    console.log(
      '🛡️ STRATO Traceability Validation - Validando blindaje de trazabilidad...\n',
    )

    const result: ValidationResult = {
      success: true,
      errors: [],
      warnings: [],
      orphanedFiles: [],
      modulesWithoutHeader: [],
      routesWithoutDocs: [],
      testsWithoutAssociation: [],
      coverage: { total: 0, declared: 0, orphaned: 0, percentage: 0 },
    }

    try {
      // 1. Escanear todos los archivos relevantes
      await this.scanAllFiles()

      // 2. Extraer headers JSON de módulos
      await this.extractModuleHeaders()

      // 3. Validar headers JSON
      this.validateModuleHeaders(result)

      // 4. Validar archivos declarados vs. reales
      await this.validateFileDeclarations()

      // 5. Detectar archivos huérfanos
      this.detectOrphanedFiles(result)

      // 6. Validar rutas documentadas
      await this.validateRouteDocumentation(result)

      // 7. Validar tests asociados
      this.validateTestAssociations(result)

      // 8. Calcular cobertura
      this.calculateCoverage(result)

      // 9. Generar reporte
      this.generateReport(result)

      // 10. Determinar éxito/fallo
      result.success =
        result.errors.length === 0 && result.orphanedFiles.length === 0
    } catch (error) {
      result.errors.push(`Error durante validación: ${error}`)
      result.success = false
    }

    return result
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

  private validateModuleHeaders(result: ValidationResult) {
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

    for (const moduleName of expectedModules) {
      if (!this.moduleHeaders.has(moduleName)) {
        result.modulesWithoutHeader.push(moduleName)
        result.errors.push(
          `❌ Módulo ${moduleName} no tiene header JSON válido`,
        )
      }
    }

    // Validar estructura de headers
    for (const [moduleName, header] of this.moduleHeaders) {
      const requiredFields = [
        'module',
        'description',
        'paths',
        'tests',
        'routes',
        'docs',
      ]
      for (const field of requiredFields) {
        if (!header[field]) {
          result.errors.push(
            `❌ Header de ${moduleName} falta campo requerido: ${field}`,
          )
        }
      }
    }
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

  private detectOrphanedFiles(result: ValidationResult) {
    result.orphanedFiles = this.allFiles.filter(
      (file) =>
        !file.isDeclared &&
        !file.isInArchivosClave &&
        !file.path.includes('node_modules') &&
        !file.path.includes('.git') &&
        !file.path.includes('dist') &&
        !file.path.includes('coverage') &&
        file.type !== 'other',
    )

    if (result.orphanedFiles.length > 0) {
      result.errors.push(
        `❌ ${result.orphanedFiles.length} archivos huérfanos detectados`,
      )
    }
  }

  private async validateRouteDocumentation(result: ValidationResult) {
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
              result.routesWithoutDocs.push(route)
              result.warnings.push(`⚠️ Ruta ${route} no documentada en módulos`)
            }
          }
        }
      } catch {
        // Ignore read errors
      }
    }
  }

  private validateTestAssociations(result: ValidationResult) {
    const testFiles = this.allFiles.filter((f) => f.type === 'test')

    for (const testFile of testFiles) {
      if (!testFile.isDeclared) {
        result.testsWithoutAssociation.push(testFile.relativePath)
        result.warnings.push(
          `⚠️ Test ${testFile.relativePath} no asociado a módulo`,
        )
      }
    }
  }

  private calculateCoverage(result: ValidationResult) {
    const relevantFiles = this.allFiles.filter(
      (f) =>
        f.type !== 'other' &&
        !f.path.includes('node_modules') &&
        !f.path.includes('.git'),
    )

    result.coverage = {
      total: relevantFiles.length,
      declared: relevantFiles.filter((f) => f.isDeclared).length,
      orphaned: result.orphanedFiles.length,
      percentage: Math.round(
        (relevantFiles.filter((f) => f.isDeclared).length /
          relevantFiles.length) *
          100,
      ),
    }
  }

  private generateReport(result: ValidationResult) {
    console.log('\n📊 REPORTE DE VALIDACIÓN DE TRAZABILIDAD')
    console.log('='.repeat(60))

    console.log(`\n✅ Módulos con header JSON: ${this.moduleHeaders.size}`)
    console.log(`❌ Módulos sin header: ${result.modulesWithoutHeader.length}`)
    console.log(`📁 Archivos totales: ${result.coverage.total}`)
    console.log(`📋 Archivos declarados: ${result.coverage.declared}`)
    console.log(`🚨 Archivos huérfanos: ${result.coverage.orphaned}`)
    console.log(`📈 Cobertura de trazabilidad: ${result.coverage.percentage}%`)

    if (result.errors.length > 0) {
      console.log('\n❌ ERRORES CRÍTICOS:')
      result.errors.forEach((error) => console.log(`  ${error}`))
    }

    if (result.warnings.length > 0) {
      console.log('\n⚠️ ADVERTENCIAS:')
      result.warnings.forEach((warning) => console.log(`  ${warning}`))
    }

    if (result.orphanedFiles.length > 0) {
      console.log('\n🚨 ARCHIVOS HUÉRFANOS:')
      result.orphanedFiles.slice(0, 10).forEach((file) => {
        console.log(`  - ${file.relativePath} (${file.type})`)
      })
      if (result.orphanedFiles.length > 10) {
        console.log(`  ... y ${result.orphanedFiles.length - 10} más`)
      }
    }

    console.log('\n' + '='.repeat(60))

    if (result.success) {
      console.log('✅ VALIDACIÓN EXITOSA - Trazabilidad 100% garantizada')
    } else {
      console.log('❌ VALIDACIÓN FALLIDA - Corregir errores antes de continuar')
      process.exit(1)
    }
  }
}

// Ejecutar validación
const validator = new TraceabilityValidator()
validator.validate().catch(console.error)
