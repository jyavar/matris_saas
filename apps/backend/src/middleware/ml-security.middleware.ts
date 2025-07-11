import { IncomingMessage, ServerResponse } from 'http'
import { z } from 'zod'

import { logAction } from '../services/logger.service.js'
import type { MiddlewareHandler } from '../types/express/index.js'
import { sendError, sendUnauthorized, sendForbidden } from '../utils/response.helper.js'

// Schemas de validación para ML
const mlRequestSchema = z.object({
  model_id: z.string().uuid().optional(),
  dataset_id: z.string().uuid().optional(),
  input_data: z.any().optional(),
  parameters: z.record(z.any()).optional(),
})

const mlPredictionSchema = z.object({
  model_id: z.string().uuid(),
  input_data: z.any(),
  parameters: z.record(z.any()).optional(),
})

const mlTrainingSchema = z.object({
  model_id: z.string().uuid(),
  dataset_id: z.string().uuid(),
  parameters: z.record(z.any()),
  hyperparameters: z.record(z.any()).optional(),
})

// Configuración de límites de seguridad
const ML_SECURITY_CONFIG = {
  MAX_PAYLOAD_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_PREDICTION_INPUT_SIZE: 1024 * 1024, // 1MB
  MAX_TRAINING_DURATION: 24 * 60 * 60 * 1000, // 24 horas
  ALLOWED_MODEL_TYPES: ['classification', 'regression', 'clustering', 'nlp'],
  ALLOWED_DATASET_FORMATS: ['csv', 'json', 'parquet'],
  RATE_LIMITS: {
    PREDICTION: { requests: 100, window: 60 * 1000 }, // 100 requests/min
    TRAINING: { requests: 10, window: 60 * 1000 }, // 10 requests/min
    DEPLOYMENT: { requests: 5, window: 60 * 1000 }, // 5 requests/min
  },
}

// Store para rate limiting
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

/**
 * Middleware de seguridad específico para ML
 * Implementa validaciones estrictas, rate limiting y auditoría
 */
export const mlSecurityMiddleware: MiddlewareHandler = async (
  req: IncomingMessage,
  res: ServerResponse,
  _next: () => void,
): Promise<void> => {
  try {
    const startTime = Date.now()
    const ip = req.socket.remoteAddress
    const userAgent = req.headers['user-agent']
    const userId = (req as any)._user?.id || 'anonymous'

    // 1. Validación de headers de seguridad
    if (!validateSecurityHeaders(req)) {
      logAction('ml_security_headers_failed', userId, {
        ip,
        user_agent: userAgent,
        url: req.url,
        method: req.method,
      })
      return sendForbidden(res, 'Invalid security headers')
    }

    // 2. Rate limiting específico para ML
    const rateLimitResult = await checkMLRateLimit(req, userId, ip)
    if (!rateLimitResult.allowed) {
      logAction('ml_rate_limit_exceeded', userId, {
        ip,
        user_agent: userAgent,
        url: req.url,
        method: req.method,
        limit_type: rateLimitResult.limitType,
        retry_after: rateLimitResult.retryAfter,
      })
      res.setHeader('Retry-After', rateLimitResult.retryAfter.toString())
      return sendForbidden(res, 'Rate limit exceeded for ML operations')
    }

    // 3. Validación de payload para operaciones ML
    if (req.method === 'POST' || req.method === 'PUT') {
      const validationResult = await validateMLPayload(req)
      if (!validationResult.valid) {
        logAction('ml_payload_validation_failed', userId, {
          ip,
          user_agent: userAgent,
          url: req.url,
          method: req.method,
          errors: validationResult.errors,
        })
        return sendError(res, 'Invalid ML payload', 400, {
          validation_errors: validationResult.errors,
        })
      }
    }

    // 4. Detección de patrones sospechosos
    if (isSuspiciousMLRequest(req)) {
      logAction('ml_suspicious_request', userId, {
        ip,
        user_agent: userAgent,
        url: req.url,
        method: req.method,
        reason: 'Suspicious ML operation pattern detected',
      })
      return sendForbidden(res, 'Suspicious operation detected')
    }

    // 5. Auditoría de acceso ML
    logAction('ml_access_granted', userId, {
      ip,
      user_agent: userAgent,
      url: req.url,
      method: req.method,
      processing_time: Date.now() - startTime,
    })

    _next()
  } catch (error) {
    logAction('ml_security_error', 'anonymous', {
      _error: error instanceof Error ? error.message : 'Unknown error',
      ip: req.socket.remoteAddress,
      url: req.url,
      method: req.method,
    })
    return sendError(res, 'ML security check failed', 500)
  }
}

