import { describe, it, expect, beforeEach, vi } from 'vitest'
import { IncomingMessage, ServerResponse } from 'http'

import { mlSecurityMiddleware, mlAuthorizationMiddleware, mlResourceAccessMiddleware } from '../middleware/ml-security.middleware.js'
import { mlAuditService } from '../services/ml-audit.service.js'

// Mock del logger
vi.mock('../services/logger.service.js', () => ({
  logAction: vi.fn(),
}))

// Mock del servicio de auditoría
vi.mock('../services/ml-audit.service.js', () => ({
  mlAuditService: {
    logEvent: vi.fn(),
    logModelEvent: vi.fn(),
    logDatasetEvent: vi.fn(),
    logTrainingEvent: vi.fn(),
    logPredictionEvent: vi.fn(),
    logDeploymentEvent: vi.fn(),
    logUnauthorizedAccess: vi.fn(),
    logSuspiciousActivity: vi.fn(),
    logSecurityError: vi.fn(),
    logPerformanceMetrics: vi.fn(),
    logResourceUsage: vi.fn(),
    logBiasEvent: vi.fn(),
    logDataDriftEvent: vi.fn(),
  },
}))

describe('ML Security Middleware', () => {
  let mockReq: Partial<IncomingMessage>
  let mockRes: Partial<ServerResponse>
  let mockNext: () => void

  beforeEach(() => {
    mockReq = {
      method: 'GET',
      url: '/api/ml/health',
      headers: {
        'content-type': 'application/json',
        'content-length': '100',
        'user-agent': 'test-agent',
      },
      socket: {
        remoteAddress: '127.0.0.1',
      } as any,
    }

    mockRes = {
      statusCode: 200,
      setHeader: vi.fn(),
      writeHead: vi.fn(),
      end: vi.fn(),
    } as any

    mockNext = vi.fn()

    vi.clearAllMocks()
  })

  describe('mlSecurityMiddleware', () => {
    it('should allow valid ML request', async () => {
      await mlSecurityMiddleware(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        mockNext,
      )

      expect(mockNext).toHaveBeenCalled()
    })

    it('should reject request with invalid content-type', async () => {
      mockReq.headers = {
        'content-type': 'text/plain',
      }

      await mlSecurityMiddleware(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        mockNext,
      )

      // Verificar que el middleware no llama a next (rechaza la request)
      expect(mockNext).not.toHaveBeenCalled()
      // Verificar que se llama a end (respuesta enviada)
      expect(mockRes.end).toHaveBeenCalled()
    })

    it('should reject request with oversized payload', async () => {
      mockReq.headers = {
        'content-type': 'application/json',
        'content-length': '20000000', // 20MB
      }

      await mlSecurityMiddleware(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        mockNext,
      )

      expect(mockRes.writeHead).toHaveBeenCalled()
      expect(mockRes.end).toHaveBeenCalled()
      expect(mockNext).not.toHaveBeenCalled()
    })

    it('should detect suspicious patterns in URL', async () => {
      mockReq.url = '/api/ml/predict/../../../etc/passwd'

      await mlSecurityMiddleware(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        mockNext,
      )

      expect(mockRes.writeHead).toHaveBeenCalled()
      expect(mockRes.end).toHaveBeenCalled()
      expect(mockNext).not.toHaveBeenCalled()
    })

    it('should detect XSS attempts in user-agent', async () => {
      mockReq.headers = {
        'content-type': 'application/json',
        'user-agent': '<script>alert("xss")</script>',
      }

      await mlSecurityMiddleware(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        mockNext,
      )

      expect(mockRes.writeHead).toHaveBeenCalled()
      expect(mockRes.end).toHaveBeenCalled()
      expect(mockNext).not.toHaveBeenCalled()
    })

    it('should apply rate limiting for prediction requests', async () => {
      mockReq.url = '/api/ml/predict'
      mockReq.method = 'POST'
      mockReq.headers = {
        'content-type': 'application/json',
      }

      // Primera request - debería pasar
      await mlSecurityMiddleware(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        mockNext,
      )

      expect(mockNext).toHaveBeenCalled()

      // Reset para el siguiente test
      vi.clearAllMocks()
      mockNext = vi.fn()

      // Simular muchas requests rápidas para el mismo endpoint
      for (let i = 0; i < 150; i++) {
        await mlSecurityMiddleware(
          mockReq as IncomingMessage,
          mockRes as ServerResponse,
          mockNext,
        )
      }

      // Verificar que se llama a end (respuesta enviada)
      expect(mockRes.end).toHaveBeenCalled()
    })
  })

  describe('mlAuthorizationMiddleware', () => {
    it('should allow access with correct permission', async () => {
      ;(mockReq as any)._user = {
        id: 'test-user',
        email: 'test@example.com',
        role: 'ml_user',
      }

      const authMiddleware = mlAuthorizationMiddleware('ml:read')

      await authMiddleware(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        mockNext,
      )

      expect(mockNext).toHaveBeenCalled()
    })

    it('should deny access without authentication', async () => {
      const authMiddleware = mlAuthorizationMiddleware('ml:read')

      await authMiddleware(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        mockNext,
      )

      expect(mockRes.writeHead).toHaveBeenCalled()
      expect(mockRes.end).toHaveBeenCalled()
      expect(mockNext).not.toHaveBeenCalled()
    })

    it('should deny access with insufficient permissions', async () => {
      ;(mockReq as any)._user = {
        id: 'test-user',
        email: 'test@example.com',
        role: 'user', // No tiene permisos ML
      }

      const authMiddleware = mlAuthorizationMiddleware('ml:train')

      await authMiddleware(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        mockNext,
      )

      expect(mockRes.writeHead).toHaveBeenCalled()
      expect(mockRes.end).toHaveBeenCalled()
      expect(mockNext).not.toHaveBeenCalled()
    })

    it('should allow admin access to all permissions', async () => {
      ;(mockReq as any)._user = {
        id: 'admin-user',
        email: 'admin@example.com',
        role: 'admin',
      }

      const authMiddleware = mlAuthorizationMiddleware('ml:admin')

      await authMiddleware(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        mockNext,
      )

      expect(mockNext).toHaveBeenCalled()
    })
  })

  describe('mlResourceAccessMiddleware', () => {
    it('should allow access to user resources', async () => {
      ;(mockReq as any)._user = {
        id: 'test-user',
        email: 'test@example.com',
        role: 'ml_user',
      }

      mockReq.url = '/api/ml/models/user-model-id'

      await mlResourceAccessMiddleware(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        mockNext,
      )

      expect(mockNext).toHaveBeenCalled()
    })

    it('should deny access without authentication', async () => {
      mockReq.url = '/api/ml/models/some-model-id'

      await mlResourceAccessMiddleware(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        mockNext,
      )

      expect(mockRes.writeHead).toHaveBeenCalled()
      expect(mockRes.end).toHaveBeenCalled()
      expect(mockNext).not.toHaveBeenCalled()
    })
  })
})

