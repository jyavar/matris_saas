import { z } from 'zod'

import { analyticsReportingService } from '../services/analytics-reporting.service.js'
import { ApiError } from '../utils/ApiError.js'

const createReportSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.string().min(1, 'Type is required'),
  data: z.record(z.unknown()),
})

export class AnalyticsReportingController {
  async getReports(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const reports = await analyticsReportingService.getReports()
      res
        .status(200)
        .json({ success: true, data: reports, count: reports.length })
    } catch (error) {
      next(error)
    }
  }

  async getReportById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params
      if (!id) throw new ApiError(400, 'Report ID is required')
      const report = await analyticsReportingService.getReportById(id)
      if (!report) throw new ApiError(404, 'Report not found')
      res.status(200).json({ success: true, data: report })
    } catch (error) {
      next(error)
    }
  }

  async createReport(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const validated = createReportSchema.parse(
        req.body,
      ) as import('../services/analytics-reporting.service').CreateReportData
      const report = await analyticsReportingService.createReport(validated)
      res
        .status(201)
        .json({ success: true, data: report, message: 'Report created' })
    } catch (error) {
      if (error instanceof z.ZodError) {
        next(new ApiError(400, 'Invalid input data'))
      } else {
        next(error)
      }
    }
  }

  async deleteReport(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params
      if (!id) throw new ApiError(400, 'Report ID is required')
      const deleted = await analyticsReportingService.deleteReport(id)
      if (!deleted) throw new ApiError(404, 'Report not found')
      res.status(200).json({ success: true, message: 'Report deleted' })
    } catch (error) {
      next(error)
    }
  }
}

export const analyticsReportingController = new AnalyticsReportingController()
