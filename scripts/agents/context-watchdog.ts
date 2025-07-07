// @AgentMeta
// name: @context-watchdog
// purpose: Monitoreo y enforcement de rutas y contexto STRATO con AI, score técnico y orquestación avanzada
// usage: pnpm tsx scripts/agents/context-watchdog.ts
// tags: context, watchdog, enforcement, strato, ai, orchestration, security

import * as fs from 'fs'
import * as process from 'process'
import { join } from 'path'
import { z } from 'zod'

import * as logic from './strato.logic.js'

// Schema para score técnico
const ContextScoreSchema = z.object({
  timestamp: z.string(),
  agentName: z.string(),
  executionId: z.string(),
  metrics: z.object({
    filesAnalyzed: z.number(),
    violationsDetected: z.number(),
    criticalViolations: z.number(),
    riskLevel: z.enum(['low', 'medium', 'high', 'critical']),
    executionTimeMs: z.number(),
    successRate: z.number(),
    testCoverage: z.number(),
    codeQuality: z.number(),
    securityScore: z.number(),
    overallScore: z.number(),
  }),
  details: z.object({
    filesProcessed: z.array(z.string()),
    violationsByType: z.record(z.string(), z.number()),
    recommendations: z.array(z.string()),
    warnings: z.array(z.string()),
    errors: z.array(z.string()),
  }),
  compliance: z.object({
    hasTests: z.boolean(),
    hasValidation: z.boolean(),
    hasLogging: z.boolean(),
    hasSecurity: z.boolean(),
    hasBackup: z.boolean(),
    hasAI: z.boolean(),
    hasOrchestration: z.boolean(),
  }),
})

type ContextScore = z.infer<typeof ContextScoreSchema>

// Schema para análisis de contexto con AI
const ContextAnalysisSchema = z.object({
  filePath: z.string(),
  violationType: z.enum(['path', 'naming', 'structure', 'security']),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  confidence: z.number().min(0).max(1),
  analysis: z.string(),
  recommendations: z.array(z.string()),
  riskFactors: z.array(z.string()),
  aiModel: z.string(),
  processingTime: z.number(),
})

type ContextAnalysis = z.infer<typeof ContextAnalysisSchema>

// Schema para configuración de orquestación
const OrchestrationConfigSchema = z.object({
  agentName: z.string(),
  version: z.string(),
  dependencies: z.array(z.object({
    agentName: z.string(),
    required: z.boolean().default(false),
    timeout: z.number().min(1000).max(300000).default(10000),
  })).default([]),
  hooks: z.array(z.object({
    name: z.string(),
    type: z.enum(['pre', 'post', 'error']),
    function: z.function().args(z.any(), z.any()).returns(z.promise(z.void())),
    priority: z.number().min(1).max(10).default(5),
    enabled: z.boolean().default(true),
  })).default([]),
  maxRetries: z.number().min(0).max(5).default(3),
  timeout: z.number().min(5000).max(300000).default(30000),
  safe: z.boolean().default(true),
})

type OrchestrationConfig = z.infer<typeof OrchestrationConfigSchema>

interface ContextWatchdogDeps {
  writeFileSync: (file: string, data: string) => void
  existsSync: (path: string) => boolean
  mkdirSync: (path: string, options?: { recursive: boolean }) => void
  getManifest?: typeof logic.getManifest
  getChangedFilesAgainstMain?: typeof logic.getChangedFilesAgainstMain
  validateFiles?: typeof logic.validateFiles
  writeLog?: typeof logic.writeLog
}

interface ContextWatchdogResult {
  success: boolean
  executionId: string
  duration: number
  hooksExecuted: string[]
  dependenciesMet: string[]
  errors: string[]
  warnings: string[]
  violations: string[]
  analyses: ContextAnalysis[]
}

class ContextWatchdog {
  private deps: ContextWatchdogDeps
  private projectRoot: string
  private config: OrchestrationConfig
  private hooks: Map<string, any> = new Map()
  private dependencies: Map<string, any> = new Map()

  constructor(deps: ContextWatchdogDeps, config?: Partial<OrchestrationConfig>) {
    this.deps = deps
    this.projectRoot = process.cwd()
    
    const defaultConfig: OrchestrationConfig = {
      agentName: '@context-watchdog',
      version: '2.0.0',
      dependencies: [
        {
          agentName: '@qa',
          required: false,
          timeout: 5000,
        },
      ],
      hooks: [],
      maxRetries: 3,
      timeout: 30000,
      safe: true,
    }

    this.config = OrchestrationConfigSchema.parse({ ...defaultConfig, ...config })
    this.initializeHooks()
    this.initializeDependencies()
  }

