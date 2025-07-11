import { IncomingMessage, ServerResponse } from 'http'
import { PredictionService } from '../services/prediction.service.js'
import { sendSuccess, sendError, sendValidationError, sendNotFound } from '../utils/response.helper.js'
import type { ControllerHandler, RequestBody } from '../types/express/index.js'
import type { MakePredictionDto } from '../types/ml.types.js'

const predictionService = new PredictionService()

export const predictionController = {
  makePrediction: (async (req: IncomingMessage, res: ServerResponse, _params?: Record<string, string>, body?: RequestBody) => {
    try {
      if (!body || !body.modelId || !body.inputData) {
        return sendValidationError(
          res,
          {
            modelId: 'Model ID is required',
            inputData: 'Input data is required',
          },
          'Model ID and input data are required'
        )
      }

      const makePredictionDto: MakePredictionDto = {
        modelId: body.modelId as string,
        inputData: body.inputData as Record<string, unknown>,
        deploymentId: body.deploymentId as string,
      }

      const prediction = await predictionService.makePrediction(makePredictionDto)
      return sendSuccess(res, prediction, 201)
    } catch (error) {
      return sendError(res, error instanceof Error ? error.message : 'Failed to make prediction', 400)
    }
  }) as ControllerHandler,

  getPredictionById: (async (req: IncomingMessage, res: ServerResponse, params?: Record<string, string>) => {
    try {
      const id = params?.id
      if (!id) {
        return sendValidationError(res, { id: 'Prediction ID is required' }, 'Prediction ID is required')
      }

      const prediction = await predictionService.getPredictionById(id)
      if (!prediction) {
        return sendNotFound(res, 'Prediction not found')
      }

      return sendSuccess(res, prediction)
    } catch {
      return sendError(res, 'Failed to get prediction', 500)
    }
  }) as ControllerHandler,

  getPredictionHistory: (async (req: IncomingMessage, res: ServerResponse, params?: Record<string, string>) => {
    try {
      const modelId = params?.modelId
      if (!modelId) {
        return sendValidationError(res, { modelId: 'Model ID is required' }, 'Model ID is required')
      }

      const url = new URL(req.url || '', `http://${req.headers.host}`)
      const limit = parseInt(url.searchParams.get('limit') || '50')

      const history = await predictionService.getPredictionHistory(modelId, limit)
      return sendSuccess(res, history)
    } catch {
      return sendError(res, 'Failed to get prediction history', 500)
    }
  }) as ControllerHandler,

  getPredictionStats: (async (req: IncomingMessage, res: ServerResponse, params?: Record<string, string>) => {
    try {
      const modelId = params?.modelId
      if (!modelId) {
        return sendValidationError(res, { modelId: 'Model ID is required' }, 'Model ID is required')
      }

      const stats = await predictionService.getPredictionStats(modelId)
      return sendSuccess(res, stats)
    } catch {
      return sendError(res, 'Failed to get prediction stats', 500)
    }
  }) as ControllerHandler,

  batchPredict: (async (req: IncomingMessage, res: ServerResponse, params?: Record<string, string>, body?: RequestBody) => {
    try {
      const modelId = params?.modelId
      if (!modelId) {
        return sendValidationError(res, { modelId: 'Model ID is required' }, 'Model ID is required')
      }

      if (!body || !Array.isArray(body.inputData)) {
        return sendValidationError(
          res,
          { inputData: 'Input data array is required' },
          'Input data array is required'
        )
      }

      const inputDataArray = body.inputData as Record<string, unknown>[]
      const predictions = await predictionService.batchPredict(modelId, inputDataArray)
      return sendSuccess(res, predictions, 201)
    } catch (error) {
      return sendError(res, error instanceof Error ? error.message : 'Failed to make batch prediction', 400)
    }
  }) as ControllerHandler,

  getModelPerformance: (async (req: IncomingMessage, res: ServerResponse, params?: Record<string, string>) => {
    try {
      const modelId = params?.modelId
      if (!modelId) {
        return sendValidationError(res, { modelId: 'Model ID is required' }, 'Model ID is required')
      }

      const performance = await predictionService.getModelPerformance(modelId)
      return sendSuccess(res, performance)
    } catch {
      return sendError(res, 'Failed to get model performance', 500)
    }
  }) as ControllerHandler,
} 