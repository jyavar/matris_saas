#!/usr/bin/env tsx

/**
 * @data Agent - Main Logic
 * 
 * Implements the core functionality of the data processing agent
 * Version: 2.0.0
 * Author: STRATO Core OS™
 */

import fs from 'fs'
import path from 'path'

import { DataConfigManager } from './config'
import { DataLogger } from './log'
import { type DataProcessingResult, DataProcessor } from './processor'

// Tipos estrictos sin any
export interface DataOptions {
  migrate?: boolean
  seed?: boolean
  validate?: boolean
  backup?: boolean
  analytics?: boolean
  verbose?: boolean
  dryRun?: boolean
  saveReport?: boolean
  exitOnFailure?: boolean
  enableAIInsights?: boolean
  backupPrevious?: boolean
  validateData?: boolean
  outputPath?: string
  environment?: string
}

export interface DataResult {
  success: boolean
  message: string
  data?: DataProcessingResult
  errors?: string[]
  warnings?: string[]
  insights?: Array<{ type: string; message: string; priority: 'high' | 'medium' | 'low' }>
  recommendations?: Array<{ action: string; impact: string; effort: 'low' | 'medium' | 'high' }>
  executionTime: number
  metadata: {
    version: string
    environment: string
    timestamp: string
    agentName: string
  }
}

export interface DataDeps {
  writeFileSync: (file: string, data: string) => void
  readFileSync: (file: string, encoding: BufferEncoding) => string
  existsSync: (file: string) => boolean
  mkdirSync: (dir: string, options?: { recursive: boolean }) => void
  copyFileSync: (src: string, dest: string) => void
}

// Configuración por defecto
const DEFAULT_OPTIONS: Required<DataOptions> = {
  migrate: true,
  seed: true,
  validate: true,
  backup: true,
  analytics: true,
  verbose: false,
  dryRun: false,
  saveReport: true,
  exitOnFailure: true,
  enableAIInsights: true,
  backupPrevious: true,
  validateData: true,
  outputPath: 'audit-artifacts/reports/data-report.json',
  environment: process.env.NODE_ENV || 'development',
}

// Validación de configuración
function validateOptions(options: Partial<DataOptions>): Required<DataOptions> {
  const validatedOptions = { ...DEFAULT_OPTIONS, ...options }
  
  if (typeof validatedOptions.migrate !== 'boolean') {
    throw new Error('migrate must be a boolean')
  }
  
  if (typeof validatedOptions.seed !== 'boolean') {
    throw new Error('seed must be a boolean')
  }
  
  if (typeof validatedOptions.validate !== 'boolean') {
    throw new Error('validate must be a boolean')
  }
  
  if (typeof validatedOptions.backup !== 'boolean') {
    throw new Error('backup must be a boolean')
  }
  
  if (typeof validatedOptions.analytics !== 'boolean') {
    throw new Error('analytics must be a boolean')
  }
  
  if (!validatedOptions.outputPath) {
    throw new Error('outputPath is required')
  }
  
  return validatedOptions
}

// Backup de reporte anterior
function backupPreviousReport(outputPath: string, deps: DataDeps): void {
  if (!deps.existsSync(outputPath)) {
    return
  }
  
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const backupPath = outputPath.replace('.json', `.backup-${timestamp}.json`)
    const content = deps.readFileSync(outputPath, 'utf8')
    
    // Crear directorio de backup si no existe
    const backupDir = path.dirname(backupPath)
    if (!deps.existsSync(backupDir)) {
      deps.mkdirSync(backupDir, { recursive: true })
    }
    
    deps.writeFileSync(backupPath, content)
    console.log(`[@data] Backup creado: ${backupPath}`)
  } catch (error) {
    console.warn(`[@data] Error al crear backup: ${error instanceof Error ? error.message : String(error)}`)
  }
}

