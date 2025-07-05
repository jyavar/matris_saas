#!/usr/bin/env tsx

/**
 * @data Agent - Report Generator
 */

import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'
import { DataProcessingResult } from './processor'

export interface DataReport {
  agent: string
  timestamp: string
  status: 'success' | 'warning' | 'error'
  summary: string
  details: DataProcessingResult
  recommendations: string[]
  duration: number
  metadata: {
    version: string
    environment: string
    operations: {
      migration: boolean
      seeding: boolean
      validation: boolean
      backup: boolean
      analytics: boolean
    }
  }
}

export async function generateReport(
  result: DataProcessingResult,
  options: { 
    outputDir?: string
    duration?: number
    metadata?: Record<string, unknown>
  } = {}
): Promise<void> {
  const report: DataReport = {
    agent: '@data',
    timestamp: new Date().toISOString(),
    status: result.status === 'SUCCESS' ? 'success' : 
           result.status === 'PARTIAL' ? 'warning' : 'error',
    summary: result.summary,
    details: result,
    recommendations: generateRecommendations(result),
    duration: options.duration || 0,
    metadata: {
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      operations: {
        migration: result.operations.migration.status !== 'SKIPPED',
        seeding: result.operations.seeding.status !== 'SKIPPED',
        validation: result.operations.validation.status !== 'SKIPPED',
        backup: result.operations.backup.status !== 'SKIPPED',
        analytics: result.operations.analytics.status !== 'SKIPPED'
      },
      ...options.metadata
    }
  }

  const outputDir = options.outputDir || 'audit-artifacts/reports'
  
  // Ensure directory exists
  try {
    mkdirSync(outputDir, { recursive: true })
  } catch (error) {
    // Directory might already exist, continue
  }
  
  const reportPath = join(outputDir, 'data-report.json')
  
  writeFileSync(reportPath, JSON.stringify(report, null, 2))
  
  console.log(`📊 @data report generated: ${reportPath}`)
}

function generateRecommendations(result: DataProcessingResult): string[] {
  const recommendations: string[] = []

  // Check for failed operations
  Object.entries(result.operations).forEach(([operation, opResult]) => {
    if (opResult.status === 'FAILED') {
      recommendations.push(`Review and fix ${operation} operation`)
    }
  })

  // Check for warnings
  if (result.warnings.length > 0) {
    recommendations.push('Address warnings to improve data quality')
  }

  // Check for skipped operations
  const skippedOperations = Object.entries(result.operations)
    .filter(([, opResult]) => opResult.status === 'SKIPPED')
    .map(([operation]) => operation)

  if (skippedOperations.length > 0) {
    recommendations.push(`Consider running skipped operations: ${skippedOperations.join(', ')}`)
  }

  // General recommendations based on status
  if (result.status === 'SUCCESS') {
    recommendations.push('All data operations completed successfully')
  } else if (result.status === 'PARTIAL') {
    recommendations.push('Some operations failed - review logs for details')
  } else {
    recommendations.push('Critical failures detected - immediate attention required')
  }

  return recommendations
} 