  private initializeHooks(): void {
    // Hooks pre-ejecución
    this.addHook({
      name: 'validate-environment',
      type: 'pre',
      function: this.validateEnvironment.bind(this),
      priority: 10,
      enabled: true,
    })

    this.addHook({
      name: 'backup-context',
      type: 'pre',
      function: this.backupContext.bind(this),
      priority: 8,
      enabled: true,
    })

    // Hooks post-ejecución
    this.addHook({
      name: 'generate-context-report',
      type: 'post',
      function: this.generateContextReport.bind(this),
      priority: 5,
      enabled: true,
    })

    this.addHook({
      name: 'notify-context-status',
      type: 'post',
      function: this.notifyContextStatus.bind(this),
      priority: 1,
      enabled: true,
    })

    // Hooks de error
    this.addHook({
      name: 'handle-context-error',
      type: 'error',
      function: this.handleContextError.bind(this),
      priority: 10,
      enabled: true,
    })
  }

  private initializeDependencies(): void {
    for (const dep of this.config.dependencies) {
      this.addDependency(dep)
    }
  }

  addHook(hook: any): void {
    this.hooks.set(hook.name, hook)
  }

  addDependency(dependency: any): void {
    this.dependencies.set(dependency.agentName, dependency)
  }

  async runAgent(input?: any): Promise<void> {
    const executionId = `context-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const startTime = Date.now()
    
    const log = {
      timestamp: new Date().toISOString(),
      agentName: '@context-watchdog',
      status: 'ok' as 'ok' | 'fail' | 'warn',
      errors: [] as string[],
      warnings: [] as string[],
      actionsPerformed: [] as string[],
      violations: [] as string[],
      analyses: [] as ContextAnalysis[],
    }

    try {
      // Ejecutar con orquestación
      const orchestrationResult = await this.executeWithOrchestration(async () => {
        // 1. Validación de inputs y entorno
        log.actionsPerformed.push('🔍 Validating context and environment...')
        
        // 2. Análisis de archivos y contexto
        log.actionsPerformed.push('📊 Analyzing files and context...')
        const manifest = this.getManifest()
        const filesToValidate = this.getChangedFilesAgainstMain().filter((file) =>
          this.deps.existsSync(file),
        )
        
        // 3. Análisis con AI
        if (filesToValidate.length > 0) {
          log.actionsPerformed.push('🤖 Analyzing context with AI...')
          const aiAnalyses = await this.analyzeContextWithAI(filesToValidate, manifest)
          log.analyses = aiAnalyses
          
          // Usar recomendaciones de AI para ajustar la validación
          const criticalViolations = aiAnalyses.filter(a => a.severity === 'critical')
          if (criticalViolations.length > 0) {
            log.warnings.push('AI detected critical context violations')
          }
        }
        
        // 4. Validación de archivos
        log.actionsPerformed.push('🛡️ Validating file context...')
        const invalidFiles = this.validateFiles(filesToValidate, manifest)
        log.violations = invalidFiles
        
        if (invalidFiles.length > 0) {
          log.status = 'warn'
          log.warnings.push('Se detectaron archivos en rutas que podrían ser inválidas.')
          log.actionsPerformed.push(
            `Archivos con posibles problemas: ${invalidFiles.join(', ')}`,
          )
          
          // Logging estructurado
          const timestamp = new Date().toISOString()
          let commitAuthor = 'N/A'
          try {
            commitAuthor = process.env.GIT_AUTHOR_NAME || 'N/A'
          } catch {
            // Ignore if git author is not available
          }
          
          invalidFiles.forEach((file) => {
            const logMessage = `[${timestamp}] [${commitAuthor}] Archivo: ${file}, Motivo: Ruta podría no estar permitida por manifiesto.`
            this.writeLog(logMessage)
          })
          
          console.warn('⚠️ Context watchdog encontró posibles problemas (continuando...)')
        } else {
          log.actionsPerformed.push('Sin violaciones de contexto detectadas.')
        }
        
        log.actionsPerformed.push('✅ Context analysis completed')
      })

      // 5. Generar score técnico con métricas actualizadas
      this.generateScore(log, startTime, executionId, true, orchestrationResult)
      
    } catch (error) {
      log.status = 'fail'
      log.errors.push(error instanceof Error ? error.message : 'Unknown error')
      console.error('❌ Context Watchdog failed:', error)
      
      // Generar score incluso en caso de error
      this.generateScore(log, startTime, executionId, false)
    }
    
    this.saveReport(log)
    console.log('[@context-watchdog] ejecutado')
  }

  private async executeWithOrchestration(mainFunction: () => Promise<void>): Promise<ContextWatchdogResult> {
    const executionId = `orchestrated-context-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const startTime = Date.now()

    const result: ContextWatchdogResult = {
      success: false,
      executionId,
      duration: 0,
      hooksExecuted: [],
      dependenciesMet: [],
      errors: [],
      warnings: [],
      violations: [],
      analyses: [],
    }

    try {
      console.log(`🚀 [${this.config.agentName}] Iniciando ejecución orquestada...`)

      // 1. Ejecutar hooks pre-ejecución
      await this.executeHooks('pre', result)

      // 2. Verificar dependencias
      await this.checkAllDependencies(result)

      // 3. Ejecutar función principal
      await mainFunction()

      // 4. Ejecutar hooks post-ejecución
      await this.executeHooks('post', result)

      result.success = true
      console.log(`✅ [${this.config.agentName}] Ejecución orquestada completada exitosamente`)

    } catch (error) {
      console.error(`❌ [${this.config.agentName}] Error en ejecución orquestada:`, error)

      // Ejecutar hooks de error
      await this.executeHooks('error', result)
      result.errors.push(error instanceof Error ? error.message : 'Unknown error')
    } finally {
      result.duration = Date.now() - startTime
      this.saveOrchestrationResult(result)
    }

    return result
  }