// Análisis AI simulado para insights inteligentes
function generateAIInsights(result: DataProcessingResult): Array<{ type: string; message: string; priority: 'high' | 'medium' | 'low' }> {
  const insights: Array<{ type: string; message: string; priority: 'high' | 'medium' | 'low' }> = []
  
  // Análisis de operaciones
  const operations = result.operations
  
  if (operations.migration.status === 'FAILED') {
    insights.push({
      type: 'migration',
      message: 'Migración de base de datos falló. Revisar esquemas y dependencias.',
      priority: 'high',
    })
  }
  
  if (operations.seeding.status === 'FAILED') {
    insights.push({
      type: 'seeding',
      message: 'Seeding de datos falló. Verificar integridad de datos de entrada.',
      priority: 'high',
    })
  }
  
  if (operations.validation.status === 'FAILED') {
    insights.push({
      type: 'validation',
      message: 'Validación de datos falló. Revisar reglas de validación.',
      priority: 'high',
    })
  }
  
  if (operations.backup.status === 'FAILED') {
    insights.push({
      type: 'backup',
      message: 'Backup de datos falló. Verificar permisos y espacio en disco.',
      priority: 'medium',
    })
  }
  
  if (operations.analytics.status === 'FAILED') {
    insights.push({
      type: 'analytics',
      message: 'Procesamiento de analíticas falló. Revisar configuración de analytics.',
      priority: 'low',
    })
  }
  
  // Análisis de errores
  if (result.errors.length > 0) {
    insights.push({
      type: 'errors',
      message: `${result.errors.length} errores detectados durante el procesamiento.`,
      priority: 'high',
    })
  }
  
  // Análisis de warnings
  if (result.warnings.length > 0) {
    insights.push({
      type: 'warnings',
      message: `${result.warnings.length} advertencias detectadas. Revisar logs.`,
      priority: 'medium',
    })
  }
  
  return insights
}

// Generación de recomendaciones basadas en insights
function generateRecommendations(insights: Array<{ type: string; message: string; priority: 'high' | 'medium' | 'low' }>): Array<{ action: string; impact: string; effort: 'low' | 'medium' | 'high' }> {
  const recommendations: Array<{ action: string; impact: string; effort: 'low' | 'medium' | 'high' }> = []
  
  insights.forEach((insight) => {
    switch (insight.type) {
      case 'migration':
        recommendations.push({
          action: 'Revisar y corregir esquemas de migración',
          impact: 'Restaurar funcionalidad de base de datos',
          effort: 'high',
        })
        break
      case 'seeding':
        recommendations.push({
          action: 'Validar datos de entrada y corregir formatos',
          impact: 'Asegurar datos consistentes en el sistema',
          effort: 'medium',
        })
        break
      case 'validation':
        recommendations.push({
          action: 'Actualizar reglas de validación de datos',
          impact: 'Mejorar integridad y calidad de datos',
          effort: 'medium',
        })
        break
      case 'backup':
        recommendations.push({
          action: 'Verificar permisos y espacio en disco',
          impact: 'Restaurar funcionalidad de backup',
          effort: 'low',
        })
        break
      case 'errors':
        recommendations.push({
          action: 'Revisar logs detallados y corregir errores',
          impact: 'Eliminar fallos en el procesamiento',
          effort: 'high',
        })
        break
    }
  })
  
  return recommendations
}

export class DataAgent {
  private config: DataConfigManager
  private logger: DataLogger
  private processor: DataProcessor
  private options: Required<DataOptions>
  private deps: DataDeps

  constructor(options: Partial<DataOptions> = {}, deps: DataDeps = {
    writeFileSync: fs.writeFileSync,
    readFileSync: fs.readFileSync,
    existsSync: fs.existsSync,
    mkdirSync: fs.mkdirSync,
    copyFileSync: fs.copyFileSync,
  }) {
    this.options = validateOptions(options)
    this.deps = deps
    this.config = new DataConfigManager(this.options)
    this.logger = new DataLogger()
    this.processor = new DataProcessor()
  }

