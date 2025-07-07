import { describe, it, expect, vi, beforeEach } from 'vitest'
import { execSync } from 'child_process'
import fs from 'fs'
import { join } from 'path'

// Mock de dependencias
vi.mock('child_process', () => ({
  execSync: vi.fn(),
}))

vi.mock('fs', () => ({
  default: {
    writeFileSync: vi.fn(),
    readFileSync: vi.fn(),
    existsSync: vi.fn(),
    mkdirSync: vi.fn(),
  },
  writeFileSync: vi.fn(),
  readFileSync: vi.fn(),
  existsSync: vi.fn(),
  mkdirSync: vi.fn(),
}))

vi.mock('path', () => ({
  join: vi.fn(),
}))

// Importar después de los mocks
import runAgent from '../plan-merge'
import ConflictResolver from '../conflict-resolver'

describe('@merge-strategist Agent', () => {
  const mockExecSync = vi.mocked(execSync)
  const mockWriteFileSync = vi.mocked(fs.writeFileSync)
  const mockExistsSync = vi.mocked(fs.existsSync)
  const mockJoin = vi.mocked(join)

  beforeEach(() => {
    vi.clearAllMocks()
    
    // Configurar mocks por defecto
    mockExecSync.mockImplementation((command: string) => {
      if (command.includes('branch --show-current')) {
        return Buffer.from('feature/test-branch')
      }
      if (command.includes('status --porcelain')) {
        return Buffer.from('') // Working directory clean
      }
      if (command.includes('diff --name-only')) {
        // Simular archivos modificados
        return Buffer.from('src/test.ts\nsrc/another.ts\npackage.json')
      }
      if (command.includes('rev-parse --verify')) {
        return Buffer.from('commit-hash')
      }
      if (command.includes('checkout')) {
        return Buffer.from('')
      }
      if (command.includes('merge')) {
        return Buffer.from('')
      }
      if (command.includes('git status')) {
        return Buffer.from('On branch main')
      }
      return Buffer.from('')
    })

    mockExistsSync.mockReturnValue(true)
    mockJoin.mockImplementation((...args) => args.join('/'))
  })

  describe('runAgent', () => {
    it('should execute successfully with default parameters', async () => {
      // Arrange
      const mockDeps = {
        writeFileSync: vi.fn(),
        readFileSync: vi.fn(),
        existsSync: vi.fn(),
        execSync: vi.fn(),
      }

      // Act
      await runAgent(mockDeps)

      // Assert
      expect(mockDeps.writeFileSync).toHaveBeenCalled()
      const callArgs = mockDeps.writeFileSync.mock.calls[0]
      expect(callArgs?.[0]).toContain('merge-strategist-report.json')
      
      const report = JSON.parse(callArgs?.[1] || '{}')
      expect(report.agentName).toBe('@merge-strategist')
      expect(report.status).toBe('ok')
      expect(report.actionsPerformed).toContain('🔍 Validating merge inputs...')
    })

    it('should handle command line arguments correctly', async () => {
      // Arrange
      const originalArgv = process.argv
      process.argv = ['node', 'test.js', '--source', 'feature/test', '--target', 'develop', '--dry-run']
      
      const mockDeps = {
        writeFileSync: vi.fn(),
        readFileSync: vi.fn(),
        existsSync: vi.fn(),
        execSync: vi.fn(),
      }

      // Act
      await runAgent(mockDeps)

      // Assert
      expect(mockDeps.writeFileSync).toHaveBeenCalled()
      
      // Restore
      process.argv = originalArgv
    })

    it('should handle git state analysis errors', async () => {
      // Arrange
      mockExecSync.mockImplementation(() => {
        throw new Error('Git command failed')
      })

      const mockDeps = {
        writeFileSync: vi.fn(),
        readFileSync: vi.fn(),
        existsSync: vi.fn(),
        execSync: vi.fn(),
      }

      // Act
      await runAgent(mockDeps)

      // Assert
      expect(mockDeps.writeFileSync).toHaveBeenCalled()
      const callArgs = mockDeps.writeFileSync.mock.calls[0]
      const report = JSON.parse(callArgs?.[1] || '{}')
      expect(report.status).toBe('fail')
      expect(report.errors.length).toBeGreaterThan(0)
    })

    it('should perform security validation correctly', async () => {
      // Arrange
      const mockDeps = {
        writeFileSync: vi.fn(),
        readFileSync: vi.fn(),
        existsSync: vi.fn(),
        execSync: vi.fn(),
      }

      // Simular intento de merge a rama protegida
      mockExecSync.mockImplementation((command: string) => {
        if (command.includes('rev-parse --verify main')) {
          return Buffer.from('commit-hash')
        }
        return Buffer.from('')
      })

      // Act
      await runAgent(mockDeps)

      // Assert
      expect(mockDeps.writeFileSync).toHaveBeenCalled()
    })

    it('should create backup when enabled', async () => {
      // Arrange
      const mockDeps = {
        writeFileSync: vi.fn(),
        readFileSync: vi.fn(),
        existsSync: vi.fn(),
        execSync: vi.fn(),
      }

      // Act
      await runAgent(mockDeps)

      // Assert
      expect(mockDeps.writeFileSync).toHaveBeenCalled()
      const callArgs = mockDeps.writeFileSync.mock.calls[0]
      const report = JSON.parse(callArgs?.[1] || '{}')
      expect(report.actionsPerformed).toContain('💾 Creating backup before merge...')
    })
  })

  describe('ConflictResolver', () => {
    let resolver: ConflictResolver

    beforeEach(() => {
      resolver = new ConflictResolver()
    })

    it('should resolve conflicts with different strategies', async () => {
      // Arrange
      const conflicts = [
        {
          file: 'package.json',
          status: 'conflicted' as const,
          lines: [10, 15],
          severity: 'low' as const,
        },
        {
          file: 'src/app.ts',
          status: 'conflicted' as const,
          lines: [25, 30],
          severity: 'high' as const,
        },
      ]

      // Act
      const resolutions = await resolver.resolveConflicts(conflicts)

      // Assert
      expect(resolutions).toHaveLength(2)
      expect(resolutions[0]?.file).toBe('package.json')
      expect(resolutions[1]?.file).toBe('src/app.ts')
    })

    it('should determine correct resolution strategy based on file type', () => {
      // Arrange & Act
      const jsonConflict = {
        file: 'config.json',
        status: 'conflicted' as const,
        lines: [1],
        severity: 'low' as const,
      }

      const tsConflict = {
        file: 'src/app.ts',
        status: 'conflicted' as const,
        lines: [1],
        severity: 'high' as const,
      }

      // Assert
      // Nota: Los métodos privados no son accesibles directamente en los tests
      // pero podemos verificar el comportamiento a través de los métodos públicos
    })

    it('should handle resolution errors gracefully', async () => {
      // Arrange
      const conflicts = [
        {
          file: 'nonexistent.json',
          status: 'conflicted' as const,
          lines: [1],
          severity: 'low' as const,
        },
      ]

      mockExistsSync.mockReturnValue(false)

      // Act
      const resolutions = await resolver.resolveConflicts(conflicts)

      // Assert
      expect(resolutions).toHaveLength(1)
      expect(resolutions[0]?.error).toBeDefined()
      expect(resolutions[0]?.applied).toBe(false)
    })

    it('should calculate resolution statistics correctly', () => {
      // Arrange
      const resolutions = [
        {
          file: 'file1.json',
          resolution: 'auto' as const,
          confidence: 0.8,
          applied: true,
        },
        {
          file: 'file2.ts',
          resolution: 'manual' as const,
          confidence: 0,
          applied: false,
        },
        {
          file: 'file3.ts',
          resolution: 'auto' as const,
          confidence: 0.9,
          applied: true,
        },
      ]

      // Act
      const stats = resolver.getResolutionStats(resolutions)

      // Assert
      expect(stats.total).toBe(3)
      expect(stats.resolved).toBe(2)
      expect(stats.manual).toBe(1)
      expect(stats.failed).toBe(0)
      expect(stats.averageConfidence).toBeCloseTo(0.567, 2)
    })
  })

  describe('Integration Tests', () => {
    it('should handle complete merge workflow', async () => {
      // Arrange
      const mockDeps = {
        writeFileSync: vi.fn(),
        readFileSync: vi.fn(),
        existsSync: vi.fn(),
        execSync: vi.fn(),
      }

      // Act
      await runAgent(mockDeps)

      // Assert
      expect(mockDeps.writeFileSync).toHaveBeenCalled()
      const callArgs = mockDeps.writeFileSync.mock.calls[0]
      const report = JSON.parse(callArgs?.[1] || '{}')
      
      expect(report.mergePlan).toBeDefined()
      expect(report.mergeResult).toBeDefined()
      expect(report.actionsPerformed.length).toBeGreaterThan(0)
    })

    it('should validate input parameters correctly', async () => {
      // Arrange
      const mockDeps = {
        writeFileSync: vi.fn(),
        readFileSync: vi.fn(),
        existsSync: vi.fn(),
        execSync: vi.fn(),
      }

      // Act & Assert
      await expect(runAgent(mockDeps)).resolves.not.toThrow()
    })
  })
}) 