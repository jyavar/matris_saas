/* eslint-disable @typescript-eslint/no-unused-vars */
// Import Widget interface from service
import { IncomingMessage, ServerResponse } from 'http'

import type { Widget } from '../services/launchboard.service.js'
import { launchboardService } from '../services/launchboard.service.js'
import type { AuthenticatedUser, RequestBody } from '../types/express/index.js'
import { sendCreated, sendError, sendSuccess } from '../utils/response.helper.js'

export const launchboardController = {
  async getDashboards(
    _req: IncomingMessage,
    res: ServerResponse,
    
  ): Promise<void> {
    try {
      const dashboards = await launchboardService.getDashboards()
      return sendSuccess(res, dashboards)
    } catch {
      return sendError(res, 'Internal server error', 500)
    }
  },

  async getDashboardById(
    _req: IncomingMessage,
    res: ServerResponse,
    _params?: Record<string, string>,
    
  ): Promise<void> {
    try {
      const { id } = _params || {}
      if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({ success: false, error: 'Dashboard ID is required' }),
        )
        return
      }
      const dashboard = await launchboardService.getDashboardById(id)
      if (!dashboard) {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({ success: false, message: 'Dashboard not found' }),
        )
        return
      }
      return sendSuccess(res, dashboard)
    } catch {
      return sendError(res, 'Internal server error', 500)
    }
  },

  async createDashboard(
    _req: IncomingMessage,
    res: ServerResponse,
    _body?: RequestBody,
    
  ): Promise<void> {
    try {
      const { name, widgets } = _body || {}
      if (
        !name ||
        typeof name !== 'string' ||
        !widgets ||
        !Array.isArray(widgets)
      ) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, message: 'Invalid data' }))
        return
      }
      const dashboard = await launchboardService.createDashboard({
        name,
        widgets,
      })
      return sendCreated(res, dashboard)
    } catch {
      return sendError(res, 'Internal server error', 500)
    }
  },

  async updateDashboard(
    _req: IncomingMessage,
    res: ServerResponse,
    _params?: Record<string, string>,
    _body?: RequestBody,
    
  ): Promise<void> {
    try {
      const { id } = _params || {}
      if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({ success: false, error: 'Dashboard ID is required' }),
        )
        return
      }
      const { name, widgets } = _body || {}
      const dashboard = await launchboardService.updateDashboard(id, {
        name: name as string,
        widgets: Array.isArray(widgets) ? (widgets as Widget[]) : [],
      })
      if (!dashboard) {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({ success: false, message: 'Dashboard not found' }),
        )
        return
      }
      return sendSuccess(res, dashboard)
    } catch {
      return sendError(res, 'Internal server error', 500)
    }
  },

  async deleteDashboard(
    _req: IncomingMessage,
    res: ServerResponse,
    _params?: Record<string, string>,
    
  ): Promise<void> {
    try {
      const { id } = _params || {}
      if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({ success: false, error: 'Dashboard ID is required' }),
        )
        return
      }
      const deleted = await launchboardService.deleteDashboard(id)
      if (!deleted) {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({ success: false, message: 'Dashboard not found' }),
        )
        return
      }
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: true }))
    } catch {
      return sendError(res, 'Internal server error', 500)
    }
  },

  // Alias methods for route compatibility
  getLaunchboard: async (
    _req: IncomingMessage,
    res: ServerResponse,
    user?: AuthenticatedUser,
  ) => {
    return launchboardController.getDashboards(_req, res)
  },
  createLaunchboardItem: async (
    _req: IncomingMessage,
    res: ServerResponse,
    _params?: Record<string, string>,
    _body?: RequestBody,
    user?: AuthenticatedUser,
  ) => {
    return launchboardController.createDashboard(_req, res, _body)
  },
  getLaunchboardItemById: async (
    _req: IncomingMessage,
    res: ServerResponse,
    _params?: Record<string, string>,
    _body?: RequestBody,
    user?: AuthenticatedUser,
  ) => {
    return launchboardController.getDashboardById(_req, res, _params)
  },
  updateLaunchboardItem: async (
    _req: IncomingMessage,
    res: ServerResponse,
    _params?: Record<string, string>,
    _body?: RequestBody,
    user?: AuthenticatedUser,
  ) => {
    return launchboardController.updateDashboard(_req, res, _params, _body)
  },
  deleteLaunchboardItem: async (
    _req: IncomingMessage,
    res: ServerResponse,
    _params?: Record<string, string>,
    _body?: RequestBody,
    user?: AuthenticatedUser,
  ) => {
    return launchboardController.deleteDashboard(_req, res, _params)
  },
}
