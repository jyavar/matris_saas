import { IncomingMessage, ServerResponse } from 'http'
import { MLService } from '../services/ml.service.js'
import { ServiceHealth } from '../types/ml.types.js'
import { sendSuccess, sendError } from '../utils/response.helper.js'
import type { ControllerHandler } from '../types/express/index.js'

const mlService = new MLService()

export const mlController = {
  getHealth: (async (_req: IncomingMessage, res: ServerResponse) => {
    try {
      const health = await mlService.checkHealth()
      return sendSuccess(res, health)
    } catch {
      return sendError(res, 'Health check failed', 500)
    }
  }) as ControllerHandler,

  getMetrics: (async (_req: IncomingMessage, res: ServerResponse) => {
    try {
      const metrics = await mlService.getGlobalMetrics()
      return sendSuccess(res, metrics)
    } catch {
      return sendError(res, 'Failed to get metrics', 500)
    }
  }) as ControllerHandler,

  getStatus: (async (_req: IncomingMessage, res: ServerResponse) => {
    try {
      const status = await mlService.getSystemStatus()
      return sendSuccess(res, status)
    } catch {
      return sendError(res, 'Failed to get status', 500)
    }
  }) as ControllerHandler,
} 