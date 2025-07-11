import { IncomingMessage, ServerResponse } from 'http'
import { AnalyticsService } from '../services/analytics.service.js'
import { sendSuccess, sendError, sendValidationError, sendNotFound } from '../utils/response.helper.js'
import type { ControllerHandler, RequestBody } from '../types/express/index.js'

const analyticsService = new AnalyticsService()

export const analyticsController = {
  getAllAnalyses: (async (req: IncomingMessage, res: ServerResponse) => {
    try {
      const url = new URL(req.url || '', `http://${req.headers.host}`)
      const limit = parseInt(url.searchParams.get('limit') || '20')
      const offset = parseInt(url.searchParams.get('offset') || '0')
      const type = url.searchParams.get('type') || undefined
      const status = url.searchParams.get('status') || undefined

      const analyses = await analyticsService.getAllAnalyses(limit, offset, type, status)
      return sendSuccess(res, analyses)
    } catch {
      return sendError(res, 'Failed to get analyses', 500)
    }
  }) as ControllerHandler,

  getAnalysisById: (async (req: IncomingMessage, res: ServerResponse, params?: Record<string, string>) => {
    try {
      const id = params?.id
      if (!id) {
        return sendValidationError(res, { id: 'Analysis ID is required' }, 'Analysis ID is required')
      }

      const analysis = await analyticsService.getAnalysisById(id)
      if (!analysis) {
        return sendNotFound(res, 'Analysis not found')
      }

      return sendSuccess(res, analysis)
    } catch {
      return sendError(res, 'Failed to get analysis', 500)
    }
  }) as ControllerHandler,

  startAnalysis: (async (req: IncomingMessage, res: ServerResponse, _params?: Record<string, string>, body?: RequestBody) => {
    try {
      if (!body || !body.datasetId || !body.type) {
        return sendValidationError(
          res,
          {
            datasetId: 'Dataset ID is required',
            type: 'Analysis type is required',
          },
          'Dataset ID and analysis type are required'
        )
      }

      const analysis = await analyticsService.startAnalysis(
        body.datasetId as string,
        body.type as 'exploratory' | 'feature-importance' | 'correlation' | 'outlier-detection' | 'data-quality'
      )
      return sendSuccess(res, analysis, 201)
    } catch (error) {
      return sendError(res, error instanceof Error ? error.message : 'Failed to start analysis', 400)
    }
  }) as ControllerHandler,

  getFeatures: (async (req: IncomingMessage, res: ServerResponse, params?: Record<string, string>) => {
    try {
      const datasetId = params?.datasetId
      if (!datasetId) {
        return sendValidationError(res, { datasetId: 'Dataset ID is required' }, 'Dataset ID is required')
      }

      const features = await analyticsService.getFeatures(datasetId)
      return sendSuccess(res, features)
    } catch {
      return sendError(res, 'Failed to get features', 500)
    }
  }) as ControllerHandler,

  getFeatureById: (async (req: IncomingMessage, res: ServerResponse, params?: Record<string, string>) => {
    try {
      const id = params?.id
      if (!id) {
        return sendValidationError(res, { id: 'Feature ID is required' }, 'Feature ID is required')
      }

      const feature = await analyticsService.getFeatureById(id)
      if (!feature) {
        return sendNotFound(res, 'Feature not found')
      }

      return sendSuccess(res, feature)
    } catch {
      return sendError(res, 'Failed to get feature', 500)
    }
  }) as ControllerHandler,

  getDatasetInsights: (async (req: IncomingMessage, res: ServerResponse, params?: Record<string, string>) => {
    try {
      const datasetId = params?.datasetId
      if (!datasetId) {
        return sendValidationError(res, { datasetId: 'Dataset ID is required' }, 'Dataset ID is required')
      }

      const insights = await analyticsService.getDatasetInsights(datasetId)
      return sendSuccess(res, insights)
    } catch {
      return sendError(res, 'Failed to get dataset insights', 500)
    }
  }) as ControllerHandler,

  getModelInsights: (async (req: IncomingMessage, res: ServerResponse, params?: Record<string, string>) => {
    try {
      const modelId = params?.modelId
      if (!modelId) {
        return sendValidationError(res, { modelId: 'Model ID is required' }, 'Model ID is required')
      }

      const insights = await analyticsService.getModelInsights(modelId)
      return sendSuccess(res, insights)
    } catch {
      return sendError(res, 'Failed to get model insights', 500)
    }
  }) as ControllerHandler,
}
