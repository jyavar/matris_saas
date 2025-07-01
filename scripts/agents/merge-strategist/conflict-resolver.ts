#!/usr/bin/env tsx

/**
 * @merge-strategist Agent - Automated Conflict Resolution
 * 
 * Handles automated merge conflict resolution including:
 * - Git merge conflict detection
 * - Automatic conflict resolution strategies
 * - Code review integration
 * - Merge strategy recommendations
 * - Conflict prevention analysis
 */

import { execSync } from 'child_process'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'

interface ConflictResolutionResult {
  timestamp: string
  status: 'RESOLVED' | 'FAILED' | 'MANUAL_REQUIRED' | 'NO_CONFLICTS'
  conflicts: ConflictInfo[]
  resolution: {
    strategy: string
    filesResolved: number
    filesManual: number
    totalFiles: number
  }
  summary: string
  recommendations: string[]
  errors: string[]
}

interface ConflictInfo {
  file: string
  status: 'RESOLVED' | 'MANUAL' | 'FAILED'
  strategy?: string
  lines?: number
  complexity?: 'LOW' | 'MEDIUM' | 'HIGH'
}

class MergeStrategist {
  private projectRoot: string
  private results: ConflictResolutionResult

  constructor() {
    this.projectRoot = process.cwd()
    this.results = {
      timestamp: new Date().toISOString(),
      status: 'NO_CONFLICTS',
      conflicts: [],
      resolution: {
        strategy: 'none',
        filesResolved: 0,
        filesManual: 0,
        totalFiles: 0
      },
      summary: '',
      recommendations: [],
      errors: []
    }
  }

  async resolveConflicts(options: {
    branch?: string
    strategy?: 'auto' | 'manual' | 'smart'
    dryRun?: boolean
  } = {}): Promise<ConflictResolutionResult> {
    console.log('🔀 @merge-strategist Agent - Starting Conflict Resolution...')
    
    try {
      // Check current git status
      const gitStatus = this.getGitStatus()
      
      if (!gitStatus.hasConflicts) {
        console.log('✅ No merge conflicts detected')
        this.results.status = 'NO_CONFLICTS'
        this.results.summary = 'No conflicts to resolve'
        return this.results
      }
      
      // Detect conflicts
      const conflicts = this.detectConflicts()
      this.results.conflicts = conflicts
      this.results.resolution.totalFiles = conflicts.length
      
      if (conflicts.length === 0) {
        this.results.status = 'NO_CONFLICTS'
        this.results.summary = 'No conflicts detected'
        return this.results
      }
      
      // Resolve conflicts based on strategy
      const strategy = options.strategy || 'smart'
      await this.resolveConflictsWithStrategy(conflicts, strategy, options.dryRun)
      
      // Generate summary
      this.generateSummary()
      
      // Save results
      this.saveResults()
      
      console.log('✅ @merge-strategist Agent - Conflict resolution completed')
      return this.results
      
    } catch (error) {
      console.error('❌ @merge-strategist Agent - Conflict resolution failed:', error)
      this.results.status = 'FAILED'
      this.results.errors.push(error instanceof Error ? error.message : 'Unknown error')
      return this.results
    }
  }

