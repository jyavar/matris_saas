import { beforeEach, describe, expect, it, vi } from 'vitest'

import runAgent, { type DataDeps, type DataOptions } from '../autofix'

describe('@data agent', () => {
  let mockDeps: DataDeps
  let mockOptions: Partial<DataOptions>

  beforeEach(() => {
    vi.clearAllMocks()
    
    mockDeps = {
      writeFileSync: vi.fn(),
      readFileSync: vi.fn(),
      existsSync: vi.fn(),
      mkdirSync: vi.fn(),
      copyFileSync: vi.fn(),
    }
    
    mockOptions = {
      outputPath: 'test-output/data-report.json',
      environment: 'test',
      enableAIInsights: true,
      backupPrevious: true,
      validateData: true,
      dryRun: false,
    }
  })

  describe('runAgent', () => {
    it('debe ejecutar correctamente con configuración por defecto', async () => {
      mockDeps.existsSync.mockReturnValue(false)
      
      const result = await runAgent({}, mockDeps)
      
      expect(result).toMatchObject({
        success: expect.any(Boolean),
        message: expect.any(String),
        executionTime: expect.any(Number),
        metadata: {
          version: '2.0.0',
          environment: 'development',
          agentName: '@data',
        },
      })
    })

    it('debe ejecutar en modo dry-run correctamente', async () => {
      mockDeps.existsSync.mockReturnValue(false)
      
      const result = await runAgent({ ...mockOptions, dryRun: true }, mockDeps)
      
      expect(result.success).toBe(true)
      expect(result.message).toContain('Dry-run completed')
      expect(result.data?.operations.migration.status).toBe('SKIPPED')
    })

    it('debe crear backup de reporte anterior si existe', async () => {
      mockDeps.existsSync.mockImplementation((path: string) => {
        return path === 'test-output/data-report.json'
      })
      mockDeps.readFileSync.mockReturnValue('{"previous": "data"}')
      
      await runAgent(mockOptions, mockDeps)
      
      expect(mockDeps.readFileSync).toHaveBeenCalledWith('test-output/data-report.json', 'utf8')
      expect(mockDeps.writeFileSync).toHaveBeenCalledWith(
        expect.stringMatching(/test-output\/data-report\.backup-.*\.json/),
        '{"previous": "data"}'
      )
    })

    it('debe manejar errores de configuración inválida', async () => {
      const invalidOptions = {
        ...mockOptions,
        migrate: 'invalid' as unknown as boolean,
      }
      
      await expect(runAgent(invalidOptions, mockDeps)).rejects.toThrow(
        'migrate must be a boolean'
      )
    })

    it('debe generar insights AI cuando está habilitado', async () => {
      mockDeps.existsSync.mockReturnValue(false)
      
      const result = await runAgent({ ...mockOptions, enableAIInsights: true }, mockDeps)
      
      expect(result.insights).toBeInstanceOf(Array)
      expect(result.recommendations).toBeInstanceOf(Array)
    })

    it('debe omitir insights AI cuando está deshabilitado', async () => {
      mockDeps.existsSync.mockReturnValue(false)
      
      const result = await runAgent({ ...mockOptions, enableAIInsights: false }, mockDeps)
      
      expect(result.insights).toEqual([])
      expect(result.recommendations).toEqual([])
    })

    it('debe medir tiempo de ejecución correctamente', async () => {
      mockDeps.existsSync.mockReturnValue(false)
      
      const result = await runAgent(mockOptions, mockDeps)
      
      expect(result.executionTime).toBeGreaterThanOrEqual(0)
      expect(result.executionTime).toBeLessThan(5000) // Debe ser rápido
    })

    it('debe guardar reporte en la ruta especificada', async () => {
      mockDeps.existsSync.mockReturnValue(false)
      
      await runAgent(mockOptions, mockDeps)
      
      expect(mockDeps.writeFileSync).toHaveBeenCalledWith(
        'test-output/data-report.json',
        expect.any(String)
      )
    })

    it('debe crear directorio de salida si no existe', async () => {
      mockDeps.existsSync.mockReturnValue(false)
      
      await runAgent(mockOptions, mockDeps)
      
      expect(mockDeps.mkdirSync).toHaveBeenCalledWith('test-output', { recursive: true })
    })
  })

  describe('estructura de datos', () => {
    it('debe generar resultado con estructura correcta', async () => {
      mockDeps.existsSync.mockReturnValue(false)
      
      const result = await runAgent(mockOptions, mockDeps)
      
      expect(result).toMatchObject({
        success: expect.any(Boolean),
        message: expect.any(String),
        errors: expect.any(Array),
        warnings: expect.any(Array),
        insights: expect.any(Array),
        recommendations: expect.any(Array),
        executionTime: expect.any(Number),
        metadata: {
          version: expect.any(String),
          environment: expect.any(String),
          timestamp: expect.any(String),
          agentName: expect.any(String),
        },
      })
    })
  })

  describe('CLI integration', () => {
    it('debe ejecutar correctamente desde CLI', async () => {
      // Simular ejecución CLI
      const originalArgv = process.argv
      process.argv = ['node', 'autofix.ts']
      
      try {
        mockDeps.existsSync.mockReturnValue(false)
        
        // Esto debería ejecutar sin errores
        await runAgent(mockOptions, mockDeps)
        
        expect(mockDeps.writeFileSync).toHaveBeenCalled()
      } finally {
        process.argv = originalArgv
      }
    })
  })
}) 