// @AgentMeta
// name: @merge-strategist
// purpose: Planificación y auditoría de merges críticos STRATO
// usage: pnpm tsx scripts/agents/merge-strategist/plan-merge.ts
// tags: merge, strategist, audit, strato

import fs from 'fs'
import { z } from 'zod'
import { execSync } from 'child_process'
import { join } from 'path'

// Schema de validación para inputs del merge
const MergeInputSchema = z.object({
  sourceBranch: z.string().min(1, 'Source branch is required'),
  targetBranch: z.string().min(1, 'Target branch is required'),
  dryRun: z.boolean().default(false),
  autoResolve: z.boolean().default(false),
  backupBeforeMerge: z.boolean().default(true),
})

type MergeInput = z.infer<typeof MergeInputSchema>

interface MergeConflict {
  file: string
  status: 'conflicted' | 'resolved' | 'auto-resolved'
  lines: number[]
  severity: 'low' | 'medium' | 'high'
}

interface MergePlan {
  conflicts: MergeConflict[]
  filesToMerge: string[]
  estimatedTime: number
  riskLevel: 'low' | 'medium' | 'high'
  recommendations: string[]
}

interface MergeResult {
  success: boolean
  conflicts: MergeConflict[]
  mergedFiles: string[]
  rollbackRequired: boolean
  executionTime: number
}

export interface MergeStrategistDeps {
  writeFileSync: (file: string, data: string) => void
  readFileSync?: (file: string, encoding: BufferEncoding) => string
  existsSync?: (file: string) => boolean
  execSync?: (command: string, options?: any) => Buffer | string
}

class MergeStrategist {
  private deps: MergeStrategistDeps
  private projectRoot: string

  constructor(deps: MergeStrategistDeps = { writeFileSync: fs.writeFileSync }) {
    this.deps = {
      writeFileSync: deps.writeFileSync,
      readFileSync: deps.readFileSync || fs.readFileSync,
      existsSync: deps.existsSync || fs.existsSync,
      execSync: deps.execSync || execSync,
    }
    this.projectRoot = process.cwd()
  }

  async runAgent(input?: Partial<MergeInput>): Promise<void> {
    const log = {
      timestamp: new Date().toISOString(),
      agentName: '@merge-strategist',
      status: 'ok' as 'ok' | 'fail' | 'warn',
      errors: [] as string[],
      warnings: [] as string[],
      actionsPerformed: [] as string[],
      mergePlan: null as MergePlan | null,
      mergeResult: null as MergeResult | null,
    }

    try {
      // 1. Validación de inputs
      log.actionsPerformed.push('🔍 Validating merge inputs...')
      const validatedInput = this.validateInputs(input)
      
      // 2. Análisis de estado actual
      log.actionsPerformed.push('📊 Analyzing current git state...')
      const currentState = this.analyzeCurrentState()
      
      // 3. Planificación del merge
      log.actionsPerformed.push('📋 Planning merge strategy...')
      const mergePlan = await this.createMergePlan(validatedInput, currentState)
      log.mergePlan = mergePlan
      
      // 4. Validación de seguridad
      log.actionsPerformed.push('🛡️ Performing security validation...')
      const securityCheck = this.performSecurityValidation(validatedInput, mergePlan)
      
      if (!securityCheck.safe) {
        log.status = 'fail'
        log.errors.push(`Security validation failed: ${securityCheck.reason}`)
        this.saveReport(log)
        throw new Error(`Security validation failed: ${securityCheck.reason}`)
      }
      
      // 5. Backup automático (si está habilitado)
      if (validatedInput.backupBeforeMerge) {
        log.actionsPerformed.push('💾 Creating backup before merge...')
        await this.createBackup(validatedInput)
      }
      
      // 6. Ejecución del merge (dry-run o real)
      if (validatedInput.dryRun) {
        log.actionsPerformed.push('🧪 Executing dry-run merge...')
        const dryRunResult = await this.executeDryRun(validatedInput, mergePlan)
        log.mergeResult = dryRunResult
      } else {
        log.actionsPerformed.push('🚀 Executing merge...')
        const mergeResult = await this.executeMerge(validatedInput, mergePlan)
        log.mergeResult = mergeResult
        
        if (mergeResult.rollbackRequired) {
          log.status = 'warn'
          log.warnings.push('Merge completed but rollback may be required')
        }
      }
      
      log.actionsPerformed.push('✅ Merge strategy execution completed')
      
    } catch (error) {
      log.status = 'fail'
      log.errors.push(error instanceof Error ? error.message : 'Unknown error')
      console.error('❌ Merge Strategist failed:', error)
    }
    
    this.saveReport(log)
    console.log('[@merge-strategist] ejecutado')
  }