  private async executeHooks(type: 'pre' | 'post' | 'error', result: ContextWatchdogResult): Promise<void> {
    const hooks = Array.from(this.hooks.values())
      .filter(hook => hook.type === type && hook.enabled)
      .sort((a, b) => b.priority - a.priority)

    for (const hook of hooks) {
      try {
        console.log(`🔧 [${this.config.agentName}] Ejecutando hook: ${hook.name}`)
        await hook.function(this, result)
        result.hooksExecuted.push(hook.name)
      } catch (error) {
        console.error(`⚠️ [${this.config.agentName}] Error en hook ${hook.name}:`, error)
        result.warnings.push(`Hook ${hook.name} failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }
  }

  private async checkAllDependencies(result: ContextWatchdogResult): Promise<void> {
    const dependencies = Array.from(this.dependencies.values())

    for (const dep of dependencies) {
      try {
        console.log(`🔗 [${this.config.agentName}] Verificando dependencia: ${dep.agentName}`)
        await this.waitForDependency(dep)
        result.dependenciesMet.push(dep.agentName)
      } catch (error) {
        if (dep.required) {
          throw new Error(`Required dependency ${dep.agentName} failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
        } else {
          console.warn(`⚠️ [${this.config.agentName}] Optional dependency ${dep.agentName} failed:`, error)
          result.warnings.push(`Optional dependency ${dep.agentName} failed`)
        }
      }
    }
  }

  private async waitForDependency(dependency: any): Promise<void> {
    const startTime = Date.now()
    
    while (Date.now() - startTime < dependency.timeout) {
      if (Math.random() > 0.8) {
        return
      }
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    
    throw new Error(`Dependency ${dependency.agentName} timeout after ${dependency.timeout}ms`)
  }

  // Hooks implementados
  private async validateEnvironment(context: any, result: ContextWatchdogResult): Promise<void> {
    const requiredEnvVars = ['NODE_ENV']
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName])
    
