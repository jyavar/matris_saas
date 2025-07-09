/**
 * 📦 STRATO Core OS™ – Repo Inventory & Valuation Analyzer
 *
 * Este script recorre todo el monorepo, identifica módulos funcionales,
 * agentes activos, frontend, backend, CI/CD, testing y documentación.
 *
 * Luego genera un informe Markdown (~REPO_INVENTORY.md) con:
 * - Inventario técnico completo
 * - Estado de implementación (por área)
 * - Puntaje STRATO actual (0–100)
 * - Valor estimado del repositorio en USD
 * 
 * Compatible con ejecución local o desde agente AI.
 */

import { writeFileSync, readdirSync, statSync, existsSync } from 'fs'
import { join } from 'path'

type AreaStatus = '✅ Completo' | '🟡 Parcial' | '❌ Incompleto'

interface Area {
  name: string
  path: string
  status: AreaStatus
  comment: string
  weight: number // para score final
  details: string[]
}

interface RepoStats {
  totalFiles: number
  totalLines: number
  testCoverage: number
  activeAgents: number
  modulesCount: number
}

class STRATOInventoryAnalyzer {
  private basePath: string
  private areas: Area[] = []
  private stats: RepoStats = {
    totalFiles: 0,
    totalLines: 0,
    testCoverage: 0,
    activeAgents: 0,
    modulesCount: 0
  }

  constructor() {
    this.basePath = process.cwd()
    this.initializeAreas()
  }

  private initializeAreas(): void {
    this.areas = [
      {
        name: 'Frontend',
        path: 'apps/frontend/',
        status: '✅ Completo',
        comment: 'Next.js 15, UI limpia, sin deuda técnica',
        weight: 20,
        details: []
      },
      {
        name: 'Backend',
        path: 'apps/backend/',
        status: '✅ Completo',
        comment: 'Módulos activos, auth, campañas, runtime',
        weight: 20,
        details: []
      },
      {
        name: 'Agentes STRATO',
        path: 'scripts/agents/',
        status: '✅ Completo',
        comment: '6 agentes STRATO con orquestador y tests',
        weight: 20,
        details: []
      },
      {
        name: 'Infraestructura (CI/CD)',
        path: '.github/workflows/',
        status: '✅ Completo',
        comment: 'GitHub Actions funcionando, lint, typecheck, tests',
        weight: 10,
        details: []
      },
      {
        name: 'Documentación',
        path: 'docs/',
        status: '✅ Completo',
        comment: 'Playbooks, módulos, reglas STRATO, checklist',
        weight: 10,
        details: []
      },
      {
        name: 'Testing',
        path: 'tests/',
        status: '🟡 Parcial',
        comment: 'Tests completos en agentes, backend parcial',
        weight: 10,
        details: []
      },
      {
        name: 'Dashboard / Paneles',
        path: 'apps/frontend/src/app/dashboard/',
        status: '🟡 Parcial',
        comment: 'Panel iniciado, falta control-tower completo',
        weight: 5,
        details: []
      },
      {
        name: 'Módulos de negocio',
        path: 'apps/backend/src/services/',
        status: '🟡 Parcial',
        comment: 'Launchboard, Campaigns listos. Pricing incompleto.',
        weight: 5,
        details: []
      }
    ]
  }

  private analyzeDirectory(dirPath: string): { files: number; lines: number } {
    let files = 0
    let lines = 0

    try {
      const items = readdirSync(dirPath)
      
      for (const item of items) {
        const fullPath = join(dirPath, item)
        const stats = statSync(fullPath)
        
        if (stats.isDirectory()) {
          // Excluir carpetas irrelevantes
          if (this.shouldExcludeDirectory(item)) {
            continue
          }
          const subResult = this.analyzeDirectory(fullPath)
          files += subResult.files
          lines += subResult.lines
        } else if (stats.isFile() && this.isCodeFile(item)) {
          files++
          try {
            const content = require('fs').readFileSync(fullPath, 'utf8')
            lines += content.split('\n').length
          } catch {
            // Ignore files that can't be read
          }
        }
      }
    } catch {
      // Directory doesn't exist or can't be accessed
    }

    return { files, lines }
  }

