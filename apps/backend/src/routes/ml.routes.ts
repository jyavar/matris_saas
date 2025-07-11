import { mlController } from '../controllers/ml.controller.js'
import { mlSecurityMiddleware, mlAuthorizationMiddleware, mlResourceAccessMiddleware, mlLoggingMiddleware } from '../middleware/ml-security.middleware.js'
import type { RouteDefinition } from '../types/express/index.js'

export const mlRoutes: RouteDefinition[] = [
  // Rutas públicas (solo health check)
  { 
    method: 'GET', 
    path: '/health', 
    handler: mlController.getHealth,
    middlewares: [mlLoggingMiddleware]
  },
  
  // Rutas protegidas con seguridad ML
  { 
    method: 'GET', 
    path: '/metrics', 
    handler: mlController.getMetrics,
    middlewares: [
      mlSecurityMiddleware,
      mlAuthorizationMiddleware('ml:read'),
      mlLoggingMiddleware
    ]
  },
  
  { 
    method: 'GET', 
    path: '/status', 
    handler: mlController.getStatus,
    middlewares: [
      mlSecurityMiddleware,
      mlAuthorizationMiddleware('ml:read'),
      mlLoggingMiddleware
    ]
  },
] 