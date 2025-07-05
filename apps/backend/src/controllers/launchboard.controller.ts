import { IncomingMessage, ServerResponse } from 'http'
import { launchboardService } from '../services/launchboard.service.js'
import type { AuthenticatedUser, RequestBody } from '../types/express/index.js'

export const launchboardController = {
  async getDashboards(
    req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    body?: RequestBody,
    user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const dashboards = await launchboardService.getDashboards()
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: true, data: dashboards }))
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: false, error: 'Internal server error' }))
    }
  },

  async getDashboardById(
    req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    body?: RequestBody,
    user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const { id } = params || {}
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
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: false, error: 'Internal server error' }))
    }
  },

  async createDashboard(
    req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    body?: RequestBody,
    user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const { name, widgets } = body || {}
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
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: false, error: 'Internal server error' }))
    }
  },

  async updateDashboard(
    req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    body?: RequestBody,
    user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const { id } = params || {}
      if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, error: 'Dashboard ID is required' }))
        return
      }
      const { name, widgets } = body || {}
      const dashboard = await launchboardService.updateDashboard(id, {
        name: name as string,
        widgets: widgets as any[],
      })
      if (!dashboard) {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, message: 'Dashboard not found' }))
        return
      }
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: true, data: dashboard }))
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: false, error: 'Internal server error' }))
    }
  },

  async deleteDashboard(
    req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    body?: RequestBody,
    user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const { id } = params || {}
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
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: false, error: 'Internal server error' }))
    }
  },

  // Alias methods for route compatibility
  getLaunchboard: async (req: IncomingMessage, res: ServerResponse, params?: Record<string, string>, body?: RequestBody, user?: AuthenticatedUser) => {
    return launchboardController.getDashboards(req, res, params, body, user)
  },
  createLaunchboardItem: async (req: IncomingMessage, res: ServerResponse, params?: Record<string, string>, body?: RequestBody, user?: AuthenticatedUser) => {
    return launchboardController.createDashboard(req, res, params, body, user)
  },
  getLaunchboardItemById: async (req: IncomingMessage, res: ServerResponse, params?: Record<string, string>, body?: RequestBody, user?: AuthenticatedUser) => {
    return launchboardController.getDashboardById(req, res, params, body, user)
  },
  updateLaunchboardItem: async (req: IncomingMessage, res: ServerResponse, params?: Record<string, string>, body?: RequestBody, user?: AuthenticatedUser) => {
    return launchboardController.updateDashboard(req, res, params, body, user)
  },
  deleteLaunchboardItem: async (req: IncomingMessage, res: ServerResponse, params?: Record<string, string>, body?: RequestBody, user?: AuthenticatedUser) => {
    return launchboardController.deleteDashboard(req, res, params, body, user)
  },
}
