/* eslint-disable @typescript-eslint/no-unused-vars */
import { IncomingMessage, ServerResponse } from 'http'
import { z } from 'zod'

import type {
  CreateDashboardData,
  UpdateDashboardData,
  CreateWidgetData,
  UpdateWidgetData,
} from '../services/launchboard.service.js'
import { launchboardService } from '../services/launchboard.service.js'
import type { AuthenticatedUser, RequestBody } from '../types/express/index.js'
import { sendCreated, sendError, sendSuccess, sendValidationError } from '../utils/response.helper.js'

// Schemas de validación
const createDashboardSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  is_default: z.boolean().optional(),
  layout: z.record(z.unknown()).optional(),
  settings: z.record(z.unknown()).optional(),
})

const updateDashboardSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  description: z.string().optional(),
  is_default: z.boolean().optional(),
  layout: z.record(z.unknown()).optional(),
  settings: z.record(z.unknown()).optional(),
})

const createWidgetSchema = z.object({
  dashboard_id: z.string().min(1, 'Dashboard ID is required'),
  name: z.string().min(1, 'Name is required'),
  type: z.string().min(1, 'Type is required'),
  position: z.record(z.unknown()).optional(),
  size: z.record(z.unknown()).optional(),
  config: z.record(z.unknown()).optional(),
  refresh_interval: z.number().min(30).max(3600).optional(),
})

const updateWidgetSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  position: z.record(z.unknown()).optional(),
  size: z.record(z.unknown()).optional(),
  config: z.record(z.unknown()).optional(),
  data: z.record(z.unknown()).optional(),
  refresh_interval: z.number().min(30).max(3600).optional(),
  is_active: z.boolean().optional(),
})

