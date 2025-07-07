import { IncomingMessage, ServerResponse } from 'http'
import { z } from 'zod'

import { analyticsReportingService } from '../services/analytics-reporting.service.js'
import type { AuthenticatedUser, RequestBody } from '../types/express/index.js'
import { sendCreated, sendError, sendSuccess, sendValidationError } from '../utils/response.helper.js'
const createReportSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.string().min(1, 'Type is required'),
  data: z.record(z.unknown()),
})

export const analyticsReportingController = {
  async getReports(req: IncomingMessage, res: ServerResponse, _user?: AuthenticatedUser): Promise<void> {
    try {
      const reports = await analyticsReportingService.getReports()
      return sendSuccess(res, { reports, count: reports.length })
    } catch {
      return sendError(res, 'Internal server error', 500)
    }
  },

  async getReportById(req: IncomingMessage, res: ServerResponse, _params?: Record<string, string>, _user?: AuthenticatedUser): Promise<void> {
    try {
      const { id } = _params || {}
      if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, error: 'Report ID is required' }))
        return
      }
      const report = await analyticsReportingService.getReportById(id)
      if (!report) {
        return
      }
      return sendSuccess(res, report )
    } catch {
      return sendError(res, 'Internal server error', 500)
    }
  },

  async createReport(req: IncomingMessage, res: ServerResponse, _body?: RequestBody, _user?: AuthenticatedUser): Promise<void> {
    try {
      const validated = createReportSchema.parse(
        _body,
      ) as import('../services/analytics-reporting.service').CreateReportData
      const report = await analyticsReportingService.createReport(validated)
      return sendCreated(res, report, 'Report created')
    } catch (error) {
      if (error instanceof z.ZodError) {
        return sendValidationError(res, error.errors, 'Invalid input data')
      } else {
        return sendError(res, 'Internal server error', 500)
      }
    }
  },

  async deleteReport(req: IncomingMessage, res: ServerResponse, _params?: Record<string, string>, _user?: AuthenticatedUser): Promise<void> {
    try {
      const { id } = _params || {}
      if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, error: 'Report ID is required' }))
        return
      }
      const deleted = await analyticsReportingService.deleteReport(id)
      if (!deleted) {
        return
      }
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: true, message: 'Report deleted' }))
    } catch {
      return sendError(res, 'Internal server error', 500)
    }
  },
}