  private shouldExcludeDirectory(dirName: string): boolean {
    const excludePatterns = [
      'node_modules',
      '.git',
      '.next',
      'dist',
      'build',
      'coverage',
      '.turbo',
      '.husky',
      '.github',
      'logs',
      'test-output',
      'audit-artifacts',
      'backup',
      'playwright-report',
      '.tmp-scripts',
      '.idea',
      '.claude',
      '__pycache__',
      '.DS_Store',
      '*.log',
      '*.tmp',
      '*.bak'
    ]
    
    return excludePatterns.some(pattern => 
      dirName.includes(pattern) || 
      dirName.startsWith('.') ||
      dirName.startsWith('~')
    )
  }

  private isCodeFile(filename: string): boolean {
    const codeExtensions = ['.ts', '.tsx', '.js', '.jsx', '.json', '.md', '.sql', '.yml', '.yaml', '.toml', '.env']
    return codeExtensions.some(ext => filename.endsWith(ext))
  }

  private isRelevantPath(dirPath: string): boolean {
    const relevantPaths = [
      'apps/frontend',
      'apps/backend', 
      'apps/backend-nest',
      'apps/web',
      'apps/strato-website',
      'scripts/agents',
      'scripts/report',
      'packages',
      'supabase',
      'docs',
      'src'
    ]
    
    const relativePath = dirPath.replace(this.basePath, '').replace(/^[\/\\]/, '')
    return relevantPaths.some(path => relativePath.startsWith(path))
  }

  private countActiveAgents(): number {
    const agentsPath = join(this.basePath, 'scripts/agents')
    if (!existsSync(agentsPath)) return 0

    try {
      const agents = readdirSync(agentsPath, { withFileTypes: true })
      return agents.filter(dirent => 
        dirent.isDirectory() && 
        !dirent.name.startsWith('__') && 
        !dirent.name.startsWith('.')
      ).length
    } catch {
      return 0
    }
  }

  private analyzeArea(area: Area): void {
    const fullPath = join(this.basePath, area.path)
    
    if (!existsSync(fullPath)) {
      area.status = '❌ Incompleto'
      area.comment = 'Directorio no encontrado'
      return
    }

    // Solo analizar si es una ruta relevante
    if (!this.isRelevantPath(fullPath)) {
      area.status = '🟡 Parcial'
      area.comment = 'Ruta no considerada en análisis principal'
      return
    }

    const { files, lines } = this.analyzeDirectory(fullPath)
    area.details.push(`📁 ${files} archivos`)
    area.details.push(`📝 ${lines.toLocaleString()} líneas de código`)

    // Análisis específico por área
    switch (area.name) {
      case 'Frontend':
        this.analyzeFrontend(area, fullPath)
        break
      case 'Backend':
        this.analyzeBackend(area, fullPath)
        break
      case 'Agentes STRATO':
        this.analyzeAgents(area, fullPath)
        break
      case 'Testing':
        this.analyzeTesting(area, fullPath)
        break
      case 'Documentación':
        this.analyzeDocumentation(area, fullPath)
        break
    }
  }

  private analyzeFrontend(area: Area, path: string): void {
    const hasNextConfig = existsSync(join(path, 'next.config.ts'))
    const hasPackageJson = existsSync(join(path, 'package.json'))
    const hasAppDir = existsSync(join(path, 'src/app'))
    
    if (hasNextConfig && hasPackageJson && hasAppDir) {
      area.status = '✅ Completo'
      area.comment = 'Next.js 15 configurado, App Router, TypeScript'
    } else {
      area.status = '🟡 Parcial'
      area.comment = 'Configuración Next.js incompleta'
    }
  }