  async run(): Promise<DataResult> {
    const startTime = Date.now()
    
    try {
      this.logger.info('Starting @data agent execution')
      
      // Crear backup si está habilitado
      if (this.options.backupPrevious) {
        backupPreviousReport(this.options.outputPath, this.deps)
      }
      
      if (this.options.dryRun) {
        this.logger.info('Running in dry-run mode')
        const dryRunResult: DataResult = {
          success: true,
          message: 'Dry-run completed successfully',
          executionTime: Date.now() - startTime,
          metadata: {
            version: '2.0.0',
            environment: this.options.environment,
            timestamp: new Date().toISOString(),
            agentName: '@data',
          },
          data: {
            timestamp: new Date().toISOString(),
            status: 'SUCCESS',
            operations: {
              migration: { status: 'SKIPPED', message: 'Dry-run mode' },
              seeding: { status: 'SKIPPED', message: 'Dry-run mode' },
              validation: { status: 'SKIPPED', message: 'Dry-run mode' },
              backup: { status: 'SKIPPED', message: 'Dry-run mode' },
              analytics: { status: 'SKIPPED', message: 'Dry-run mode' }
            },
            summary: 'Dry-run completed',
            errors: [],
            warnings: []
          },
          insights: [],
          recommendations: [],
        }
        
        // Guardar reporte de dry-run
        if (this.options.saveReport) {
          this.saveReport(dryRunResult)
        }
        
        return dryRunResult
      }

      // Execute main logic
      const result = await this.executeMainLogic()
      
      // Generar insights AI si está habilitado
      const insights = this.options.enableAIInsights ? generateAIInsights(result) : []
      
      // Generar recomendaciones
      const recommendations = generateRecommendations(insights)
      
      // Crear resultado final
      const finalResult: DataResult = {
        success: result.status !== 'FAILED',
        message: result.summary,
        data: result,
        errors: result.errors,
        warnings: result.warnings,
        insights,
        recommendations,
        executionTime: Date.now() - startTime,
        metadata: {
          version: '2.0.0',
          environment: this.options.environment,
          timestamp: new Date().toISOString(),
          agentName: '@data',
        },
      }
      
      // Generate report
      if (this.options.saveReport) {
        this.saveReport(finalResult)
      }
      
      this.logger.info('@data agent completed successfully')
      console.log(`[@data] Tiempo de ejecución: ${finalResult.executionTime}ms`)
      console.log(`[@data] Insights generados: ${insights.length}`)
      console.log(`[@data] Recomendaciones: ${recommendations.length}`)
      
      return finalResult
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      this.logger.error('@data agent failed', error as Error)
      console.error(`[@data] Error: ${errorMessage}`)
      
      // Resultado de error
      const errorResult: DataResult = {
        success: false,
        message: errorMessage,
        errors: [errorMessage],
        warnings: [],
        insights: [],
        recommendations: [],
        executionTime: Date.now() - startTime,
        metadata: {
          version: '2.0.0',
          environment: this.options.environment,
          timestamp: new Date().toISOString(),
          agentName: '@data',
        },
      }
      
      // Guardar reporte de error
      if (this.options.saveReport) {
        this.saveReport(errorResult)
      }
      
      throw error
    }
  }

  private async executeMainLogic(): Promise<DataProcessingResult> {
    const config = this.config.getConfig()
    
    return await this.processor.processData({
      migrate: config.migrate,
      seed: config.seed,
      validate: config.validate,
      backup: config.backup,
      analytics: config.analytics
    })
  }
  
  private saveReport(result: DataResult): void {
    try {
      // Asegurar que el directorio existe
      const outputDir = path.dirname(this.options.outputPath)
      if (!this.deps.existsSync(outputDir)) {
        this.deps.mkdirSync(outputDir, { recursive: true })
      }
      
      // Guardar reporte
      this.deps.writeFileSync(this.options.outputPath, JSON.stringify(result, null, 2))
      console.log(`[@data] Reporte guardado en ${this.options.outputPath}`)
    } catch (error) {
      console.warn(`[@data] Error al guardar reporte: ${error instanceof Error ? error.message : String(error)}`)
    }
  }
}

// For orchestrator
export async function runAgent(options: Partial<DataOptions> = {}): Promise<DataResult> {
  const agent = new DataAgent(options)
  return await agent.run()
}

export default runAgent 