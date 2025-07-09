import { describe, expect, it, vi, beforeEach } from 'vitest'
import runAgent, { type AnalyticsConfig, type AnalyticsDeps, type AnalyticsData } from '../report'

describe('@analytics agent', () => {
  let mockDeps: AnalyticsDeps
  let mockConfig: Partial<AnalyticsConfig>

  beforeEach(() => {
    vi.clearAllMocks()
    
    mockDeps = {
      writeFileSync: vi.fn() as any,
      readFileSync: vi.fn() as any,
      existsSync: vi.fn() as any,
      mkdirSync: vi.fn() as any,
    }
    
    mockConfig = {
      outputPath: 'test-output/analytics-report.json',
      dataSource: 'posthog',
      environment: 'test',
      enableAIInsights: true,
      backupPrevious: true,
      validateData: true,
    }
  })

  describe('runAgent', () => {
    it('debe generar reporte completo con configuración por defecto', async () => {
      mockDeps.existsSync.mockReturnValue(false)
      
      const result = await runAgent({}, mockDeps)
      
      expect(result).toMatchObject({
        agentName: '@analytics',
        status: 'success',
        data: expect.objectContaining({
          pageViews: expect.any(Number),
          uniqueUsers: expect.any(Number),
          conversionRate: expect.any(Number),
        }),
        insights: expect.any(Array),
        recommendations: expect.any(Array),
        errors: expect.any(Array),
        warnings: expect.any(Array),
        metadata: expect.objectContaining({
          version: '2.0.0',
          environment: expect.any(String),
          dataSource: 'posthog',
        }),
      })
      
      expect(mockDeps.writeFileSync).toHaveBeenCalledWith(
        'audit-artifacts/reports/analytics-report.json',
        expect.any(String)
      )
    })

    it('debe generar reporte con configuración personalizada', async () => {
      mockDeps.existsSync.mockReturnValue(false)
      
      const result = await runAgent(mockConfig, mockDeps)
      
      expect(result.metadata.environment).toBe('test')
      expect(result.metadata.dataSource).toBe('posthog')
      expect(mockDeps.writeFileSync).toHaveBeenCalledWith(
        'test-output/analytics-report.json',
        expect.any(String)
      )
    })

    it('debe crear backup de reporte anterior si existe', async () => {
      mockDeps.existsSync.mockImplementation((path: string) => {
        return path === 'test-output/analytics-report.json'
      })
      mockDeps.readFileSync.mockReturnValue('{"previous": "data"}')
      
      await runAgent(mockConfig, mockDeps)
      
      expect(mockDeps.readFileSync).toHaveBeenCalledWith('test-output/analytics-report.json', 'utf8')
      expect(mockDeps.writeFileSync).toHaveBeenCalledWith(
        expect.stringMatching(/test-output\/analytics-report\.backup-.*\.json/),
        '{"previous": "data"}'
      )
    })

    it('debe manejar errores de configuración inválida', async () => {
      const invalidConfig = {
        ...mockConfig,
        dataSource: 'invalid-source',
      }
      
      await expect(runAgent(invalidConfig, mockDeps)).rejects.toThrow(
        'Invalid dataSource. Must be one of: posthog, google-analytics, mixpanel'
      )
    })

    it('debe generar insights AI cuando está habilitado', async () => {
      mockDeps.existsSync.mockReturnValue(false)
      
      const result = await runAgent({ ...mockConfig, enableAIInsights: true }, mockDeps)
      
      expect(result.insights).toBeInstanceOf(Array)
      expect(result.recommendations).toBeInstanceOf(Array)
    })

    it('debe omitir insights AI cuando está deshabilitado', async () => {
      mockDeps.existsSync.mockReturnValue(false)
      
      const result = await runAgent({ ...mockConfig, enableAIInsights: false }, mockDeps)
      
      expect(result.insights).toEqual([])
      expect(result.recommendations).toEqual([])
    })

    it('debe validar datos cuando está habilitado', async () => {
      mockDeps.existsSync.mockReturnValue(false)
      
      const result = await runAgent({ ...mockConfig, validateData: true }, mockDeps)
      
      expect(result.errors).toBeInstanceOf(Array)
      expect(result.warnings).toBeInstanceOf(Array)
    })

    it('debe manejar errores de escritura de archivo', async () => {
      mockDeps.existsSync.mockReturnValue(false)
      mockDeps.writeFileSync.mockImplementation(() => {
        throw new Error('Write error')
      })
      
      await expect(runAgent(mockConfig, mockDeps)).rejects.toThrow('Write error')
    })

    it('debe crear directorio de salida si no existe', async () => {
      mockDeps.existsSync.mockReturnValue(false)
      
      await runAgent(mockConfig, mockDeps)
      
      expect(mockDeps.mkdirSync).toHaveBeenCalledWith('test-output', { recursive: true })
    })

    it('debe medir tiempo de ejecución correctamente', async () => {
      mockDeps.existsSync.mockReturnValue(false)
      
      const result = await runAgent(mockConfig, mockDeps)
      
      expect(result.executionTime).toBeGreaterThanOrEqual(0)
      expect(result.executionTime).toBeLessThan(1000) // Debe ser rápido
    })

    it('debe generar reporte de error cuando falla', async () => {
      mockDeps.existsSync.mockReturnValue(false)
      mockDeps.writeFileSync.mockImplementation(() => {
        throw new Error('Critical error')
      })
      
      await expect(runAgent(mockConfig, mockDeps)).rejects.toThrow('Critical error')
      
      // Verificar que se intentó escribir el reporte de error
      expect(mockDeps.writeFileSync).toHaveBeenCalled()
    })
  })

  describe('validación de configuración', () => {
    it('debe aceptar dataSource válidos', async () => {
      const validSources = ['posthog', 'google-analytics', 'mixpanel']
      
      for (const source of validSources) {
        mockDeps.existsSync.mockReturnValue(false)
        const config = { ...mockConfig, dataSource: source }
        
        const result = await runAgent(config, mockDeps)
        expect(result.metadata.dataSource).toBe(source)
      }
    })

    it('debe rechazar dataSource inválidos', async () => {
      const invalidConfig = { ...mockConfig, dataSource: 'invalid' }
      
      await expect(runAgent(invalidConfig, mockDeps)).rejects.toThrow(
        'Invalid dataSource. Must be one of: posthog, google-analytics, mixpanel'
      )
    })
  })

  describe('estructura de datos', () => {
    it('debe generar datos de analíticas con estructura correcta', async () => {
      mockDeps.existsSync.mockReturnValue(false)
      
      const result = await runAgent(mockConfig, mockDeps)
      
      expect(result.data).toMatchObject({
        pageViews: expect.any(Number),
        uniqueUsers: expect.any(Number),
        sessionDuration: expect.any(Number),
        conversionRate: expect.any(Number),
        topPages: expect.arrayContaining([
          expect.objectContaining({
            path: expect.any(String),
            views: expect.any(Number),
          }),
        ]),
        userEngagement: expect.objectContaining({
          averageTimeOnSite: expect.any(Number),
          bounceRate: expect.any(Number),
          pagesPerSession: expect.any(Number),
        }),
        performance: expect.objectContaining({
          averageLoadTime: expect.any(Number),
          errorRate: expect.any(Number),
          uptime: expect.any(Number),
        }),
      })
    })
  })

  describe('CLI integration', () => {
    it('debe ejecutar correctamente desde CLI', async () => {
      // Simular ejecución CLI
      const originalArgv = process.argv
      process.argv = ['node', 'report.ts']
      
      try {
        mockDeps.existsSync.mockReturnValue(false)
        
        // Esto debería ejecutar sin errores
        await runAgent(mockConfig, mockDeps)
        
        expect(mockDeps.writeFileSync).toHaveBeenCalled()
      } finally {
        process.argv = originalArgv
      }
    })
  })
})
