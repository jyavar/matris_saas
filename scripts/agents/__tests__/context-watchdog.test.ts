import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import * as fs from 'fs'
import * as path from 'path'

import runAgent from '../context-watchdog'

// Mocks
vi.mock('fs', () => ({
  writeFileSync: vi.fn(),
  existsSync: vi.fn(() => true),
  mkdirSync: vi.fn(),
  readFileSync: vi.fn(() => JSON.stringify({
    root: '.',
    validPaths: ['src/**/*', 'apps/**/*', 'packages/**/*'],
    forbiddenPaths: ['node_modules/**/*', '.git/**/*'],
    namingConventions: {
      testFiles: '*.test.ts',
      componentFiles: '*.tsx',
      routeFiles: '*.routes.ts',
    },
    preferredEntryDir: 'src',
  })),
  appendFileSync: vi.fn(),
}))

vi.mock('./strato.logic.js', () => ({
  getManifest: vi.fn(() => ({
    root: '.',
    validPaths: ['src/**/*', 'apps/**/*', 'packages/**/*'],
    forbiddenPaths: ['node_modules/**/*', '.git/**/*'],
    namingConventions: {
      testFiles: '*.test.ts',
      componentFiles: '*.tsx',
      routeFiles: '*.routes.ts',
    },
    preferredEntryDir: 'src',
  })),
  getChangedFilesAgainstMain: vi.fn(() => [
    'src/components/Button.tsx',
    'src/utils/helper.ts',
    'package.json',
  ]),
  validateFiles: vi.fn((files: string[]) => files.filter(f => f.includes('package.json'))),
  writeLog: vi.fn(),
}))

vi.mock('process', () => ({
  env: {
    NODE_ENV: 'test',
    GIT_AUTHOR_NAME: 'Test User',
  },
  cwd: vi.fn(() => '/test/project'),
  argv: ['node', 'context-watchdog.ts'],
}))

describe('Context Watchdog Agent', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('runAgent', () => {
    it('should run with default dependencies', async () => {
      await runAgent()
      
      expect(fs.writeFileSync).toHaveBeenCalled()
    })

    it('should run with custom dependencies', async () => {
      const customDeps = {
        writeFileSync: vi.fn(),
        existsSync: vi.fn(() => true),
        mkdirSync: vi.fn(),
      }
      
      await runAgent(customDeps)
      
      expect(customDeps.writeFileSync).toHaveBeenCalled()
    })

    it('should handle missing manifest gracefully', async () => {
      // Mock que simula archivo no encontrado
      vi.mocked(fs.readFileSync).mockImplementation(() => {
        throw new Error('File not found')
      })
      
      await runAgent()
      
      expect(fs.writeFileSync).toHaveBeenCalled()
    })

    it('should execute successfully with no violations', async () => {
      const mockDeps = {
        writeFileSync: vi.fn(),
        existsSync: vi.fn(() => true),
        mkdirSync: vi.fn(),
        validateFiles: vi.fn(() => []),
      }
      
      await runAgent(mockDeps)
      
      expect(mockDeps.writeFileSync).toHaveBeenCalled()
      // Verificar que se generó el reporte principal
      const calls = mockDeps.writeFileSync.mock.calls
      const reportCall = calls.find(call => String(call[0]).includes('context-watchdog-report.json'))
      expect(reportCall).toBeDefined()
      if (reportCall) {
        expect(JSON.parse(String(reportCall[1])).status).toBe('ok')
      }
    })

    it('should handle violations and generate warnings', async () => {
      const mockDeps = {
        writeFileSync: vi.fn(),
        existsSync: vi.fn(() => true),
        mkdirSync: vi.fn(),
        validateFiles: vi.fn(() => ['package.json']),
      }
      
      await runAgent(mockDeps)
      
      expect(mockDeps.writeFileSync).toHaveBeenCalled()
      // Verificar que se generó el reporte con warnings
      const calls = mockDeps.writeFileSync.mock.calls
      const reportCall = calls.find(call => String(call[0]).includes('context-watchdog-report.json'))
      expect(reportCall).toBeDefined()
      if (reportCall) {
        expect(JSON.parse(String(reportCall[1])).status).toBe('warn')
      }
    })

    it('should handle errors gracefully', async () => {
      const mockDeps = {
        writeFileSync: vi.fn(),
        existsSync: vi.fn(() => true),
        mkdirSync: vi.fn(),
        getManifest: vi.fn(() => {
          throw new Error('Manifest error')
        }),
      }
      
      await runAgent(mockDeps)
      
      expect(mockDeps.writeFileSync).toHaveBeenCalled()
      // Verificar que se generó el reporte con error
      const calls = mockDeps.writeFileSync.mock.calls
      const reportCall = calls.find(call => String(call[0]).includes('context-watchdog-report.json'))
      expect(reportCall).toBeDefined()
      if (reportCall) {
        expect(JSON.parse(String(reportCall[1])).status).toBe('fail')
      }
    })
  })

  describe('Score Generation', () => {
    it('should generate technical score with metrics', async () => {
      await runAgent()
      
      // Verificar que se generó el score
      const calls = vi.mocked(fs.writeFileSync).mock.calls
      const scoreCall = calls.find(call => String(call[0]).includes('context-watchdog-score.json'))
      expect(scoreCall).toBeDefined()
      if (scoreCall) {
        expect(JSON.parse(String(scoreCall[1]))).toHaveProperty('metrics.overallScore')
      }
    })

    it('should generate score even on error', async () => {
      // Mock que lanza error
      vi.mocked(fs.readFileSync).mockImplementation(() => {
        throw new Error('Test error')
      })
      
      await runAgent()
      
      // Verificar que se generó el score incluso con error
      const calls = vi.mocked(fs.writeFileSync).mock.calls
      const scoreCall = calls.find(call => String(call[0]).includes('context-watchdog-score.json'))
      expect(scoreCall).toBeDefined()
    })
  })

  describe('Orchestration', () => {
    it('should execute with orchestration hooks', async () => {
      await runAgent()
      
      // Verificar que se guardó el resultado de orquestación
      const calls = vi.mocked(fs.writeFileSync).mock.calls
      const orchestrationCall = calls.find(call => String(call[0]).includes('context-watchdog-orchestration.json'))
      expect(orchestrationCall).toBeDefined()
      if (orchestrationCall) {
        expect(JSON.parse(String(orchestrationCall[1]))).toHaveProperty('hooksExecuted')
      }
    })
  })
})

