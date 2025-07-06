import { IncomingMessage, ServerResponse } from 'http'

import { launchboardService } from '../services/launchboard.service.js'
import type { AuthenticatedUser, RequestBody } from '../types/express/index.js'

export const launchboardController = {
  async getDashboards(req: IncomingMessage, res: ServerResponse): Promise<void> {
    try {
      const dashboards = await launchboardService.getDashboards()
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: true, data: dashboards }))
    } catch {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: false, error: 'Internal server error' }))
    }
  },

  async getDashboardById(req: IncomingMessage, res: ServerResponse, _params?: Record<string, string>): Promise<void> {
    try {
      const { id } = _params || {}
      if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, error: 'Dashboard ID is required' }))
        return
      }
      const dashboard = await launchboardService.getDashboardById(id)
      if (!dashboard) {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, message: 'Dashboard not found' }))
        return
      }
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: true, data: dashboard }))
    } catch {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: false, error: 'Internal server error' }))
    }
  },

  async createDashboard(req: IncomingMessage, res: ServerResponse, _body?: RequestBody): Promise<void> {
    try {
      const { name, widgets } = _body || {}
      if (!name || typeof name !== 'string' || !widgets || !Array.isArray(widgets)) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, message: 'Invalid data' }))
        return
      }
      const dashboard = await launchboardService.createDashboard({
        name,
        widgets,
      })
      res.writeHead(201, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: true, data: dashboard }))
    } catch {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: false, error: 'Internal server error' }))
    }
  },

  async updateDashboard(req: IncomingMessage, res: ServerResponse, _params?: Record<string, string>, _body?: RequestBody): Promise<void> {
    try {
      const { id } = _params || {}
      if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, error: 'Dashboard ID is required' }))
        return
      }
      const { name, widgets } = _body || {}
      const dashboard = await launchboardService.updateDashboard(id, {
        name: name as string,
        widgets: Array.isArray(widgets) ? widgets as unknown[] : [],
      })
      if (!dashboard) {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, message: 'Dashboard not found' }))
        return
      }
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: true, data: dashboard }))
    } catch {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: false, error: 'Internal server error' }))
    }
  },

  async deleteDashboard(req: IncomingMessage, res: ServerResponse, _params?: Record<string, string>): Promise<void> {
    try {
      const { id } = _params || {}
      if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, error: 'Dashboard ID is required' }))
        return
      }
      const deleted = await launchboardService.deleteDashboard(id)
      if (!deleted) {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, message: 'Dashboard not found' }))
        return
      }
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: true }))
    } catch {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: false, error: 'Internal server error' }))
    }
  },

  // Alias methods for route compatibility
  getLaunchboard: async (req: IncomingMessage, res: ServerResponse, _params?: Record<string, string>, _body?: RequestBody, user?: AuthenticatedUser) => {
    return launchboardController.getDashboards(req, res, _params, _body, user)
  },
  createLaunchboardItem: async (req: IncomingMessage, res: ServerResponse, _params?: Record<string, string>, _body?: RequestBody, user?: AuthenticatedUser) => {
    return launchboardController.createDashboard(req, res, _params, _body, user)
  },
  getLaunchboardItemById: async (req: IncomingMessage, res: ServerResponse, _params?: Record<string, string>, _body?: RequestBody, user?: AuthenticatedUser) => {
    return launchboardController.getDashboardById(req, res, _params, _body, user)
  },
  updateLaunchboardItem: async (req: IncomingMessage, res: ServerResponse, _params?: Record<string, string>, _body?: RequestBody, user?: AuthenticatedUser) => {
    return launchboardController.updateDashboard(req, res, _params, _body, user)
  },
  deleteLaunchboardItem: async (req: IncomingMessage, res: ServerResponse, _params?: Record<string, string>, _body?: RequestBody, user?: AuthenticatedUser) => {
    return launchboardController.deleteDashboard(req, res, _params, _body, user)
  },
}