  private getGitStatus(): { hasConflicts: boolean; currentBranch: string; status: string } {
    try {
      const status = execSync('git status --porcelain', { 
        cwd: this.projectRoot, 
        encoding: 'utf8' 
      })
      
      const currentBranch = execSync('git branch --show-current', { 
        cwd: this.projectRoot, 
        encoding: 'utf8' 
      }).trim()
      
      const hasConflicts = status.includes('UU') || status.includes('AA') || status.includes('DD')
      
      return {
        hasConflicts,
        currentBranch,
        status
      }
    } catch (error) {
      throw new Error(`Failed to get git status: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  private detectConflicts(): ConflictInfo[] {
    const conflicts: ConflictInfo[] = []
    
    try {
      // Get list of conflicted files
      const conflictedFiles = execSync('git diff --name-only --diff-filter=U', { 
        cwd: this.projectRoot, 
        encoding: 'utf8' 
      }).split('\n').filter(Boolean)
      
      for (const file of conflictedFiles) {
        const conflictInfo = this.analyzeConflict(file)
        conflicts.push(conflictInfo)
      }
    } catch (error) {
      // If no conflicts, return empty array
      if (error instanceof Error && error.message.includes('no such path')) {
        return []
      }
      throw error
    }
    
    return conflicts
  }

  private analyzeConflict(file: string): ConflictInfo {
    try {
      const filePath = join(this.projectRoot, file)
      const content = readFileSync(filePath, 'utf8')
      
      // Count conflict markers
      const conflictMarkers = (content.match(/^<<<<<<<|^=======|^>>>>>>>/gm) || []).length
      const complexity = this.assessComplexity(content, conflictMarkers)
      
      return {
        file,
        status: 'MANUAL',
        complexity,
        lines: content.split('\n').length,
        strategy: this.recommendStrategy(file, complexity)
      }
    } catch (error) {
      return {
        file,
        status: 'FAILED',
        complexity: 'HIGH'
      }
    }
  }

  private assessComplexity(content: string, conflictMarkers: number): 'LOW' | 'MEDIUM' | 'HIGH' {
    const lines = content.split('\n').length
    const conflictBlocks = Math.floor(conflictMarkers / 3)
    
    if (conflictBlocks <= 1 && lines < 100) return 'LOW'
    if (conflictBlocks <= 3 && lines < 500) return 'MEDIUM'
    return 'HIGH'
  }

  private recommendStrategy(file: string, complexity: 'LOW' | 'MEDIUM' | 'HIGH'): string {
    const extension = file.split('.').pop()?.toLowerCase()
    
    // File type specific strategies
    if (extension === 'json') return 'json-merge'
    if (extension === 'lock') return 'keep-current'
    if (extension === 'md') return 'concatenate'
    if (extension === 'ts' || extension === 'js') return 'smart-merge'
    if (extension === 'css' || extension === 'scss') return 'concatenate'
    
    // Complexity based strategies
    if (complexity === 'LOW') return 'auto-resolve'
    if (complexity === 'MEDIUM') return 'smart-merge'
    return 'manual-review'
  }

  private async resolveConflictsWithStrategy(
    conflicts: ConflictInfo[], 
    strategy: string, 
    dryRun: boolean = false
  ): Promise<void> {
    let resolvedCount = 0
    let manualCount = 0
    
    for (const conflict of conflicts) {
      try {
        const resolutionStrategy = conflict.strategy || 'manual-review'
        
        if (dryRun) {
          // In dry run mode, just analyze without resolving
          conflict.status = 'MANUAL'
          manualCount++
          continue
        }
        
        switch (resolutionStrategy) {
          case 'auto-resolve':
            if (await this.autoResolve(conflict)) {
              conflict.status = 'RESOLVED'
              resolvedCount++
            } else {
              conflict.status = 'MANUAL'
              manualCount++
            }
            break
            
          case 'json-merge':
            if (await this.resolveJsonConflict(conflict)) {
              conflict.status = 'RESOLVED'
              resolvedCount++
            } else {
              conflict.status = 'MANUAL'
              manualCount++
            }
            break
            
          case 'keep-current':
            if (await this.keepCurrentVersion(conflict)) {
              conflict.status = 'RESOLVED'
              resolvedCount++
            } else {
              conflict.status = 'MANUAL'
              manualCount++
            }
            break
            
          case 'concatenate':
            if (await this.concatenateVersions(conflict)) {
              conflict.status = 'RESOLVED'
              resolvedCount++
            } else {
              conflict.status = 'MANUAL'
              manualCount++
            }
            break
            
          default:
            conflict.status = 'MANUAL'
            manualCount++
            break
        }
      } catch (error) {
        conflict.status = 'FAILED'
        this.results.errors.push(`Failed to resolve ${conflict.file}: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }
    
    this.results.resolution.filesResolved = resolvedCount
    this.results.resolution.filesManual = manualCount
    this.results.resolution.strategy = strategy
  }

  private async autoResolve(conflict: ConflictInfo): Promise<boolean> {
    try {
      const filePath = join(this.projectRoot, conflict.file)
      const content = readFileSync(filePath, 'utf8')
      
      // Simple auto-resolution: keep the first version in most cases
      const resolvedContent = content.replace(
        /<<<<<<< HEAD\n([\s\S]*?)\n=======\n([\s\S]*?)\n>>>>>>> [^\n]*\n/g,
        '$1'
      )
      
      if (resolvedContent !== content) {
        writeFileSync(filePath, resolvedContent)
        execSync(`git add "${conflict.file}"`, { cwd: this.projectRoot })
        return true
      }
      
      return false
    } catch {
      return false
    }
  }

  private async resolveJsonConflict(conflict: ConflictInfo): Promise<boolean> {
    try {
      const filePath = join(this.projectRoot, conflict.file)
      const content = readFileSync(filePath, 'utf8')
      
      // Extract JSON objects from conflict blocks
      const matches = content.match(/<<<<<<< HEAD\n([\s\S]*?)\n=======\n([\s\S]*?)\n>>>>>>> [^\n]*\n/g)
      
      if (!matches) return false
      
      let resolvedContent = content
      
      for (const match of matches) {
        const headMatch = match.match(/<<<<<<< HEAD\n([\s\S]*?)\n=======/)
        const incomingMatch = match.match(/=======\n([\s\S]*?)\n>>>>>>>/)
        
        if (headMatch && incomingMatch) {
          try {
            const headJson = JSON.parse(headMatch[1])
            const incomingJson = JSON.parse(incomingMatch[1])
            
            // Merge JSON objects
            const mergedJson = { ...headJson, ...incomingJson }
            const mergedString = JSON.stringify(mergedJson, null, 2)
            
            resolvedContent = resolvedContent.replace(match, mergedString)
          } catch {
            // If JSON parsing fails, keep current version
            resolvedContent = resolvedContent.replace(match, headMatch[1])
          }
        }
      }
      
      if (resolvedContent !== content) {
        writeFileSync(filePath, resolvedContent)
        execSync(`git add "${conflict.file}"`, { cwd: this.projectRoot })
        return true
      }
      
      return false
    } catch {
      return false
    }
  }

  private async keepCurrentVersion(conflict: ConflictInfo): Promise<boolean> {
    try {
      const filePath = join(this.projectRoot, conflict.file)
      const content = readFileSync(filePath, 'utf8')
      
      // Keep current version (HEAD)
      const resolvedContent = content.replace(
        /<<<<<<< HEAD\n([\s\S]*?)\n=======\n([\s\S]*?)\n>>>>>>> [^\n]*\n/g,
        '$1'
      )
      
      if (resolvedContent !== content) {
        writeFileSync(filePath, resolvedContent)
        execSync(`git add "${conflict.file}"`, { cwd: this.projectRoot })
        return true
      }
      
      return false
    } catch {
      return false
    }
  }

  private async concatenateVersions(conflict: ConflictInfo): Promise<boolean> {
    try {
      const filePath = join(this.projectRoot, conflict.file)
      const content = readFileSync(filePath, 'utf8')
      
      // Concatenate both versions
      const resolvedContent = content.replace(
        /<<<<<<< HEAD\n([\s\S]*?)\n=======\n([\s\S]*?)\n>>>>>>> [^\n]*\n/g,
        '$1\n$2'
      )
      
      if (resolvedContent !== content) {
        writeFileSync(filePath, resolvedContent)
        execSync(`git add "${conflict.file}"`, { cwd: this.projectRoot })
        return true
      }
      
      return false
    } catch {
      return false
    }
  }

  private generateSummary(): void {
    const conflicts = this.results.conflicts
    const resolved = conflicts.filter(c => c.status === 'RESOLVED').length
    const manual = conflicts.filter(c => c.status === 'MANUAL').length
    const failed = conflicts.filter(c => c.status === 'FAILED').length
    
    this.results.summary = `Conflict Resolution: ${resolved} resolved, ${manual} manual, ${failed} failed`
    
    // Determine overall status
    if (failed > 0) {
      this.results.status = 'FAILED'
    } else if (manual > 0) {
      this.results.status = 'MANUAL_REQUIRED'
    } else if (resolved > 0) {
      this.results.status = 'RESOLVED'
    } else {
      this.results.status = 'NO_CONFLICTS'
    }
    
    // Generate recommendations
    if (manual > 0) {
      this.results.recommendations.push('Review manually resolved conflicts before merging')
    }
    if (failed > 0) {
      this.results.recommendations.push('Fix failed conflict resolutions before proceeding')
    }
    if (conflicts.length > 5) {
      this.results.recommendations.push('Consider breaking this merge into smaller commits')
    }
  }

  private saveResults(): void {
    const resultsPath = join(this.projectRoot, 'audit-artifacts', 'merge-resolution.json')
    writeFileSync(resultsPath, JSON.stringify(this.results, null, 2))
    console.log(`📄 Merge resolution results saved to: ${resultsPath}`)
  }
}

// Main execution
async function main() {
  const strategist = new MergeStrategist()
  
  // Parse command line arguments
  const args = process.argv.slice(2)
  const options = {
    branch: args.find(arg => arg.startsWith('--branch='))?.split('=')[1],
    strategy: args.find(arg => arg.startsWith('--strategy='))?.split('=')[1] as 'auto' | 'manual' | 'smart',
    dryRun: args.includes('--dry-run') || args.includes('-d')
  }
  
  const results = await strategist.resolveConflicts(options)
  
  console.log('\n📋 Merge Conflict Resolution Summary:')
  console.log(`Status: ${results.status}`)
  console.log(`Summary: ${results.summary}`)
  console.log(`Files resolved: ${results.resolution.filesResolved}/${results.resolution.totalFiles}`)
  
  if (results.errors.length > 0) {
    console.log('\n❌ Errors:')
    results.errors.forEach((error, index) => {
      console.log(`${index + 1}. ${error}`)
    })
  }
  
  if (results.recommendations.length > 0) {
    console.log('\n💡 Recommendations:')
    results.recommendations.forEach((rec, index) => {
      console.log(`${index + 1}. ${rec}`)
    })
  }
  
  // Exit with appropriate code
  const exitCode = results.status === 'RESOLVED' || results.status === 'NO_CONFLICTS' ? 0 : 1
  process.exit(exitCode)
}

// Check if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error)
}

export { MergeStrategist } 