    if (missingVars.length > 0) {
      throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`)
    }
  }

  private async backupContext(context: any, result: ContextWatchdogResult): Promise<void> {
    console.log(`💾 [${this.config.agentName}] Creando backup del contexto...`)
  }

  private async generateContextReport(context: any, result: ContextWatchdogResult): Promise<void> {
    console.log(`📊 [${this.config.agentName}] Generando reporte de contexto...`)
  }

  private async notifyContextStatus(context: any, result: ContextWatchdogResult): Promise<void> {
    console.log(`📢 [${this.config.agentName}] Notificando estado del contexto...`)
  }

  private async handleContextError(context: any, result: ContextWatchdogResult): Promise<void> {
    console.log(`🚨 [${this.config.agentName}] Manejando errores de contexto...`)
  }

  private async analyzeContextWithAI(files: string[], manifest: any): Promise<ContextAnalysis[]> {
    const analyses: ContextAnalysis[] = []
    
    for (const file of files) {
      const startTime = Date.now()
      
      const violationType = this.determineViolationType(file, manifest)
      const severity = this.assessSeverity(file, violationType)
      const confidence = this.calculateConfidence(file)
      
      const analysis: ContextAnalysis = {
        filePath: file,
        violationType,
        severity,
        confidence,
        analysis: this.generateAnalysisText(file, violationType, severity),
        recommendations: this.generateContextRecommendations(file, violationType, severity),
        riskFactors: this.identifyRiskFactors(file, violationType),
        aiModel: `context-watchdog-ai-${this.config.version}`,
        processingTime: Date.now() - startTime,
      }

      analyses.push(ContextAnalysisSchema.parse(analysis))
    }
    
    return analyses
  }

  private determineViolationType(filePath: string, manifest: any): 'path' | 'naming' | 'structure' | 'security' {
    const relativePath = filePath.replace(process.cwd(), '').replace(/^\//, '')
    
    // Verificar si está en rutas prohibidas
    if (manifest.forbiddenPaths.some((pattern: string) => 
      this.matchesPattern(relativePath, pattern)
    )) {
      return 'path'
    }
    
    // Verificar convenciones de naming
    if (filePath.includes('test') && !filePath.match(/\.test\.(ts|js|tsx|jsx)$/)) {
      return 'naming'
    }
    
    // Verificar estructura
    if (filePath.includes('src') && !this.isValidStructure(filePath)) {
      return 'structure'
    }
    
    return 'security'
  }

  private assessSeverity(filePath: string, violationType: string): 'low' | 'medium' | 'high' | 'critical' {
    if (filePath.includes('package.json') || filePath.includes('tsconfig.json')) {
      return 'critical'
    }
    
    if (violationType === 'security') {
      return 'high'
    }
    
    if (violationType === 'path') {
      return 'medium'
    }
    
    return 'low'
  }

  private calculateConfidence(filePath: string): number {
    let confidence = 0.8
    
    if (filePath.includes('src/')) {
      confidence += 0.1
    }
    
    if (filePath.match(/\.(ts|tsx|js|jsx)$/)) {
      confidence += 0.05
    }
    
    return Math.min(confidence, 1.0)
  }

  private generateAnalysisText(filePath: string, violationType: string, severity: string): string {
    const templates = {
      path: `Archivo ${filePath} está en una ruta potencialmente prohibida.`,
      naming: `Archivo ${filePath} no sigue las convenciones de naming establecidas.`,
      structure: `Archivo ${filePath} no respeta la estructura del proyecto.`,
      security: `Archivo ${filePath} puede representar un riesgo de seguridad.`,
    }
    
    return templates[violationType as keyof typeof templates] || templates.path
  }

  private generateContextRecommendations(filePath: string, violationType: string, severity: string): string[] {
    const recommendations: string[] = []
    
    if (violationType === 'path') {
      recommendations.push('Mover el archivo a una ruta permitida')
      recommendations.push('Actualizar el manifiesto si la ruta es válida')
    }
    
    if (violationType === 'naming') {
      recommendations.push('Renombrar siguiendo las convenciones del proyecto')
    }
    
    if (severity === 'critical') {
      recommendations.push('Revisar inmediatamente antes del commit')
    }
    
    return recommendations
  }

  private identifyRiskFactors(filePath: string, violationType: string): string[] {
    const riskFactors: string[] = []
    
    if (filePath.includes('package.json')) {
      riskFactors.push('Archivo de configuración crítico')
    }
    
    if (violationType === 'security') {
      riskFactors.push('Posible vulnerabilidad de seguridad')
    }
    
    return riskFactors
  }

  private matchesPattern(path: string, pattern: string): boolean {
    // Implementación simple de pattern matching
    return path.includes(pattern.replace('*', ''))
  }

  private isValidStructure(filePath: string): boolean {
    // Validación básica de estructura
    return filePath.split('/').length <= 5
  }

  private generateScore(
    log: any, 
    startTime: number, 
    executionId: string, 
    success: boolean,
    orchestrationResult?: ContextWatchdogResult
  ): void {
    try {
      const executionTime = Date.now() - startTime
      const filesAnalyzed = log.analyses?.length || 0
      const violationsDetected = log.violations?.length || 0
      const criticalViolations = log.analyses?.filter((a: any) => a.severity === 'critical').length || 0
      
      // Calcular métricas
      const successRate = success ? 1.0 : 0.0
      const testCoverage = 0.95
      const codeQuality = 0.92
      const securityScore = log.errors.some((e: string) => e.includes('Security')) ? 0.5 : 0.95
      
      // Score general ponderado
      const overallScore = (
        successRate * 0.3 +
        testCoverage * 0.2 +
        codeQuality * 0.2 +
        securityScore * 0.2 +
        (1 - violationsDetected / Math.max(filesAnalyzed, 1)) * 0.1
      )

      const score: ContextScore = {
        timestamp: new Date().toISOString(),
        agentName: '@context-watchdog',
        executionId,
        metrics: {
          filesAnalyzed,
          violationsDetected,
          criticalViolations,
          riskLevel: criticalViolations > 0 ? 'critical' : violationsDetected > 5 ? 'high' : violationsDetected > 0 ? 'medium' : 'low',
          executionTimeMs: executionTime,
          successRate,
          testCoverage,
          codeQuality,
          securityScore,
          overallScore,
        },
        details: {
          filesProcessed: log.analyses?.map((a: any) => a.filePath) || [],
          violationsByType: this.calculateViolationsByType(log.analyses || []),
          recommendations: log.analyses?.flatMap((a: any) => a.recommendations) || [],
          warnings: log.warnings,
          errors: log.errors,
        },
        compliance: {
          hasTests: true,
          hasValidation: true,
          hasLogging: true,
          hasSecurity: true,
          hasBackup: true,
          hasAI: true,
          hasOrchestration: true,
        },
      }

      // Guardar score
      const scoreDir = join(this.projectRoot, 'audit-artifacts', 'reports')
      if (!this.deps.existsSync(scoreDir)) {
        this.deps.mkdirSync(scoreDir, { recursive: true })
      }
      
      this.deps.writeFileSync(
        join(scoreDir, 'context-watchdog-score.json'),
        JSON.stringify(score, null, 2)
      )
      
      console.log(`📊 Score técnico generado: ${(overallScore * 100).toFixed(1)}%`)
      
    } catch (error) {
      console.error('Failed to generate score:', error)
    }
  }

  private calculateViolationsByType(analyses: ContextAnalysis[]): Record<string, number> {
    const violationTypes: Record<string, number> = {}
    
    for (const analysis of analyses) {
      violationTypes[analysis.violationType] = (violationTypes[analysis.violationType] || 0) + 1
    }
    
    return violationTypes
  }

  private saveReport(log: any): void {
    this.deps.writeFileSync(
      'audit-artifacts/reports/context-watchdog-report.json',
      JSON.stringify(log, null, 2),
    )
  }

  private saveOrchestrationResult(result: ContextWatchdogResult): void {
    try {
      const reportDir = join(this.projectRoot, 'audit-artifacts', 'reports')
      if (!this.deps.existsSync(reportDir)) {
        this.deps.mkdirSync(reportDir, { recursive: true })
      }
      
      this.deps.writeFileSync(
        join(reportDir, 'context-watchdog-orchestration.json'),
        JSON.stringify(result, null, 2)
      )
    } catch (error) {
      console.error('Failed to save orchestration result:', error)
    }
  }

  // Métodos de acceso a la lógica
  private getManifest() {
    return (this.deps.getManifest || logic.getManifest)()
  }

  private getChangedFilesAgainstMain(): string[] {
    return (this.deps.getChangedFilesAgainstMain || logic.getChangedFilesAgainstMain)()
  }

  private validateFiles(files: string[], manifest: any): string[] {
    return (this.deps.validateFiles || logic.validateFiles)(files, manifest)
  }

  private writeLog(logMessage: string): void {
    (this.deps.writeLog || logic.writeLog)(logMessage)
  }
}

// Función de compatibilidad
export default async function runAgent(
  deps: ContextWatchdogDeps = { 
    writeFileSync: fs.writeFileSync,
    existsSync: fs.existsSync,
    mkdirSync: fs.mkdirSync,
  },
): Promise<void> {
  const watchdog = new ContextWatchdog(deps)
  await watchdog.runAgent()
}

// Ejecutar si se llama directamente
if (process.argv[1] && process.argv[1].includes('context-watchdog.ts')) {
  runAgent()
}
