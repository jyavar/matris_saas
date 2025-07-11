import { IncomingMessage, ServerResponse } from 'http'
import { ModelsService } from '../services/models.service.js'
import { sendSuccess, sendError, sendValidationError, sendNotFound } from '../utils/response.helper.js'
import type { ControllerHandler, RequestBody } from '../types/express/index.js'
import type { CreateModelDto, UpdateModelDto } from '../types/ml.types.js'

const modelsService = new ModelsService()

export const modelsController = {
  getAllModels: (async (req: IncomingMessage, res: ServerResponse) => {
    try {
      const url = new URL(req.url || '', `http://${req.headers.host}`)
      const limit = parseInt(url.searchParams.get('limit') || '20')
      const offset = parseInt(url.searchParams.get('offset') || '0')
      const type = url.searchParams.get('type') || undefined
      const status = url.searchParams.get('status') || undefined

      const models = await modelsService.getAllModels(limit, offset, type, status)
      return sendSuccess(res, models)
    } catch {
      return sendError(res, 'Failed to get models', 500)
    }
  }) as ControllerHandler,

  getModelById: (async (req: IncomingMessage, res: ServerResponse, params?: Record<string, string>) => {
    try {
      const id = params?.id
      if (!id) {
        return sendValidationError(res, { id: 'Model ID is required' }, 'Model ID is required')
      }

      const model = await modelsService.getModelById(id)
      if (!model) {
        return sendNotFound(res, 'Model not found')
      }

      return sendSuccess(res, model)
    } catch {
      return sendError(res, 'Failed to get model', 500)
    }
  }) as ControllerHandler,

  createModel: (async (req: IncomingMessage, res: ServerResponse, _params?: Record<string, string>, body?: RequestBody) => {
    try {
      if (!body || !body.name || !body.type) {
        return sendValidationError(res, { name: 'Name is required', type: 'Type is required' }, 'Name and type are required')
      }

      const createModelDto: CreateModelDto = {
        name: body.name as string,
        type: body.type as CreateModelDto['type'],
        parameters: body.parameters as Record<string, unknown>,
        version: body.version as string,
      }

      const model = await modelsService.createModel(createModelDto)
      return sendSuccess(res, model, 201)
    } catch (error) {
      return sendError(res, error instanceof Error ? error.message : 'Failed to create model', 400)
    }
  }) as ControllerHandler,

  updateModel: (async (req: IncomingMessage, res: ServerResponse, params?: Record<string, string>, body?: RequestBody) => {
    try {
      const id = params?.id
      if (!id) {
        return sendValidationError(res, { id: 'Model ID is required' }, 'Model ID is required')
      }

      const updateModelDto: UpdateModelDto = {
        name: body?.name as string,
        type: body?.type as UpdateModelDto['type'],
        parameters: body?.parameters as Record<string, unknown>,
        version: body?.version as string,
      }

      const model = await modelsService.updateModel(id, updateModelDto)
      if (!model) {
        return sendNotFound(res, 'Model not found')
      }

      return sendSuccess(res, model)
    } catch (error) {
      return sendError(res, error instanceof Error ? error.message : 'Failed to update model', 400)
    }
  }) as ControllerHandler,

  deleteModel: (async (req: IncomingMessage, res: ServerResponse, params?: Record<string, string>) => {
    try {
      const id = params?.id
      if (!id) {
        return sendValidationError(res, { id: 'Model ID is required' }, 'Model ID is required')
      }

      const deleted = await modelsService.deleteModel(id)
      if (!deleted) {
        return sendNotFound(res, 'Model not found')
      }

      return sendSuccess(res, null, 204)
    } catch {
      return sendError(res, 'Failed to delete model', 500)
    }
  }) as ControllerHandler,

  getModelVersions: (async (req: IncomingMessage, res: ServerResponse, params?: Record<string, string>) => {
    try {
      const id = params?.id
      if (!id) {
        return sendValidationError(res, { id: 'Model ID is required' }, 'Model ID is required')
      }

      const versions = await modelsService.getModelVersions(id)
      if (!versions) {
        return sendNotFound(res, 'Model not found')
      }

      return sendSuccess(res, versions)
    } catch {
      return sendError(res, 'Failed to get model versions', 500)
    }
  }) as ControllerHandler,

  evaluateModel: (async (req: IncomingMessage, res: ServerResponse, params?: Record<string, string>, body?: RequestBody) => {
    try {
      const id = params?.id
      if (!id) {
        return sendValidationError(res, { id: 'Model ID is required' }, 'Model ID is required')
      }

      if (!body || !body.testDatasetId) {
        return sendValidationError(res, { testDatasetId: 'Test dataset ID is required' }, 'Test dataset ID is required')
      }

      const evaluation = await modelsService.evaluateModel(id, body.testDatasetId as string)
      return sendSuccess(res, evaluation)
    } catch (error) {
      return sendError(res, error instanceof Error ? error.message : 'Failed to evaluate model', 400)
    }
  }) as ControllerHandler,
} 