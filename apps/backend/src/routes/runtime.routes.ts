import { runtimeController } from '../controllers/runtime.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { handleAsync } from '../middleware/errorHandler.middleware.js'

export const runtimeRoutes = [
  { method: 'GET', path: '/status', handler: handleAsync(runtimeController.getStatus) },
  { method: 'GET', path: '/health', handler: handleAsync(runtimeController.getHealth) },
  { method: 'GET', path: '/metrics', middlewares: [authMiddleware], handler: handleAsync(runtimeController.getMetrics) },
  { method: 'GET', path: '/logs', middlewares: [authMiddleware], handler: handleAsync(runtimeController.getLogs) },
  { method: 'POST', path: '/restart', middlewares: [authMiddleware], handler: handleAsync(runtimeController.restart) },
  { method: 'POST', path: '/shutdown', middlewares: [authMiddleware], handler: handleAsync(runtimeController.shutdown) },
  { method: 'GET', path: '/config', middlewares: [authMiddleware], handler: handleAsync(runtimeController.getConfig) },
  { method: 'PUT', path: '/config', middlewares: [authMiddleware], handler: handleAsync(runtimeController.updateConfig) },
  { method: 'GET', path: '/agents', middlewares: [authMiddleware], handler: handleAsync(runtimeController.getAgents) },
  { method: 'POST', path: '/agents/:name/start', middlewares: [authMiddleware], handler: handleAsync(runtimeController.startAgent) },
  { method: 'POST', path: '/agents/:name/stop', middlewares: [authMiddleware], handler: handleAsync(runtimeController.stopAgent) },
  { method: 'GET', path: '/agents/:name/status', middlewares: [authMiddleware], handler: handleAsync(runtimeController.getAgentStatus) },
  { method: 'GET', path: '/agents/:name/logs', middlewares: [authMiddleware], handler: handleAsync(runtimeController.getAgentLogs) },
  { method: 'POST', path: '/agents/:name/run', middlewares: [authMiddleware], handler: handleAsync(runtimeController.runAgent) },
  { method: 'GET', path: '/tasks', middlewares: [authMiddleware], handler: handleAsync(runtimeController.getTasks) },
  { method: 'POST', path: '/tasks', middlewares: [authMiddleware], handler: handleAsync(runtimeController.createTask) },
  { method: 'GET', path: '/tasks/:id', middlewares: [authMiddleware], handler: handleAsync(runtimeController.getTaskById) },
  { method: 'PUT', path: '/tasks/:id', middlewares: [authMiddleware], handler: handleAsync(runtimeController.updateTask) },
  { method: 'DELETE', path: '/tasks/:id', middlewares: [authMiddleware], handler: handleAsync(runtimeController.deleteTask) },
  { method: 'POST', path: '/tasks/:id/execute', middlewares: [authMiddleware], handler: handleAsync(runtimeController.executeTask) },
  { method: 'GET', path: '/tasks/:id/result', middlewares: [authMiddleware], handler: handleAsync(runtimeController.getTaskResult) },
]
