import { IncomingMessage, ServerResponse } from 'http'
import { TrainingService } from '../services/training.service.js'
import { sendSuccess, sendError, sendValidationError, sendNotFound } from '../utils/response.helper.js'
import type { ControllerHandler, RequestBody } from '../types/express/index.js'
import type { StartTrainingDto } from '../types/ml.types.js'

const trainingService = new TrainingService()

export const trainingController = {
  getAllJobs: (async (req: IncomingMessage, res: ServerResponse) => {
    try {
      const url = new URL(req.url || '', `http://${req.headers.host}`)
      const limit = parseInt(url.searchParams.get('limit') || '20')
      const offset = parseInt(url.searchParams.get('offset') || '0')
      const status = url.searchParams.get('status') || undefined

      const jobs = await trainingService.getAllJobs(limit, offset, status)
      return sendSuccess(res, jobs)
    } catch {
      return sendError(res, 'Failed to get training jobs', 500)
    }
  }) as ControllerHandler,

  getJobById: (async (req: IncomingMessage, res: ServerResponse, params?: Record<string, string>) => {
    try {
      const id = params?.id
      if (!id) {
        return sendValidationError(res, { id: 'Job ID is required' }, 'Job ID is required')
      }

      const job = await trainingService.getJobById(id)
      if (!job) {
        return sendNotFound(res, 'Training job not found')
      }

      return sendSuccess(res, job)
    } catch {
      return sendError(res, 'Failed to get training job', 500)
    }
  }) as ControllerHandler,

  startTraining: (async (req: IncomingMessage, res: ServerResponse, _params?: Record<string, string>, body?: RequestBody) => {
    try {
      if (!body || !body.modelId || !body.datasetId) {
        return sendValidationError(
          res,
          {
            modelId: 'Model ID is required',
            datasetId: 'Dataset ID is required',
          },
          'Model ID and dataset ID are required'
        )
      }

      const startTrainingDto: StartTrainingDto = {
        modelId: body.modelId as string,
        datasetId: body.datasetId as string,
        hyperparameters: body.hyperparameters as Record<string, unknown>,
      }

      const job = await trainingService.startTraining(startTrainingDto)
      return sendSuccess(res, job, 201)
    } catch (error) {
      return sendError(res, error instanceof Error ? error.message : 'Failed to start training', 400)
    }
  }) as ControllerHandler,

  cancelJob: (async (req: IncomingMessage, res: ServerResponse, params?: Record<string, string>) => {
    try {
      const id = params?.id
      if (!id) {
        return sendValidationError(res, { id: 'Job ID is required' }, 'Job ID is required')
      }

      const cancelled = await trainingService.cancelJob(id)
      if (!cancelled) {
        return sendNotFound(res, 'Training job not found or cannot be cancelled')
      }

      return sendSuccess(res, { message: 'Training job cancelled successfully' })
    } catch {
      return sendError(res, 'Failed to cancel training job', 500)
    }
  }) as ControllerHandler,

  getJobLogs: (async (req: IncomingMessage, res: ServerResponse, params?: Record<string, string>) => {
    try {
      const id = params?.id
      if (!id) {
        return sendValidationError(res, { id: 'Job ID is required' }, 'Job ID is required')
      }

      const logs = await trainingService.getJobLogs(id)
      if (!logs) {
        return sendNotFound(res, 'Training job not found')
      }

      return sendSuccess(res, { logs })
    } catch {
      return sendError(res, 'Failed to get job logs', 500)
    }
  }) as ControllerHandler,

  getJobMetrics: (async (req: IncomingMessage, res: ServerResponse, params?: Record<string, string>) => {
    try {
      const id = params?.id
      if (!id) {
        return sendValidationError(res, { id: 'Job ID is required' }, 'Job ID is required')
      }

      const metrics = await trainingService.getJobMetrics(id)
      if (!metrics) {
        return sendNotFound(res, 'Training job not found')
      }

      return sendSuccess(res, metrics)
    } catch {
      return sendError(res, 'Failed to get job metrics', 500)
    }
  }) as ControllerHandler,

  getTrainingHistory: (async (req: IncomingMessage, res: ServerResponse, params?: Record<string, string>) => {
    try {
      const modelId = params?.modelId
      if (!modelId) {
        return sendValidationError(res, { modelId: 'Model ID is required' }, 'Model ID is required')
      }

      const history = await trainingService.getTrainingHistory(modelId)
      return sendSuccess(res, history)
    } catch {
      return sendError(res, 'Failed to get training history', 500)
    }
  }) as ControllerHandler,

  getSystemResources: (async (_req: IncomingMessage, res: ServerResponse) => {
    try {
      const resources = await trainingService.getSystemResources()
      return sendSuccess(res, resources)
    } catch {
      return sendError(res, 'Failed to get system resources', 500)
    }
  }) as ControllerHandler,
} 