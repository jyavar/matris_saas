import { IncomingMessage, ServerResponse } from 'http'
import { DatasetsService } from '../services/datasets.service.js'
import { sendSuccess, sendError, sendValidationError, sendNotFound } from '../utils/response.helper.js'
import type { ControllerHandler, RequestBody } from '../types/express/index.js'
import type { CreateDatasetDto, UpdateDatasetDto } from '../types/ml.types.js'

const datasetsService = new DatasetsService()

export const datasetsController = {
  getAllDatasets: (async (req: IncomingMessage, res: ServerResponse) => {
    try {
      const url = new URL(req.url || '', `http://${req.headers.host}`)
      const limit = parseInt(url.searchParams.get('limit') || '20')
      const offset = parseInt(url.searchParams.get('offset') || '0')
      const type = url.searchParams.get('type') || undefined
      const status = url.searchParams.get('status') || undefined

      const datasets = await datasetsService.getAllDatasets(limit, offset, type, status)
      return sendSuccess(res, datasets)
    } catch {
      return sendError(res, 'Failed to get datasets', 500)
    }
  }) as ControllerHandler,

  getDatasetById: (async (req: IncomingMessage, res: ServerResponse, params?: Record<string, string>) => {
    try {
      const id = params?.id
      if (!id) {
        return sendValidationError(res, { id: 'Dataset ID is required' }, 'Dataset ID is required')
      }

      const dataset = await datasetsService.getDatasetById(id)
      if (!dataset) {
        return sendNotFound(res, 'Dataset not found')
      }

      return sendSuccess(res, dataset)
    } catch {
      return sendError(res, 'Failed to get dataset', 500)
    }
  }) as ControllerHandler,

  createDataset: (async (req: IncomingMessage, res: ServerResponse, _params?: Record<string, string>, body?: RequestBody) => {
    try {
      if (!body || !body.name || !body.description || !body.type || !body.format) {
        return sendValidationError(
          res,
          {
            name: 'Name is required',
            description: 'Description is required',
            type: 'Type is required',
            format: 'Format is required',
          },
          'Name, description, type and format are required'
        )
      }

      const createDatasetDto: CreateDatasetDto = {
        name: body.name as string,
        description: body.description as string,
        type: body.type as CreateDatasetDto['type'],
        format: body.format as CreateDatasetDto['format'],
        schema: body.schema as Record<string, string>,
      }

      const dataset = await datasetsService.createDataset(createDatasetDto)
      return sendSuccess(res, dataset, 201)
    } catch (error) {
      return sendError(res, error instanceof Error ? error.message : 'Failed to create dataset', 400)
    }
  }) as ControllerHandler,

  updateDataset: (async (req: IncomingMessage, res: ServerResponse, params?: Record<string, string>, body?: RequestBody) => {
    try {
      const id = params?.id
      if (!id) {
        return sendValidationError(res, { id: 'Dataset ID is required' }, 'Dataset ID is required')
      }

      const updateDatasetDto: UpdateDatasetDto = {
        name: body?.name as string,
        description: body?.description as string,
        type: body?.type as UpdateDatasetDto['type'],
        format: body?.format as UpdateDatasetDto['format'],
        schema: body?.schema as Record<string, string>,
      }

      const dataset = await datasetsService.updateDataset(id, updateDatasetDto)
      if (!dataset) {
        return sendNotFound(res, 'Dataset not found')
      }

      return sendSuccess(res, dataset)
    } catch (error) {
      return sendError(res, error instanceof Error ? error.message : 'Failed to update dataset', 400)
    }
  }) as ControllerHandler,

  deleteDataset: (async (req: IncomingMessage, res: ServerResponse, params?: Record<string, string>) => {
    try {
      const id = params?.id
      if (!id) {
        return sendValidationError(res, { id: 'Dataset ID is required' }, 'Dataset ID is required')
      }

      const deleted = await datasetsService.deleteDataset(id)
      if (!deleted) {
        return sendNotFound(res, 'Dataset not found')
      }

      return sendSuccess(res, null, 204)
    } catch {
      return sendError(res, 'Failed to delete dataset', 500)
    }
  }) as ControllerHandler,

  validateDataset: (async (req: IncomingMessage, res: ServerResponse, params?: Record<string, string>) => {
    try {
      const id = params?.id
      if (!id) {
        return sendValidationError(res, { id: 'Dataset ID is required' }, 'Dataset ID is required')
      }

      const validation = await datasetsService.validateDataset(id)
      return sendSuccess(res, validation)
    } catch (error) {
      return sendError(res, error instanceof Error ? error.message : 'Failed to validate dataset', 400)
    }
  }) as ControllerHandler,

  getDatasetStatistics: (async (req: IncomingMessage, res: ServerResponse, params?: Record<string, string>) => {
    try {
      const id = params?.id
      if (!id) {
        return sendValidationError(res, { id: 'Dataset ID is required' }, 'Dataset ID is required')
      }

      const statistics = await datasetsService.getDatasetStatistics(id)
      return sendSuccess(res, statistics)
    } catch (error) {
      return sendError(res, error instanceof Error ? error.message : 'Failed to get dataset statistics', 400)
    }
  }) as ControllerHandler,
} 