/**
 * Middleware de autorización específico para ML
 * Verifica permisos específicos para operaciones ML
 */
export const mlAuthorizationMiddleware = (requiredPermission: string): MiddlewareHandler => {
  return async (
    req: IncomingMessage,
    res: ServerResponse,
    _next: () => void,
  ): Promise<void> => {
    try {
      const user = (req as any)._user
      if (!user) {
        return sendUnauthorized(res, 'Authentication required for ML operations')
      }

      // Verificar permisos específicos de ML
      const hasPermission = await checkMLPermission(user, requiredPermission)
      if (!hasPermission) {
        logAction('ml_permission_denied', user.id, {
          required_permission: requiredPermission,
          user_role: user.role,
          ip: req.socket.remoteAddress,
          url: req.url,
          method: req.method,
        })
        return sendForbidden(res, 'Insufficient permissions for ML operation')
      }

      logAction('ml_permission_granted', user.id, {
        required_permission: requiredPermission,
        user_role: user.role,
        ip: req.socket.remoteAddress,
        url: req.url,
        method: req.method,
      })

      _next()
    } catch (error) {
      logAction('ml_authorization_error', 'anonymous', {
        _error: error instanceof Error ? error.message : 'Unknown error',
        ip: req.socket.remoteAddress,
        url: req.url,
        method: req.method,
      })
      return sendError(res, 'ML authorization failed', 500)
    }
  }
}

/**
 * Middleware de validación de recursos ML
 * Verifica que el usuario tenga acceso a los recursos ML específicos
 */
export const mlResourceAccessMiddleware: MiddlewareHandler = async (
  req: IncomingMessage,
  res: ServerResponse,
  _next: () => void,
): Promise<void> => {
  try {
    const user = (req as any)._user
    if (!user) {
      return sendUnauthorized(res, 'Authentication required')
    }

    // Extraer IDs de recursos de la URL o body
    const resourceIds = extractMLResourceIds(req)
    
    for (const resourceId of resourceIds) {
      const hasAccess = await checkMLResourceAccess(user, resourceId)
      if (!hasAccess) {
        logAction('ml_resource_access_denied', user.id, {
          resource_id: resourceId,
          user_role: user.role,
          ip: req.socket.remoteAddress,
          url: req.url,
          method: req.method,
        })
        return sendForbidden(res, 'Access denied to ML resource')
      }
    }

    _next()
  } catch (error) {
    logAction('ml_resource_access_error', 'anonymous', {
      _error: error instanceof Error ? error.message : 'Unknown error',
      ip: req.socket.remoteAddress,
      url: req.url,
      method: req.method,
    })
    return sendError(res, 'ML resource access check failed', 500)
  }
}

// Funciones auxiliares de seguridad

function validateSecurityHeaders(req: IncomingMessage): boolean {
  const contentType = req.headers['content-type']
  const contentLength = parseInt(req.headers['content-length'] || '0')
  
  // Validar Content-Type para operaciones ML
  if (req.method === 'POST' || req.method === 'PUT') {
    if (!contentType || !contentType.includes('application/json')) {
      return false
    }
  }

  // Validar tamaño de payload
  if (contentLength > ML_SECURITY_CONFIG.MAX_PAYLOAD_SIZE) {
    return false
  }

  return true
}

async function checkMLRateLimit(
  req: IncomingMessage,
  userId: string,
  ip: string,
): Promise<{ allowed: boolean; limitType?: string; retryAfter?: number }> {
  const key = `${userId}:${ip}`
  const now = Date.now()
  
  // Determinar tipo de límite basado en la operación
  let limitType = 'general'
  if (req.url?.includes('/predict')) {
    limitType = 'prediction'
  } else if (req.url?.includes('/train')) {
    limitType = 'training'
  } else if (req.url?.includes('/deploy')) {
    limitType = 'deployment'
  }

  const limits = ML_SECURITY_CONFIG.RATE_LIMITS[limitType as keyof typeof ML_SECURITY_CONFIG.RATE_LIMITS] || 
                 { requests: 100, window: 60 * 1000 }

  const current = rateLimitStore.get(key)
  
  if (!current || now > current.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + limits.window })
    return { allowed: true }
  }

  if (current.count >= limits.requests) {
    return { 
      allowed: false, 
      limitType, 
      retryAfter: Math.ceil((current.resetTime - now) / 1000) 
    }
  }

  current.count++
  return { allowed: true }
}

