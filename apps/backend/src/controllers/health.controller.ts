
import type { ControllerHandler } from '../types/express/index.js'

export const healthController = {
  /**
   * Health check endpoint
   */
  getHealth: (async (_req, res, _params, _body, _user) => {
    try {
      const health = {
        status: 'healthy',
        message: 'STRATO Engine is running',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        version: process.version,
      }

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: true,
        data: health,
      }))
    } catch {
      res.writeHead(503, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: false,
        error: 'Service unavailable',
        timestamp: new Date().toISOString(),
      }))
    }
  }) as ControllerHandler,
}