export const launchboardController = {
  /**
   * GET /api/launchboard/dashboards - Obtener todos los dashboards del usuario
   */
  async getDashboards(
    _req: IncomingMessage,
    res: ServerResponse,
    _params?: Record<string, string>,
    _body?: RequestBody,
    user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      if (!user?.id) {
        return sendError(res, 'User not authenticated', 401)
      }

      const dashboards = await launchboardService.getDashboards(user.id)
      return sendSuccess(res, dashboards)
    } catch (error) {
      return sendError(res, 'Internal server error', 500)
    }
  },

  /**
   * GET /api/launchboard/dashboards/:id - Obtener dashboard por ID
   */
  async getDashboardById(
    _req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    _body?: RequestBody,
    user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      if (!user?.id) {
        return sendError(res, 'User not authenticated', 401)
      }

      const { id } = params || {}
      if (!id) {
        return sendError(res, 'Dashboard ID is required', 400)
      }

      const dashboard = await launchboardService.getDashboardById(id, user.id)
      if (!dashboard) {
        return sendError(res, 'Dashboard not found', 404)
      }

      return sendSuccess(res, dashboard)
    } catch (error) {
      return sendError(res, 'Internal server error', 500)
    }
  },

  /**
   * POST /api/launchboard/dashboards - Crear nuevo dashboard
   */
  async createDashboard(
    _req: IncomingMessage,
    res: ServerResponse,
    _params?: Record<string, string>,
    body?: RequestBody,
    user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      if (!user?.id) {
        return sendError(res, 'User not authenticated', 401)
      }

      // Validar datos de entrada
      const validatedData = createDashboardSchema.parse(body)

      const dashboard = await launchboardService.createDashboard(
        validatedData as CreateDashboardData,
        user.id,
      )

      return sendCreated(res, dashboard)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return sendValidationError(res, error.errors, 'Invalid input data')
      } else {
        return sendError(res, 'Internal server error', 500)
      }
    }
  },

  /**
   * PUT /api/launchboard/dashboards/:id - Actualizar dashboard
   */
  async updateDashboard(
    _req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    body?: RequestBody,
    user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      if (!user?.id) {
        return sendError(res, 'User not authenticated', 401)
      }

      const { id } = params || {}
      if (!id) {
        return sendError(res, 'Dashboard ID is required', 400)
      }

      // Validar datos de entrada
      const validatedData = updateDashboardSchema.parse(body)

      const dashboard = await launchboardService.updateDashboard(
        id,
        validatedData as UpdateDashboardData,
        user.id,
      )

      if (!dashboard) {
        return sendError(res, 'Dashboard not found', 404)
      }

      return sendSuccess(res, dashboard)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return sendValidationError(res, error.errors, 'Invalid input data')
      } else {
        return sendError(res, 'Internal server error', 500)
      }
    }
  },

  /**
   * DELETE /api/launchboard/dashboards/:id - Eliminar dashboard
   */
  async deleteDashboard(
    _req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    _body?: RequestBody,
    user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      if (!user?.id) {
        return sendError(res, 'User not authenticated', 401)
      }

      const { id } = params || {}
      if (!id) {
        return sendError(res, 'Dashboard ID is required', 400)
      }

      const deleted = await launchboardService.deleteDashboard(id, user.id)
      if (!deleted) {
        return sendError(res, 'Dashboard not found', 404)
      }

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: true, message: 'Dashboard deleted' }))
    } catch (error) {
      return sendError(res, 'Internal server error', 500)
    }
  },

  /**
   * GET /api/launchboard/dashboards/:id/widgets - Obtener widgets de un dashboard
   */
  async getWidgets(
    _req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    _body?: RequestBody,
    user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      if (!user?.id) {
        return sendError(res, 'User not authenticated', 401)
      }

      const { id } = params || {}
      if (!id) {
        return sendError(res, 'Dashboard ID is required', 400)
      }

      const widgets = await launchboardService.getWidgets(id, user.id)
      return sendSuccess(res, widgets)
    } catch (error) {
      return sendError(res, 'Internal server error', 500)
    }
  },

  /**
   * POST /api/launchboard/widgets - Crear nuevo widget
   */
  async createWidget(
    _req: IncomingMessage,
    res: ServerResponse,
    _params?: Record<string, string>,
    body?: RequestBody,
    user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      if (!user?.id) {
        return sendError(res, 'User not authenticated', 401)
      }

      // Validar datos de entrada
      const validatedData = createWidgetSchema.parse(body)

      const widget = await launchboardService.createWidget(
        validatedData as CreateWidgetData,
        user.id,
      )

      return sendCreated(res, widget)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return sendValidationError(res, error.errors, 'Invalid input data')
      } else {
        return sendError(res, 'Internal server error', 500)
      }
    }
  },

  /**
   * PUT /api/launchboard/widgets/:id - Actualizar widget
   */
  async updateWidget(
    _req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    body?: RequestBody,
    user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      if (!user?.id) {
        return sendError(res, 'User not authenticated', 401)
      }

      const { id } = params || {}
      if (!id) {
        return sendError(res, 'Widget ID is required', 400)
      }

      // Validar datos de entrada
      const validatedData = updateWidgetSchema.parse(body)

      const widget = await launchboardService.updateWidget(
        id,
        validatedData as UpdateWidgetData,
        user.id,
      )

      if (!widget) {
        return sendError(res, 'Widget not found', 404)
      }

      return sendSuccess(res, widget)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return sendValidationError(res, error.errors, 'Invalid input data')
      } else {
        return sendError(res, 'Internal server error', 500)
      }
    }
  },

  /**
   * DELETE /api/launchboard/widgets/:id - Eliminar widget
   */
  async deleteWidget(
    _req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    _body?: RequestBody,
    user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      if (!user?.id) {
        return sendError(res, 'User not authenticated', 401)
      }

      const { id } = params || {}
      if (!id) {
        return sendError(res, 'Widget ID is required', 400)
      }

      const deleted = await launchboardService.deleteWidget(id, user.id)
      if (!deleted) {
        return sendError(res, 'Widget not found', 404)
      }

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: true, message: 'Widget deleted' }))
    } catch (error) {
      return sendError(res, 'Internal server error', 500)
    }
  },

  /**
   * GET /api/launchboard/widget-types - Obtener tipos de widgets disponibles
   */
  async getWidgetTypes(
    _req: IncomingMessage,
    res: ServerResponse,
    _params?: Record<string, string>,
    _body?: RequestBody,
    _user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const widgetTypes = await launchboardService.getWidgetTypes()
      return sendSuccess(res, widgetTypes)
    } catch (error) {
      return sendError(res, 'Internal server error', 500)
    }
  },

  // Alias methods for route compatibility
  getLaunchboard: async (
    _req: IncomingMessage,
    res: ServerResponse,
    user?: AuthenticatedUser,
  ) => {
    return launchboardController.getDashboards(_req, res, undefined, undefined, user)
  },
  createLaunchboardItem: async (
    _req: IncomingMessage,
    res: ServerResponse,
    _params?: Record<string, string>,
    body?: RequestBody,
    user?: AuthenticatedUser,
  ) => {
    return launchboardController.createDashboard(_req, res, _params, body, user)
  },
  getLaunchboardItemById: async (
    _req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    _body?: RequestBody,
    user?: AuthenticatedUser,
  ) => {
    return launchboardController.getDashboardById(_req, res, params, _body, user)
  },
  updateLaunchboardItem: async (
    _req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    body?: RequestBody,
    user?: AuthenticatedUser,
  ) => {
    return launchboardController.updateDashboard(_req, res, params, body, user)
  },
  deleteLaunchboardItem: async (
    _req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    _body?: RequestBody,
    user?: AuthenticatedUser,
  ) => {
    return launchboardController.deleteDashboard(_req, res, params, _body, user)
  },
}
