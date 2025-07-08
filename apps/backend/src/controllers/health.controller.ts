import type { ControllerHandler } from '../types/express/index.js'
import { sendError, sendSuccess } from '../utils/response.helper.js'

export const healthController = {
  /**
   * Health check endpoint
   */
  getHealth: (async (_req, res) => {
    try {
      const health = {
        status: 'healthy',
        message: 'STRATO Engine is running',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        version: process.version,
      }

      return sendSuccess(res, health)
    } catch {
      return sendError(res, 'Service unavailable', 503)
    }
  }) as ControllerHandler,
}
