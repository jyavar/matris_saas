import { describe, it, expect, vi, beforeEach } from 'vitest'
import { TestCoverageAuditor } from '../audit-test-coverage'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

// Mock fs operations
vi.mock('fs', () => ({
  readFileSync: vi.fn(),
  writeFileSync: vi.fn(),
  existsSync: vi.fn(),
  promises: {
    stat: vi.fn(),
    mkdir: vi.fn()
  }
}))

// Mock glob
vi.mock('glob', () => ({
  glob: vi.fn()
}))

describe('TestCoverageAuditor', () => {
  let auditor: TestCoverageAuditor

  beforeEach(() => {
    vi.clearAllMocks()
    auditor = new TestCoverageAuditor()
  })

  describe('getModuleName', () => {
    it('should extract module name from path', () => {
      const auditor = new TestCoverageAuditor()
      
      // @ts-ignore - Accessing private method for testing
      expect(auditor['getModuleName']('apps/backend')).toBe('backend')
      // @ts-ignore - Accessing private method for testing
      expect(auditor['getModuleName']('scripts/agents/qa')).toBe('qa')
      // @ts-ignore - Accessing private method for testing
      expect(auditor['getModuleName']('packages/db-types')).toBe('db-types')
    })
  })

  describe('getModuleType', () => {
    it('should correctly identify module types', () => {
      const auditor = new TestCoverageAuditor()
      
      // @ts-ignore - Accessing private method for testing
      expect(auditor['getModuleType']('apps/backend')).toBe('backend')
      // @ts-ignore - Accessing private method for testing
      expect(auditor['getModuleType']('apps/frontend')).toBe('frontend')
      // @ts-ignore - Accessing private method for testing
      expect(auditor['getModuleType']('apps/web')).toBe('web')
      // @ts-ignore - Accessing private method for testing
      expect(auditor['getModuleType']('packages/utils')).toBe('package')
      // @ts-ignore - Accessing private method for testing
      expect(auditor['getModuleType']('scripts/agents/qa')).toBe('agent')
      // @ts-ignore - Accessing private method for testing
      expect(auditor['getModuleType']('scripts/audit')).toBe('script')
    })
  })

  describe('getTestType', () => {
    it('should correctly identify test types', () => {
      const auditor = new TestCoverageAuditor()
      
      // @ts-ignore - Accessing private method for testing
      expect(auditor['getTestType']('test.e2e.ts')).toBe('e2e')
      // @ts-ignore - Accessing private method for testing
      expect(auditor['getTestType']('component.spec.ts')).toBe('spec')
      // @ts-ignore - Accessing private method for testing
      expect(auditor['getTestType']('__tests__/integration.test.ts')).toBe('integration')
      // @ts-ignore - Accessing private method for testing
      expect(auditor['getTestType']('service.test.ts')).toBe('unit')
    })
  })

  describe('getCoverageLevel', () => {
    it('should correctly categorize coverage levels', () => {
      const auditor = new TestCoverageAuditor()
      
      // @ts-ignore - Accessing private method for testing
      expect(auditor['getCoverageLevel'](85)).toBe('high')
      // @ts-ignore - Accessing private method for testing
      expect(auditor['getCoverageLevel'](65)).toBe('medium')
      // @ts-ignore - Accessing private method for testing
      expect(auditor['getCoverageLevel'](30)).toBe('low')
      // @ts-ignore - Accessing private method for testing
      expect(auditor['getCoverageLevel'](0)).toBe('none')
    })
  })

  describe('countLines', () => {
    it('should count non-empty, non-comment lines', async () => {
      const auditor = new TestCoverageAuditor()
      
      // Mock file content
      const mockContent = `
        // This is a comment
        export function test() {
          return true
        }
        
        /* 
          Multi-line comment
        */
        
        const value = 123
      `
      
      vi.mocked(readFileSync).mockReturnValue(mockContent)
      
      // @ts-ignore - Accessing private method for testing
      const result = await auditor['countLines'](['test.ts'])
      
      expect(result).toBe(5) // export, function, return, const, value lines
    })

    it('should handle empty files', async () => {
      const auditor = new TestCoverageAuditor()
      
      vi.mocked(readFileSync).mockReturnValue('')
      
      // @ts-ignore - Accessing private method for testing
      const result = await auditor['countLines'](['empty.ts'])
      
      expect(result).toBe(0)
    })
  })

  describe('detectIssues', () => {
    it('should detect modules without tests', async () => {
      const auditor = new TestCoverageAuditor()
      
      const testFiles: any[] = []
      const sourceFiles = ['src/service.ts', 'src/controller.ts']
      
      // @ts-ignore - Accessing private method for testing
      const issues = await auditor['detectIssues']('test-module', testFiles, sourceFiles)
      
      expect(issues).toContain('No test files found')
    })

    it('should detect empty test files', async () => {
      const auditor = new TestCoverageAuditor()
      
      const testFiles = [
        {
          path: 'test.ts',
          hasTests: false,
          lastModified: new Date().toISOString()
        }
      ]
      const sourceFiles = ['src/service.ts']
      
      // @ts-ignore - Accessing private method for testing
      const issues = await auditor['detectIssues']('test-module', testFiles, sourceFiles)
      
      expect(issues).toContain('1 test files without actual tests')
    })
  })

  describe('generateRecommendations', () => {
    it('should generate recommendations based on coverage', async () => {
      const auditor = new TestCoverageAuditor()
      
      // Mock modules with different coverage levels
      auditor['modules'] = [
        {
          name: 'high-coverage',
          coverageLevel: 'high',
          issues: []
        } as any,
        {
          name: 'no-tests',
          coverageLevel: 'none',
          issues: ['No test files found']
        } as any
      ]
      
      // @ts-ignore - Accessing private method for testing
      await auditor['generateRecommendations']()
      
      const report = auditor.getReport()
      expect(report.recommendations.length).toBeGreaterThan(0)
      expect(report.recommendations.some(r => r.includes('excellent coverage'))).toBe(true)
      expect(report.recommendations.some(r => r.includes('no tests'))).toBe(true)
    })
  })

  describe('exportReport', () => {
    it('should export report to JSON file', async () => {
      const auditor = new TestCoverageAuditor()
      
      // Mock file system operations
      vi.mocked(existsSync).mockReturnValue(true)
      const mockWriteFileSync = vi.mocked(require('fs').writeFileSync)
      
      // @ts-ignore - Accessing private method for testing
      await auditor['exportReport']()
      
      expect(mockWriteFileSync).toHaveBeenCalled()
      
      const callArgs = mockWriteFileSync.mock.calls[0]
      expect(callArgs[0]).toContain('test-coverage-audit.json')
      expect(typeof callArgs[1]).toBe('string')
      
      const reportData = JSON.parse(callArgs[1] as string)
      expect(reportData).toHaveProperty('timestamp')
      expect(reportData).toHaveProperty('summary')
      expect(reportData).toHaveProperty('modules')
      expect(reportData).toHaveProperty('coverageGroups')
      expect(reportData).toHaveProperty('recommendations')
    })
  })

  describe('getReport', () => {
    it('should return the current report', () => {
      const auditor = new TestCoverageAuditor()
      
      const report = auditor.getReport()
      
      expect(report).toHaveProperty('timestamp')
      expect(report).toHaveProperty('summary')
      expect(report.summary.totalModules).toBe(0)
      expect(report.modules).toEqual([])
      expect(report.coverageGroups.high).toEqual([])
      expect(report.coverageGroups.medium).toEqual([])
      expect(report.coverageGroups.low).toEqual([])
      expect(report.coverageGroups.noTests).toEqual([])
      expect(report.recommendations).toEqual([])
    })
  })
}) 