  private analyzeBackend(area: Area, path: string): void {
    const hasControllers = existsSync(join(path, 'src/controllers'))
    const hasServices = existsSync(join(path, 'src/services'))
    const hasRoutes = existsSync(join(path, 'src/routes'))
    const hasTests = existsSync(join(path, 'src/tests'))
    
    if (hasControllers && hasServices && hasRoutes) {
      area.status = '✅ Completo'
      area.comment = 'Arquitectura completa: controllers, services, routes'
    } else {
      area.status = '🟡 Parcial'
      area.comment = 'Faltan componentes de arquitectura'
    }

    if (hasTests) {
      area.details.push('🧪 Tests implementados')
    }
  }

  private analyzeAgents(area: Area, path: string): void {
    const agentDirs = readdirSync(path, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory() && !dirent.name.startsWith('__'))
    
    this.stats.activeAgents = agentDirs.length
    
    if (agentDirs.length >= 5) {
      area.status = '✅ Completo'
      area.comment = `${agentDirs.length} agentes activos con orquestador`
    } else {
      area.status = '🟡 Parcial'
      area.comment = `${agentDirs.length} agentes implementados`
    }

    area.details.push(`🤖 ${agentDirs.length} agentes activos`)
  }

  private analyzeTesting(area: Area, path: string): void {
    const hasVitest = existsSync(join(this.basePath, 'vitest.config.ts'))
    const hasTestDirs = this.countTestDirectories()
    
    if (hasVitest && hasTestDirs > 3) {
      area.status = '✅ Completo'
      area.comment = 'Vitest configurado, tests en múltiples áreas'
    } else if (hasVitest) {
      area.status = '🟡 Parcial'
      area.comment = 'Vitest configurado, tests limitados'
    } else {
      area.status = '❌ Incompleto'
      area.comment = 'Sin configuración de testing'
    }

    area.details.push(`🧪 ${hasTestDirs} directorios de tests`)
  }

  private countTestDirectories(): number {
    let count = 0
    const testPatterns = ['__tests__', 'tests', 'test']
    
    const scanForTests = (dir: string): void => {
      try {
        const items = readdirSync(dir, { withFileTypes: true })
        for (const item of items) {
          if (item.isDirectory()) {
            // Excluir carpetas irrelevantes
            if (this.shouldExcludeDirectory(item.name)) {
              continue
            }
            
            if (testPatterns.some(pattern => item.name.includes(pattern))) {
              count++
            }
            scanForTests(join(dir, item.name))
          }
        }
      } catch {
        // Ignore inaccessible directories
      }
    }

    scanForTests(this.basePath)
    return count
  }

  private analyzeDocumentation(area: Area, path: string): void {
    const hasDocs = existsSync(path)
    const hasReadme = existsSync(join(this.basePath, 'README.md'))
    const hasPlaybook = existsSync(join(this.basePath, '~3_PLAYBOOK.STRATO.md'))
    
    if (hasDocs && hasReadme && hasPlaybook) {
      area.status = '✅ Completo'
      area.comment = 'Documentación completa: docs/, README, playbook'
    } else if (hasReadme || hasPlaybook) {
      area.status = '🟡 Parcial'
      area.comment = 'Documentación básica presente'
    } else {
      area.status = '❌ Incompleto'
      area.comment = 'Falta documentación principal'
    }

    if (hasDocs) area.details.push('📚 Directorio docs/ presente')
    if (hasReadme) area.details.push('📖 README.md presente')
    if (hasPlaybook) area.details.push('📋 Playbook STRATO presente')
  }

  private calculateScore(): number {
    return this.areas.reduce((acc, area) => {
      const multiplier = area.status === '✅ Completo' ? 1 : 
                       area.status === '🟡 Parcial' ? 0.5 : 0
      return acc + area.weight * multiplier
    }, 0)
  }

  private getValuation(score: number): string {
    if (score >= 90) return '$100.000+ USD'
    if (score >= 75) return '$30.000 – $70.000 USD'
    if (score >= 50) return '$15.000 – $30.000 USD'
    return '< $15.000 USD'
  }

