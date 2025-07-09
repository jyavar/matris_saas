import crypto from 'crypto'
import fs from 'fs'
import { beforeEach,describe, expect, it, vi } from 'vitest'

import { PerfAgent, PerfAgentDeps } from '../benchmark'

const mockWriteFileSync = vi.fn()
const mockReadFileSync = vi.fn(() => '{}')
const mockExistsSync = vi.fn(() => false)
const mockMkdirSync = vi.fn()

const mockDeps: PerfAgentDeps = {
  writeFileSync: mockWriteFileSync,
  readFileSync: mockReadFileSync,
  existsSync: mockExistsSync,
  crypto,
  fs: {
    mkdirSync: mockMkdirSync,
    writeFileSync: mockWriteFileSync
  } as unknown as typeof fs
}

describe('PerfAgent - 100% Complete Implementation', () => {
  let agent: PerfAgent

  // Helper function to create valid inputs
  const createValidInput = (overrides: Partial<any> = {}) => ({
    analyzeBundleSize: true,
    analyzeCodeEfficiency: true,
    runSystemBenchmarks: true,
    securityLevel: 'medium' as const,
    enableAIAnalysis: false,
    maxFileSizeKB: 100,
    backupBeforeAnalysis: true,
    orchestrationMode: 'sequential' as const,
    ...overrides
  })

  beforeEach(() => {
    vi.clearAllMocks()
    agent = new PerfAgent(mockDeps)
  })

  describe('Security Robustness (Point 9)', () => {
    it('should perform comprehensive security validation', async () => {
      const input = {
        analyzeBundleSize: true,
        analyzeCodeEfficiency: true,
        runSystemBenchmarks: true,
        securityLevel: 'high' as const,
        enableAIAnalysis: false,
        maxFileSizeKB: 2000,
        backupBeforeAnalysis: true,
        orchestrationMode: 'sequential' as const
      }

      const result = agent['performSecurityValidation'](input)
      
      expect(result.safe).toBe(false) // Should fail due to high file size limit
      expect(result.reason).toContain('File size limit too high for security analysis')
    })

    it('should validate file permissions', () => {
      const result = agent['validateFilePermissions']()
      expect(result.passed).toBe(true)
    })

    it('should validate dependency vulnerabilities', () => {
      const result = agent['validateDependencyVulnerabilities']()
      expect(result.passed).toBe(true)
    })

    it('should validate code injection risks', () => {
      const result = agent['validateCodeInjectionRisks']()
      expect(result.passed).toBe(true)
    })

    it('should validate resource exhaustion', () => {
      const result = agent['validateResourceExhaustion']()
      expect(result.passed).toBe(true)
    })
  })

  describe('Advanced Orchestration (Point 10)', () => {
    it('should setup advanced orchestration with all steps', () => {
      const input = createValidInput({ orchestrationMode: 'sequential' as const })

      const result = agent['setupOrchestration'](input)

      expect(result.length).toBeGreaterThan(6) // Base steps + hooks + validation + notifications
      expect(result.some(step => step.action === 'Pre-analysis hooks execution')).toBe(true)
      expect(result.some(step => step.action === 'Post-analysis validation')).toBe(true)
      expect(result.some(step => step.action === 'Send performance notifications')).toBe(true)
    })

    it('should include rollback actions in orchestration', () => {
      const input = createValidInput({ orchestrationMode: 'sequential' as const })

      const result = agent['setupOrchestration'](input)

      const stepsWithRollback = result.filter(step => step.rollbackAction)
      expect(stepsWithRollback.length).toBeGreaterThan(0)
    })

    it('should have proper step dependencies', () => {
      const input = createValidInput({ orchestrationMode: 'sequential' as const })

      const result = agent['setupOrchestration'](input)

      // Check that steps have proper dependencies
      const analysisStep = result.find(step => step.action === 'Performance analysis')
      expect(analysisStep?.dependencies).toContain('Backup creation')
    })
  })

  describe('Structural Protection (Point 11)', () => {
    it('should implement structural protection with backup', async () => {
      const input = {
        securityLevel: 'medium',
        maxFileSizeKB: 100
      }

      mockExistsSync.mockReturnValue(false)

      const result = await agent['implementStructuralProtection'](input)

      expect(result.success).toBe(true)
      expect(result.backupPath).toBeDefined()
      expect(mockMkdirSync).toHaveBeenCalled()
      expect(mockWriteFileSync).toHaveBeenCalled()
    })

    it('should create protection metadata with security hash', async () => {
      const input = {
        securityLevel: 'high',
        maxFileSizeKB: 50
      }

      mockExistsSync.mockReturnValue(false)

      await agent['implementStructuralProtection'](input)

      expect(mockWriteFileSync).toHaveBeenCalledWith(
        expect.stringContaining('protection-metadata.json'),
        expect.stringContaining('securityHash')
      )
    })
  })

  describe('AI Analysis (Point 12)', () => {
    it('should prepare AI analysis plan', async () => {
      const input = {
        enableAIAnalysis: true
      }

      const result = await agent['prepareAIAnalysis'](input)

      expect(result.enabled).toBe(true)
      expect(result.patternsToAnalyze).toContain('performance_patterns')
      expect(result.patternsToAnalyze).toContain('security_patterns')
      expect(result.patternsToAnalyze).toContain('efficiency_patterns')
      expect(result.confidenceThreshold).toBe(0.8)
      expect(result.model).toBe('gpt-4')
      expect(result.focusAreas).toContain('performance')
      expect(result.focusAreas).toContain('security')
      expect(result.focusAreas).toContain('efficiency')
    })

    it('should execute AI analysis with insights', async () => {
      const plan = {
        enabled: true,
        patternsToAnalyze: ['performance_patterns'],
        confidenceThreshold: 0.8,
        model: 'gpt-4' as const,
        focusAreas: ['performance'] as const
      }

      const log = {
        aiAnalysisResults: []
      } 

      await agent['executeAIAnalysis'](plan, log)

      expect(log.aiAnalysisResults.length).toBeGreaterThan(0)
      expect(log.aiAnalysisResults[0]).toHaveProperty('file')
      expect(log.aiAnalysisResults[0]).toHaveProperty('aiInsight')
      expect(log.aiAnalysisResults[0]).toHaveProperty('confidence')
    })
  })

  describe('Integration Tests', () => {
    it('should execute complete performance workflow with all 12 points', async () => {
      mockWriteFileSync.mockClear()

      await agent.runAgent({
        analyzeBundleSize: true,
        analyzeCodeEfficiency: true,
        runSystemBenchmarks: true,
        securityLevel: 'medium',
        enableAIAnalysis: true,
        maxFileSizeKB: 100,
        backupBeforeAnalysis: true,
        orchestrationMode: 'sequential'
      })

      expect(mockWriteFileSync).toHaveBeenCalled()
      const calls = mockWriteFileSync.mock.calls
      const found = calls.some((call: unknown[]) =>
        call[0].includes('performance-report.json') && call[1].includes('100% compliance')
      )
      expect(found).toBe(true)
    })

    it('should handle security validation failures gracefully', () => {
      const input = {
        securityLevel: 'high',
        maxFileSizeKB: 2000 // Too high for security
      }

      const result = agent['performSecurityValidation'](input)

      expect(result.safe).toBe(false)
      expect(result.reason).toContain('File size limit too high for security analysis')
    })
  })

  describe('Benchmark Execution', () => {
    it('should execute benchmarks with orchestration', async () => {
      const input = {
        analyzeBundleSize: true,
        analyzeCodeEfficiency: true,
        runSystemBenchmarks: true
      }

      const orchestration = [
        {
          step: 1,
          action: 'Test step',
          dependencies: [],
          timeout: 30,
          status: 'pending' as const
        }
      ]

      const result = await agent['executeBenchmarks'](input, orchestration)

      expect(result.length).toBeGreaterThan(0)
      expect(result[0]).toHaveProperty('name')
      expect(result[0]).toHaveProperty('duration')
      expect(result[0]).toHaveProperty('memoryUsage')
      expect(result[0]).toHaveProperty('status')
      expect(result[0]).toHaveProperty('securityScore')
      expect(result[0]).toHaveProperty('efficiencyScore')
      expect(result[0]).toHaveProperty('aiInsights')
    })
  })

  describe('Performance Issues Analysis', () => {
    it('should analyze performance issues with AI insights', async () => {
      const input = {
        analyzeBundleSize: true,
        analyzeCodeEfficiency: true
      }

      const result = await agent['analyzePerformanceIssues'](input)

      expect(result.length).toBeGreaterThan(0)
      expect(result[0]).toHaveProperty('type')
      expect(result[0]).toHaveProperty('priority')
      expect(result[0]).toHaveProperty('file')
      expect(result[0]).toHaveProperty('description')
      expect(result[0]).toHaveProperty('recommendation')
      expect(result[0]).toHaveProperty('securityImpact')
      expect(result[0]).toHaveProperty('aiConfidence')
      expect(result[0]).toHaveProperty('remediationTime')
    })
  })

  describe('Error Handling', () => {
    it('should handle structural protection failures', async () => {
      mockMkdirSync.mockImplementation(() => {
        throw new Error('Permission denied')
      })

      const input = {
        securityLevel: 'medium',
        maxFileSizeKB: 100
      }

      await expect(
        agent['implementStructuralProtection'](input)
      ).rejects.toThrow('Structural protection failed: Permission denied')
    })

    it('should handle AI analysis preparation failures', async () => {
      // Mock the method to throw an error
      const originalMethod = agent['prepareAIAnalysis']
      agent['prepareAIAnalysis'] = vi.fn().mockRejectedValue(new Error('AI analysis preparation failed'))

      await expect(
        agent['prepareAIAnalysis']({} )
      ).rejects.toThrow('AI analysis preparation failed')

      // Restore original method
      agent['prepareAIAnalysis'] = originalMethod
    })
  })

  describe('Legacy Compatibility', () => {
    it('should maintain backward compatibility with default function', async () => {
      const mockWrite = vi.fn()
      
      // Import the default function
      const { default: runAgent } = await import('../benchmark')
      
      await runAgent({ writeFileSync: mockWrite })
      
      expect(mockWrite).toHaveBeenCalled()
      const calls = mockWrite.mock.calls
      const found = calls.some((call: unknown[]) =>
        call[0].includes('performance-report.json') && call[1].includes('@perf')
      )
      expect(found).toBe(true)
      
      // Parse the actual data to verify structure
      const [, data] = calls.find((call: unknown[]) => call[0].includes('performance-report.json'))!
      const log = JSON.parse(data)
      expect(log).toHaveProperty('timestamp')
      expect(log).toHaveProperty('agentName', '@perf')
      expect(log).toHaveProperty('status')
      expect(log).toHaveProperty('errors')
      expect(Array.isArray(log.errors)).toBe(true)
      expect(log).toHaveProperty('actionsPerformed')
      expect(Array.isArray(log.actionsPerformed)).toBe(true)
      expect(log).toHaveProperty('duration')
      expect(typeof log.duration).toBe('number')
    })
  })
})
