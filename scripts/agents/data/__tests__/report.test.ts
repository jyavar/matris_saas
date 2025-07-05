import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { generateReport, type DataReport } from '../report'
import { type DataProcessingResult } from '../processor'
import { writeFileSync, mkdirSync } from 'fs'

// Mock fs module
vi.mock('fs', () => ({
  writeFileSync: vi.fn(),
  mkdirSync: vi.fn()
}))

// Mock console.log
const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

describe('Report Generator', () => {
  const mockResult: DataProcessingResult = {
    timestamp: '2025-01-01T00:00:00Z',
    status: 'SUCCESS',
    operations: {
      migration: { status: 'SUCCESS', message: 'Migration completed' },
      seeding: { status: 'SKIPPED', message: 'Seeding skipped' },
      validation: { status: 'SUCCESS', message: 'Validation completed' },
      backup: { status: 'SKIPPED', message: 'Backup skipped' },
      analytics: { status: 'SUCCESS', message: 'Analytics completed' }
    },
    summary: 'All operations completed successfully',
    errors: [],
    warnings: []
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('generateReport', () => {
    it('should generate a report with success status', async () => {
      await generateReport(mockResult)

      expect(writeFileSync).toHaveBeenCalledWith(
        'audit-artifacts/reports/data-report.json',
        expect.stringContaining('"status":"success"')
      )
    })

    it('should generate a report with warning status for partial results', async () => {
      const partialResult: DataProcessingResult = {
        ...mockResult,
        status: 'PARTIAL',
        warnings: ['Some operations failed']
      }

      await generateReport(partialResult)

      expect(writeFileSync).toHaveBeenCalledWith(
        'audit-artifacts/reports/data-report.json',
        expect.stringContaining('"status":"warning"')
      )
    })

    it('should generate a report with error status for failed results', async () => {
      const failedResult: DataProcessingResult = {
        ...mockResult,
        status: 'FAILED',
        errors: ['Critical error occurred']
      }

      await generateReport(failedResult)

      expect(writeFileSync).toHaveBeenCalledWith(
        'audit-artifacts/reports/data-report.json',
        expect.stringContaining('"status":"error"')
      )
    })

    it('should include all required fields in the report', async () => {
      await generateReport(mockResult)

      const writeCall = vi.mocked(writeFileSync).mock.calls[0]
      const reportContent = writeCall[1] as string
      const report: DataReport = JSON.parse(reportContent)

      expect(report.agent).toBe('@data')
      expect(report.timestamp).toBeDefined()
      expect(report.summary).toBe('All operations completed successfully')
      expect(report.details).toEqual(mockResult)
      expect(report.recommendations).toBeDefined()
      expect(report.duration).toBe(0)
      expect(report.metadata).toBeDefined()
    })

    it('should create output directory if it does not exist', async () => {
      await generateReport(mockResult)

      expect(mkdirSync).toHaveBeenCalledWith('audit-artifacts/reports', { recursive: true })
    })

    it('should use custom output directory when provided', async () => {
      await generateReport(mockResult, { outputDir: 'custom/reports' })

      expect(writeFileSync).toHaveBeenCalledWith(
        'custom/reports/data-report.json',
        expect.any(String)
      )
    })

    it('should include duration when provided', async () => {
      await generateReport(mockResult, { duration: 1500 })

      const writeCall = vi.mocked(writeFileSync).mock.calls[0]
      const reportContent = writeCall[1] as string
      const report: DataReport = JSON.parse(reportContent)

      expect(report.duration).toBe(1500)
    })

    it('should include custom metadata when provided', async () => {
      const customMetadata = { customKey: 'customValue', version: '2.0.0' }
      await generateReport(mockResult, { metadata: customMetadata })

      const writeCall = vi.mocked(writeFileSync).mock.calls[0]
      const reportContent = writeCall[1] as string
      const report: DataReport = JSON.parse(reportContent)

      expect(report.metadata.customKey).toBe('customValue')
      expect(report.metadata.version).toBe('2.0.0')
    })

    it('should log the report generation', async () => {
      await generateReport(mockResult)

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('📊 @data report generated: audit-artifacts/reports/data-report.json')
      )
    })

    it('should generate appropriate recommendations for success', async () => {
      await generateReport(mockResult)

      const writeCall = vi.mocked(writeFileSync).mock.calls[0]
      const reportContent = writeCall[1] as string
      const report: DataReport = JSON.parse(reportContent)

      expect(report.recommendations).toContain('All data operations completed successfully')
    })

    it('should generate appropriate recommendations for failures', async () => {
      const failedResult: DataProcessingResult = {
        ...mockResult,
        status: 'FAILED',
        operations: {
          ...mockResult.operations,
          migration: { status: 'FAILED', message: 'Migration failed' }
        },
        errors: ['Migration failed']
      }

      await generateReport(failedResult)

      const writeCall = vi.mocked(writeFileSync).mock.calls[0]
      const reportContent = writeCall[1] as string
      const report: DataReport = JSON.parse(reportContent)

      expect(report.recommendations).toContain('Review and fix migration operation')
      expect(report.recommendations).toContain('Critical failures detected - immediate attention required')
    })

    it('should generate recommendations for warnings', async () => {
      const warningResult: DataProcessingResult = {
        ...mockResult,
        warnings: ['Data validation warning']
      }

      await generateReport(warningResult)

      const writeCall = vi.mocked(writeFileSync).mock.calls[0]
      const reportContent = writeCall[1] as string
      const report: DataReport = JSON.parse(reportContent)

      expect(report.recommendations).toContain('Address warnings to improve data quality')
    })

    it('should generate recommendations for skipped operations', async () => {
      const skippedResult: DataProcessingResult = {
        ...mockResult,
        operations: {
          ...mockResult.operations,
          migration: { status: 'SKIPPED', message: 'Migration skipped' },
          seeding: { status: 'SKIPPED', message: 'Seeding skipped' }
        }
      }

      await generateReport(skippedResult)

      const writeCall = vi.mocked(writeFileSync).mock.calls[0]
      const reportContent = writeCall[1] as string
      const report: DataReport = JSON.parse(reportContent)

      expect(report.recommendations).toContain('Consider running skipped operations: migration, seeding')
    })
  })
}) 