import { describe, it, expect, beforeEach } from 'vitest'
import { ModelsService } from '../services/models.service.js'
import type { CreateModelDto, UpdateModelDto } from '../types/ml.types.js'

describe('ModelsService', () => {
  let modelsService: ModelsService

  beforeEach(() => {
    modelsService = new ModelsService()
  })

  describe('getAllModels', () => {
    it('should return paginated models with default parameters', async () => {
      const result = await modelsService.getAllModels()

      expect(result).toMatchObject({
        success: true,
        data: expect.any(Array),
        count: expect.any(Number),
        page: 1,
        limit: 20,
        total_pages: expect.any(Number),
      })
      expect(result.data.length).toBeGreaterThan(0)
    })

    it('should filter models by type', async () => {
      const result = await modelsService.getAllModels(20, 0, 'classification')

      expect(result.data.every((model) => model.type === 'classification')).toBe(true)
    })

    it('should filter models by status', async () => {
      const result = await modelsService.getAllModels(20, 0, undefined, 'ready')

      expect(result.data.every((model) => model.status === 'ready')).toBe(true)
    })

    it('should handle pagination correctly', async () => {
      const result1 = await modelsService.getAllModels(2, 0)
      const result2 = await modelsService.getAllModels(2, 2)

      expect(result1.data.length).toBeLessThanOrEqual(2)
      expect(result2.data.length).toBeLessThanOrEqual(2)
      expect(result1.data).not.toEqual(result2.data)
    })
  })

  describe('getModelById', () => {
    it('should return model by id', async () => {
      const model = await modelsService.getModelById('model-1')

      expect(model).toMatchObject({
        id: 'model-1',
        name: expect.any(String),
        type: expect.any(String),
        status: expect.any(String),
      })
    })

    it('should return null for non-existent model', async () => {
      const model = await modelsService.getModelById('non-existent')

      expect(model).toBe(null)
    })
  })

  describe('createModel', () => {
    it('should create a new model', async () => {
      const createModelDto: CreateModelDto = {
        name: 'Test Model',
        type: 'classification',
        parameters: { algorithm: 'random_forest' },
        version: '1.0.0',
      }

      const model = await modelsService.createModel(createModelDto)

      expect(model).toMatchObject({
        id: expect.stringMatching(/model-\d+/),
        name: 'Test Model',
        type: 'classification',
        status: 'training',
        parameters: { algorithm: 'random_forest' },
        version: '1.0.0',
        created_at: expect.any(String),
        updated_at: expect.any(String),
      })
    })

    it('should create model with default values', async () => {
      const createModelDto: CreateModelDto = {
        name: 'Test Model',
        type: 'regression',
      }

      const model = await modelsService.createModel(createModelDto)

      expect(model).toMatchObject({
        name: 'Test Model',
        type: 'regression',
        parameters: {},
        version: '1.0.0',
        dataset_size: 0,
        training_time: 0,
      })
    })
  })

  describe('updateModel', () => {
    it('should update existing model', async () => {
      const updateModelDto: UpdateModelDto = {
        name: 'Updated Model Name',
        type: 'nlp',
      }

      const model = await modelsService.updateModel('model-1', updateModelDto)

      expect(model).toMatchObject({
        id: 'model-1',
        name: 'Updated Model Name',
        type: 'nlp',
        updated_at: expect.any(String),
      })
    })

    it('should return null for non-existent model', async () => {
      const updateModelDto: UpdateModelDto = {
        name: 'Updated Name',
      }

      const model = await modelsService.updateModel('non-existent', updateModelDto)

      expect(model).toBe(null)
    })
  })

  describe('deleteModel', () => {
    it('should delete existing model', async () => {
      const deleted = await modelsService.deleteModel('model-1')

      expect(deleted).toBe(true)

      const model = await modelsService.getModelById('model-1')
      expect(model).toBe(null)
    })

    it('should return false for non-existent model', async () => {
      const deleted = await modelsService.deleteModel('non-existent')

      expect(deleted).toBe(false)
    })
  })

  describe('getModelVersions', () => {
    it('should return model versions', async () => {
      const versions = await modelsService.getModelVersions('model-1')

      expect(versions).toMatchObject([
        {
          version: expect.any(String),
          created_at: expect.any(String),
          status: expect.any(String),
          metrics: {
            accuracy: expect.any(Number),
            precision: expect.any(Number),
            recall: expect.any(Number),
            f1_score: expect.any(Number),
          },
        },
        {
          version: '0.9.0',
          created_at: expect.any(String),
          status: 'archived',
          metrics: {
            accuracy: 0.85,
            precision: 0.83,
            recall: 0.87,
            f1_score: 0.85,
          },
        },
      ])
    })

    it('should return null for non-existent model', async () => {
      const versions = await modelsService.getModelVersions('non-existent')

      expect(versions).toBe(null)
    })
  })

  describe('evaluateModel', () => {
    it('should evaluate model with test dataset', async () => {
      const evaluation = await modelsService.evaluateModel('model-1', 'test-dataset-1')

      expect(evaluation).toMatchObject({
        accuracy: expect.any(Number),
        precision: expect.any(Number),
        recall: expect.any(Number),
        f1_score: expect.any(Number),
        confusion_matrix: expect.any(Array),
        classification_report: expect.any(Object),
      })
    })

    it('should throw error for non-existent model', async () => {
      await expect(
        modelsService.evaluateModel('non-existent', 'test-dataset-1')
      ).rejects.toThrow('Model not found')
    })
  })
}) 