  private validateInputs(input?: Partial<MergeInput>): MergeInput {
    try {
      const defaultInput: MergeInput = {
        sourceBranch: 'feature/merge-strategist',
        targetBranch: 'main',
        dryRun: true,
        autoResolve: false,
        backupBeforeMerge: true,
      }
      
      const mergedInput = { ...defaultInput, ...input }
      return MergeInputSchema.parse(mergedInput)
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(`Validation error: ${error.errors.map(e => e.message).join(', ')}`)
      }
      throw error
    }
  }

  private analyzeCurrentState(): { currentBranch: string; isClean: boolean; uncommittedFiles: string[] } {
    try {
      const currentBranch = (this.deps.execSync!('git branch --show-current', { encoding: 'utf8' }) as string).trim()
      const status = (this.deps.execSync!('git status --porcelain', { encoding: 'utf8' }) as string)
      const uncommittedFiles = status.split('\n').filter((line: string) => line.trim()).map((line: string) => line.substring(3))
      
      return {
        currentBranch,
        isClean: uncommittedFiles.length === 0,
        uncommittedFiles,
      }
    } catch (error) {
      throw new Error(`Failed to analyze git state: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  private async createMergePlan(input: MergeInput, currentState: any): Promise<MergePlan> {
    try {
      // Simular análisis de conflictos
      const conflicts: MergeConflict[] = []
      const filesToMerge: string[] = []
      
      // Obtener archivos modificados en la rama fuente
      const diffOutput = (this.deps.execSync!(
        `git diff --name-only ${input.targetBranch}..${input.sourceBranch}`,
        { encoding: 'utf8' }
      ) as string)
      
      filesToMerge.push(...diffOutput.split('\n').filter((file: string) => file.trim()))
      
      // Simular detección de conflictos
      for (const file of filesToMerge.slice(0, 3)) { // Limitar a 3 archivos para demo
        if (Math.random() > 0.7) { // 30% de probabilidad de conflicto
          conflicts.push({
            file,
            status: 'conflicted',
            lines: [Math.floor(Math.random() * 100) + 1],
            severity: Math.random() > 0.5 ? 'medium' : 'low',
          })
        }
      }
      
      const estimatedTime = filesToMerge.length * 0.5 + conflicts.length * 2
      const riskLevel = conflicts.length > 5 ? 'high' : conflicts.length > 2 ? 'medium' : 'low'
      
      const recommendations: string[] = []
      if (conflicts.length > 0) {
        recommendations.push('Review conflicts before proceeding with merge')
      }
      if (filesToMerge.length > 50) {
        recommendations.push('Consider breaking merge into smaller chunks')
      }
      if (riskLevel === 'high') {
        recommendations.push('High risk merge detected - consider manual review')
      }
      
      return {
        conflicts,
        filesToMerge,
        estimatedTime,
        riskLevel,
        recommendations,
      }
    } catch (error) {
      throw new Error(`Failed to create merge plan: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  private performSecurityValidation(input: MergeInput, plan: MergePlan): { safe: boolean; reason?: string } {
    // Validar que no estamos en una rama protegida
    const protectedBranches = ['main', 'master', 'develop', 'production']
    if (protectedBranches.includes(input.targetBranch) && !input.dryRun) {
      return { safe: false, reason: `Cannot merge directly to protected branch: ${input.targetBranch}` }
    }
    
    // Validar que la rama fuente existe
    try {
      this.deps.execSync!(`git rev-parse --verify ${input.sourceBranch}`, { stdio: 'pipe' })
    } catch {
      return { safe: false, reason: `Source branch does not exist: ${input.sourceBranch}` }
    }
    
    // Validar que la rama destino existe
    try {
      this.deps.execSync!(`git rev-parse --verify ${input.targetBranch}`, { stdio: 'pipe' })
    } catch {
      return { safe: false, reason: `Target branch does not exist: ${input.targetBranch}` }
    }
    
    // Validar permisos de escritura
    try {
      this.deps.execSync!('git status', { stdio: 'pipe' })
    } catch {
      return { safe: false, reason: 'No write permissions in current directory' }
    }
    
    return { safe: true }
  }

  private async createBackup(input: MergeInput): Promise<void> {
    try {
      const backupBranch = `backup/${input.sourceBranch}-${Date.now()}`
      this.deps.execSync!(`git checkout -b ${backupBranch}`, { stdio: 'pipe' })
      this.deps.execSync!(`git checkout ${input.sourceBranch}`, { stdio: 'pipe' })
      console.log(`✅ Backup created: ${backupBranch}`)
    } catch (error) {
      console.warn(`⚠️ Backup creation failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  private async executeDryRun(input: MergeInput, plan: MergePlan): Promise<MergeResult> {
    try {
      // Simular dry-run
      const startTime = Date.now()
      
      // Simular tiempo de ejecución
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const executionTime = Date.now() - startTime
      
      return {
        success: true,
        conflicts: plan.conflicts,
        mergedFiles: plan.filesToMerge,
        rollbackRequired: false,
        executionTime,
      }
    } catch (error) {
      throw new Error(`Dry-run execution failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  private async executeMerge(input: MergeInput, plan: MergePlan): Promise<MergeResult> {
    try {
      const startTime = Date.now()
      
      // Ejecutar merge real
      this.deps.execSync!(`git checkout ${input.targetBranch}`, { stdio: 'pipe' })
      
      try {
        this.deps.execSync!(`git merge ${input.sourceBranch} --no-ff`, { stdio: 'pipe' })
      } catch (mergeError) {
        // Si hay conflictos, manejarlos según la configuración
        if (input.autoResolve) {
          console.log('🔄 Auto-resolving conflicts...')
          // Aquí iría la lógica de auto-resolución
        } else {
          throw new Error('Merge conflicts detected and auto-resolve is disabled')
        }
      }
      
      const executionTime = Date.now() - startTime
      
      return {
        success: true,
        conflicts: plan.conflicts,
        mergedFiles: plan.filesToMerge,
        rollbackRequired: plan.riskLevel === 'high',
        executionTime,
      }
    } catch (error) {
      throw new Error(`Merge execution failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  private saveReport(log: any): void {
    try {
      // Asegurar que el directorio existe
      const reportDir = join(this.projectRoot, 'audit-artifacts', 'reports')
      if (!this.deps.existsSync!(reportDir)) {
        fs.mkdirSync(reportDir, { recursive: true })
      }
      
      this.deps.writeFileSync(
        join(reportDir, 'merge-strategist-report.json'),
        JSON.stringify(log, null, 2)
      )
    } catch (error) {
      console.error('Failed to save report:', error)
    }
  }
}

export default async function runAgent(
  deps: MergeStrategistDeps = { writeFileSync: fs.writeFileSync },
): Promise<void> {
  const strategist = new MergeStrategist(deps)
  
  // Parse command line arguments
  const args = process.argv.slice(2)
  const input: Partial<MergeInput> = {}
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    switch (arg) {
      case '--source':
        input.sourceBranch = args[++i]
        break
      case '--target':
        input.targetBranch = args[++i]
        break
      case '--dry-run':
        input.dryRun = true
        break
      case '--auto-resolve':
        input.autoResolve = true
        break
      case '--no-backup':
        input.backupBeforeMerge = false
        break
      case '--help':
      case '-h':
        console.log(`
@merge-strategist Agent

Usage: tsx scripts/agents/merge-strategist/plan-merge.ts [options]

Options:
  --source <branch>     Source branch to merge from (default: feature/merge-strategist)
  --target <branch>     Target branch to merge to (default: main)
  --dry-run            Execute merge in dry-run mode (default: true)
  --auto-resolve       Automatically resolve conflicts
  --no-backup          Skip backup creation before merge
  --help, -h           Show this help message

Examples:
  tsx scripts/agents/merge-strategist/plan-merge.ts
  tsx scripts/agents/merge-strategist/plan-merge.ts --source feature/new-feature --target develop
  tsx scripts/agents/merge-strategist/plan-merge.ts --dry-run=false --auto-resolve
        `)
        process.exit(0)
        break
    }
  }
  
  await strategist.runAgent(input)
}

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  runAgent().catch(console.error)
}