async function validateMLPayload(req: IncomingMessage): Promise<{ valid: boolean; errors?: string[] }> {
  try {
    const url = req.url || ''
    const errors: string[] = []

    // Validar payload según el tipo de operación
    if (url.includes('/predict')) {
      // Validar payload de predicción
      const body = await getRequestBody(req)
      const result = mlPredictionSchema.safeParse(body)
      if (!result.success) {
        errors.push(...result.error.errors.map(e => e.message))
      }
    } else if (url.includes('/train')) {
      // Validar payload de entrenamiento
      const body = await getRequestBody(req)
      const result = mlTrainingSchema.safeParse(body)
      if (!result.success) {
        errors.push(...result.error.errors.map(e => e.message))
      }
    }

    return { valid: errors.length === 0, errors }
  } catch (error) {
    return { valid: false, errors: ['Payload validation failed'] }
  }
}

function isSuspiciousMLRequest(req: IncomingMessage): boolean {
  const url = req.url || ''
  const userAgent = req.headers['user-agent'] || ''
  
  // Detectar patrones sospechosos
  const suspiciousPatterns = [
    /\.\.\//, // Path traversal
    /<script/i, // XSS attempts
    /union.*select/i, // SQL injection attempts
    /eval\(/i, // Code injection attempts
  ]

  // Verificar patrones en URL y User-Agent
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(url) || pattern.test(userAgent)) {
      return true
    }
  }

  // Verificar requests anómalos
  if (req.method === 'POST' && url.includes('/predict') && !req.headers['content-type']) {
    return true
  }

  return false
}

async function checkMLPermission(user: any, permission: string): Promise<boolean> {
  // Implementar lógica de permisos específica para ML
  const mlPermissions = {
    'ml:read': ['user', 'admin', 'ml_user'],
    'ml:write': ['admin', 'ml_user'],
    'ml:train': ['admin', 'ml_trainer'],
    'ml:deploy': ['admin', 'ml_deployer'],
    'ml:admin': ['admin'],
  }

  const allowedRoles = mlPermissions[permission as keyof typeof mlPermissions] || []
  return allowedRoles.includes(user.role)
}

async function checkMLResourceAccess(user: any, resourceId: string): Promise<boolean> {
  // Implementar verificación de acceso a recursos ML
  // Por ahora, permitir acceso a todos los recursos del usuario
  return true
}

function extractMLResourceIds(req: IncomingMessage): string[] {
  const url = req.url || ''
  const resourceIds: string[] = []

  // Extraer IDs de modelos, datasets, etc. de la URL
  const modelMatch = url.match(/\/models\/([a-f0-9-]+)/)
  if (modelMatch) {
    resourceIds.push(modelMatch[1])
  }

  const datasetMatch = url.match(/\/datasets\/([a-f0-9-]+)/)
  if (datasetMatch) {
    resourceIds.push(datasetMatch[1])
  }

  return resourceIds
}

async function getRequestBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk.toString()
    })
    req.on('end', () => {
      try {
        resolve(JSON.parse(body))
      } catch {
        reject(new Error('Invalid JSON'))
      }
    })
    req.on('error', reject)
  })
}

// Middleware de logging específico para ML
export const mlLoggingMiddleware: MiddlewareHandler = async (
  req: IncomingMessage,
  res: ServerResponse,
  _next: () => void,
): Promise<void> => {
  const startTime = Date.now()
  const userId = (req as any)._user?.id || 'anonymous'
  const ip = req.socket.remoteAddress

  // Log al inicio de la operación ML
  logAction('ml_operation_started', userId, {
    ip,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString(),
  })

  // Interceptar la respuesta para logging
  const originalEnd = res.end
  res.end = function(chunk?: any, encoding?: any) {
    const duration = Date.now() - startTime
    const statusCode = res.statusCode

    logAction('ml_operation_completed', userId, {
      ip,
      url: req.url,
      method: req.method,
      status_code: statusCode,
      duration,
      timestamp: new Date().toISOString(),
    })

    originalEnd.call(this, chunk, encoding)
  }

  _next()
} 