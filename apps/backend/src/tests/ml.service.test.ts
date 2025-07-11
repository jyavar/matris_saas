import { describe, it, expect, beforeEach } from 'vitest'
import { MLService } from '../services/ml.service.js'

describe('MLService', () => {
  let mlService: MLService

  beforeEach(() => {
    mlService = new MLService()
  })

  describe('checkHealth', () => {
    it('should return health status with circuit breaker info', async () => {
      const health = await mlService.checkHealth()

      expect(health).toMatchObject({
        status: expect.stringMatching(/healthy|degraded/),
        uptime: expect.any(Number),
        responseTime: expect.any(Number),
        lastCheck: expect.any(String),
        circuitBreaker: {
          state: expect.stringMatching(/closed|half-open|open/),
          failureCount: expect.any(Number),
        },
        mlServices: {
          training: expect.stringMatching(/available|busy|offline/),
          inference: expect.stringMatching(/available|busy|offline/),
          dataProcessing: expect.stringMatching(/available|busy|offline/),
        },
      })
      expect(typeof health.circuitBreaker.lastFailure === 'string' || health.circuitBreaker.lastFailure === null).toBe(true)
    })

    it('should reflect circuit breaker state based on failures', async () => {
      // Record some failures
      mlService.recordFailure()
      mlService.recordFailure()
      mlService.recordFailure()

      const health = await mlService.checkHealth()
      expect(health.circuitBreaker.failureCount).toBe(3)
      expect(health.circuitBreaker.state).toBe('closed')
    })
  })

  describe('getGlobalMetrics', () => {
    it('should return global ML metrics', async () => {
      const metrics = await mlService.getGlobalMetrics()

      expect(metrics).toMatchObject({
        total_models: expect.any(Number),
        active_models: expect.any(Number),
        total_datasets: expect.any(Number),
        active_jobs: expect.any(Number),
        total_predictions: expect.any(Number),
        average_accuracy: expect.any(Number),
        system_load: expect.any(Number),
        memory_usage: expect.any(Number),
        cpu_usage: expect.any(Number),
        active_deployments: expect.any(Number),
        total_analyses: expect.any(Number),
        last_updated: expect.any(String),
      })
    })
  })

  describe('getSystemStatus', () => {
    it('should return system status information', async () => {
      const status = await mlService.getSystemStatus()

      expect(status).toMatchObject({
        version: expect.any(String),
        environment: expect.any(String),
        uptime: expect.any(Number),
        memory: expect.any(Object),
        cpu: expect.any(Object),
        active_connections: expect.any(Number),
        queue_size: expect.any(Number),
        last_maintenance: expect.any(String),
        next_maintenance: expect.any(String),
      })
    })
  })

  describe('circuit breaker management', () => {
    it('should record failures and successes correctly', () => {
      expect(mlService['failureCount']).toBe(0)

      mlService.recordFailure()
      expect(mlService['failureCount']).toBe(1)

      mlService.recordSuccess()
      expect(mlService['failureCount']).toBe(0)

      // Multiple failures
      mlService.recordFailure()
      mlService.recordFailure()
      mlService.recordFailure()
      expect(mlService['failureCount']).toBe(3)

      mlService.recordSuccess()
      expect(mlService['failureCount']).toBe(2)
    })

    it('should reset circuit breaker', () => {
      mlService.recordFailure()
      mlService.recordFailure()
      expect(mlService['failureCount']).toBe(2)

      mlService.resetCircuitBreaker()
      expect(mlService['failureCount']).toBe(0)
      expect(mlService['lastFailure']).toBe(null)
    })
  })
}) 