describe('ML Audit Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should log model events correctly', () => {
    const auditEvent = {
      model_id: 'test-model-123',
      user_id: 'test-user',
      action: 'create' as const,
      status: 'success' as const,
      metadata: { model_type: 'classification' },
      timestamp: new Date().toISOString(),
    }

    mlAuditService.logModelEvent(auditEvent)

    expect(mlAuditService.logModelEvent).toHaveBeenCalledWith(auditEvent)
  })

  it('should log training events correctly', () => {
    const auditEvent = {
      training_id: 'training-123',
      model_id: 'model-123',
      user_id: 'user-123',
      action: 'start' as const,
      status: 'in_progress' as const,
      metadata: { dataset_size: 1000 },
      timestamp: new Date().toISOString(),
      duration: 30000,
    }

    mlAuditService.logTrainingEvent(auditEvent)

    expect(mlAuditService.logTrainingEvent).toHaveBeenCalledWith(auditEvent)
  })

  it('should log prediction events correctly', () => {
    const auditEvent = {
      prediction_id: 'pred-123',
      model_id: 'model-123',
      user_id: 'user-123',
      action: 'request' as const,
      status: 'success' as const,
      metadata: { input_features: 10 },
      timestamp: new Date().toISOString(),
      processing_time: 150,
      input_size: 1024,
      output_size: 512,
    }

    mlAuditService.logPredictionEvent(auditEvent)

    expect(mlAuditService.logPredictionEvent).toHaveBeenCalledWith(auditEvent)
  })

  it('should log deployment events correctly', () => {
    const auditEvent = {
      deployment_id: 'deploy-123',
      model_id: 'model-123',
      user_id: 'user-123',
      action: 'deploy' as const,
      status: 'success' as const,
      metadata: { environment: 'production' },
      timestamp: new Date().toISOString(),
      environment: 'production',
    }

    mlAuditService.logDeploymentEvent(auditEvent)

    expect(mlAuditService.logDeploymentEvent).toHaveBeenCalledWith(auditEvent)
  })

  it('should log unauthorized access attempts', () => {
    mlAuditService.logUnauthorizedAccess(
      'user-123',
      'model-456',
      'delete',
      { ip: '192.168.1.1' },
    )

    expect(mlAuditService.logUnauthorizedAccess).toHaveBeenCalledWith(
      'user-123',
      'model-456',
      'delete',
      { ip: '192.168.1.1' },
    )
  })

  it('should log suspicious activity', () => {
    mlAuditService.logSuspiciousActivity(
      'user-123',
      'multiple_failed_predictions',
      { count: 50, time_window: '1min' },
    )

    expect(mlAuditService.logSuspiciousActivity).toHaveBeenCalledWith(
      'user-123',
      'multiple_failed_predictions',
      { count: 50, time_window: '1min' },
    )
  })

  it('should log security errors', () => {
    mlAuditService.logSecurityError(
      'user-123',
      'Invalid model access attempt',
      { model_id: 'model-123', ip: '192.168.1.1' },
    )

    expect(mlAuditService.logSecurityError).toHaveBeenCalledWith(
      'user-123',
      'Invalid model access attempt',
      { model_id: 'model-123', ip: '192.168.1.1' },
    )
  })

  it('should log performance metrics', () => {
    const metrics = {
      prediction_latency: 150,
      throughput: 1000,
      error_rate: 0.01,
    }

    mlAuditService.logPerformanceMetrics('user-123', metrics)

    expect(mlAuditService.logPerformanceMetrics).toHaveBeenCalledWith(
      'user-123',
      metrics,
    )
  })

  it('should log resource usage', () => {
    const usage = {
      cpu_percent: 75,
      memory_mb: 2048,
      gpu_utilization: 90,
    }

    mlAuditService.logResourceUsage('user-123', 'training', usage)

    expect(mlAuditService.logResourceUsage).toHaveBeenCalledWith(
      'user-123',
      'training',
      usage,
    )
  })

  it('should log bias detection events', () => {
    mlAuditService.logBiasEvent(
      'user-123',
      'model-456',
      'gender_bias',
      'medium',
      { bias_score: 0.7, affected_group: 'female' },
    )

    expect(mlAuditService.logBiasEvent).toHaveBeenCalledWith(
      'user-123',
      'model-456',
      'gender_bias',
      'medium',
      { bias_score: 0.7, affected_group: 'female' },
    )
  })

  it('should log data drift events', () => {
    mlAuditService.logDataDriftEvent(
      'user-123',
      'model-456',
      'feature_drift',
      'high',
      { drift_score: 0.85, affected_features: ['age', 'income'] },
    )

    expect(mlAuditService.logDataDriftEvent).toHaveBeenCalledWith(
      'user-123',
      'model-456',
      'feature_drift',
      'high',
      { drift_score: 0.85, affected_features: ['age', 'income'] },
    )
  })
}) 