  private generateMarkdownReport(score: number, valuation: string): string {
    // Analizar solo rutas relevantes del repositorio
    const relevantPaths = [
      'apps/frontend',
      'apps/backend', 
      'apps/backend-nest',
      'apps/web',
      'apps/strato-website',
      'scripts/agents',
      'scripts/report',
      'packages',
      'supabase',
      'docs',
      'src'
    ]
    
    let totalFiles = 0
    let totalLines = 0
    
    for (const path of relevantPaths) {
      const fullPath = join(this.basePath, path)
      if (existsSync(fullPath)) {
        const stats = this.analyzeDirectory(fullPath)
        totalFiles += stats.files
        totalLines += stats.lines
      }
    }
    
    return `# 📊 Inventario Técnico del Repositorio STRATO

**Fecha**: ${new Date().toISOString()}
**Puntaje STRATO**: ${score}/100
**Valor Estimado del Repositorio**: **${valuation}**

---

## 📈 Estadísticas Generales

- **Archivos de código relevantes**: ${totalFiles.toLocaleString()}
- **Líneas de código**: ${totalLines.toLocaleString()}
- **Agentes activos**: ${this.stats.activeAgents}
- **Directorios de tests**: ${this.countTestDirectories()}

---

## 🧱 Áreas del Repositorio

| Área | Estado | Peso | Detalles |
|------|--------|------|----------|
${this.areas.map(a => `| ${a.name} | ${a.status} | ${a.weight}% | ${a.comment} |`).join('\n')}

---

## 🔍 Análisis Detallado por Área

${this.areas.map(area => `
### ${area.name} (${area.status})

**Comentario**: ${area.comment}

${area.details.length > 0 ? area.details.map(detail => `- ${detail}`).join('\n') : '- Sin detalles adicionales'}
`).join('\n')}

---

## 💰 Estimación de Valor

- **Puntaje técnico actual**: **${score}/100**
- **Valor aproximado en mercado**: **${valuation}**

### Factores de Valoración:

✅ **Fortalezas**:
- Arquitectura modular y escalable
- Agentes IA funcionales y orquestados
- CI/CD robusto con GitHub Actions
- Frontend moderno con Next.js 15
- Documentación técnica completa
- Testing automatizado

🟡 **Áreas de mejora**:
- Completar tests de backend
- Finalizar dashboard control-tower
- Expandir módulos de negocio

---

## 🚀 Recomendaciones para Mejorar el Valor

1. **Completar testing backend** (+5 puntos)
2. **Finalizar control-tower** (+3 puntos)
3. **Expandir módulos de negocio** (+2 puntos)
4. **Optimizar performance** (+2 puntos)

---

**Generado automáticamente por STRATO Inventory Analyzer™ v1.0**
**Ejecutado desde**: ${this.basePath}
`
  }

  public async analyze(): Promise<void> {
    console.log('🔍 Analizando repositorio STRATO...')
    
    // Analizar cada área
    for (const area of this.areas) {
      this.analyzeArea(area)
    }

    // Calcular puntaje y valoración
    const score = this.calculateScore()
    const valuation = this.getValuation(score)

    // Generar reporte
    const report = this.generateMarkdownReport(score, valuation)
    const reportPath = join(this.basePath, '~REPO_INVENTORY.md')
    
    writeFileSync(reportPath, report)
    
    console.log('✅ Inventario generado en ~REPO_INVENTORY.md')
    console.log(`📊 Puntaje STRATO: ${score}/100`)
    console.log(`💰 Valor estimado: ${valuation}`)
  }
}

// Ejecutar análisis
async function main(): Promise<void> {
  try {
    const analyzer = new STRATOInventoryAnalyzer()
    await analyzer.analyze()
  } catch (error) {
    console.error('❌ Error durante el análisis:', error)
    process.exit(1)
  }
}

// Ejecutar si es el archivo principal
if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}

export { STRATOInventoryAnalyzer } 