describe('Integration Tests', () => {
  it('should process real file patterns', async () => {
    const testFiles = [
      'src/components/Button.tsx',
      'src/utils/helper.ts',
      'package.json',
      'node_modules/some-package/index.js',
    ]
    
    const mockDeps = {
      writeFileSync: vi.fn(),
      existsSync: vi.fn(() => true),
      mkdirSync: vi.fn(),
      getManifest: vi.fn(() => ({
        root: '.',
        validPaths: ['src/**/*', 'apps/**/*', 'packages/**/*'],
        forbiddenPaths: ['node_modules/**/*', '.git/**/*'],
        namingConventions: {
          testFiles: '*.test.ts',
          componentFiles: '*.tsx',
          routeFiles: '*.routes.ts',
        },
        preferredEntryDir: 'src',
      })),
      getChangedFilesAgainstMain: vi.fn(() => testFiles),
      validateFiles: vi.fn((files: string[]) => files.filter(f => 
        f.includes('node_modules') || f.includes('package.json')
      )),
      writeLog: vi.fn(),
    }
    
    await runAgent(mockDeps)
    
    expect(mockDeps.writeFileSync).toHaveBeenCalled()
    expect(mockDeps.validateFiles).toHaveBeenCalledWith(testFiles, expect.any(Object))
  })

  it('should handle empty file list', async () => {
    const mockDeps = {
      writeFileSync: vi.fn(),
      existsSync: vi.fn(() => true),
      mkdirSync: vi.fn(),
      getManifest: vi.fn(() => ({
        root: '.',
        validPaths: ['src/**/*'],
        forbiddenPaths: ['node_modules/**/*'],
        namingConventions: {
          testFiles: '*.test.ts',
          componentFiles: '*.tsx',
          routeFiles: '*.routes.ts',
        },
        preferredEntryDir: 'src',
      })),
      getChangedFilesAgainstMain: vi.fn(() => []),
      validateFiles: vi.fn(() => []),
      writeLog: vi.fn(),
    }
    
    await runAgent(mockDeps)
    
    expect(mockDeps.writeFileSync).toHaveBeenCalled()
    expect(mockDeps.validateFiles).toHaveBeenCalledWith([], expect.any(Object))
  })
}) 