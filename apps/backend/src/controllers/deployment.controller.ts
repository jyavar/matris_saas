import { IncomingMessage, ServerResponse } from 'http'
import { DeploymentService } from '../services/deployment.service.js'
import { sendSuccess, sendError, sendValidationError, sendNotFound } from '../utils/response.helper.js'
import type { ControllerHandler, RequestBody } from '../types/express/index.js'
import type { DeployModelDto } from '../types/ml.types.js'

const deploymentService = new DeploymentService()

export const deploymentController = {
  getAllDeployments: (async (req: IncomingMessage, res: ServerResponse) => {
    try {
      const url = new URL(req.url || '', `http://${req.headers.host}`)
      const limit = parseInt(url.searchParams.get('limit') || '20')
      const offset = parseInt(url.searchParams.get('offset') || '0')
      const environment = url.searchParams.get('environment') || undefined
      const status = url.searchParams.get('status') || undefined

      const deployments = await deploymentService.getAllDeployments(limit, offset, environment, status)
      return sendSuccess(res, deployments)
    } catch {
      return sendError(res, 'Failed to get deployments', 500)
    }
  }) as ControllerHandler,

  getDeploymentById: (async (req: IncomingMessage, res: ServerResponse, params?: Record<string, string>) => {
    try {
      const id = params?.id
      if (!id) {
        return sendValidationError(res, { id: 'Deployment ID is required' }, 'Deployment ID is required')
      }

      const deployment = await deploymentService.getDeploymentById(id)
      if (!deployment) {
        return sendNotFound(res, 'Deployment not found')
      }

      return sendSuccess(res, deployment)
    } catch {
      return sendError(res, 'Failed to get deployment', 500)
    }
  }) as ControllerHandler,

  deployModel: (async (req: IncomingMessage, res: ServerResponse, _params?: Record<string, string>, body?: RequestBody) => {
    try {
      if (!body || !body.modelId || !body.environment || !body.replicas || !body.cpuLimit || !body.memoryLimit) {
        return sendValidationError(
          res,
          {
            modelId: 'Model ID is required',
            environment: 'Environment is required',
            replicas: 'Replicas is required',
            cpuLimit: 'CPU limit is required',
            memoryLimit: 'Memory limit is required',
          },
          'Model ID, environment, replicas, CPU limit and memory limit are required'
        )
      }

      const deployModelDto: DeployModelDto = {
        modelId: body.modelId as string,
        environment: body.environment as DeployModelDto['environment'],
        replicas: body.replicas as number,
        cpuLimit: body.cpuLimit as string,
        memoryLimit: body.memoryLimit as string,
      }

      const deployment = await deploymentService.deployModel(deployModelDto)
      return sendSuccess(res, deployment, 201)
    } catch (error) {
      return sendError(res, error instanceof Error ? error.message : 'Failed to deploy model', 400)
    }
  }) as ControllerHandler,

  updateDeployment: (async (req: IncomingMessage, res: ServerResponse, params?: Record<string, string>, body?: RequestBody) => {
    try {
      const id = params?.id
      if (!id) {
        return sendValidationError(res, { id: 'Deployment ID is required' }, 'Deployment ID is required')
      }

      const updates = {
        replicas: body?.replicas as number,
        cpu_limit: body?.cpuLimit as string,
        memory_limit: body?.memoryLimit as string,
        version: body?.version as string,
      }

      const deployment = await deploymentService.updateDeployment(id, updates)
      if (!deployment) {
        return sendNotFound(res, 'Deployment not found')
      }

      return sendSuccess(res, deployment)
    } catch (error) {
      return sendError(res, error instanceof Error ? error.message : 'Failed to update deployment', 400)
    }
  }) as ControllerHandler,

  deleteDeployment: (async (req: IncomingMessage, res: ServerResponse, params?: Record<string, string>) => {
    try {
      const id = params?.id
      if (!id) {
        return sendValidationError(res, { id: 'Deployment ID is required' }, 'Deployment ID is required')
      }

      const deleted = await deploymentService.deleteDeployment(id)
      if (!deleted) {
        return sendNotFound(res, 'Deployment not found')
      }

      return sendSuccess(res, null, 204)
    } catch {
      return sendError(res, 'Failed to delete deployment', 500)
    }
  }) as ControllerHandler,

  scaleDeployment: (async (req: IncomingMessage, res: ServerResponse, params?: Record<string, string>, body?: RequestBody) => {
    try {
      const id = params?.id
      if (!id) {
        return sendValidationError(res, { id: 'Deployment ID is required' }, 'Deployment ID is required')
      }

      if (!body || typeof body.replicas !== 'number') {
        return sendValidationError(res, { replicas: 'Replicas number is required' }, 'Replicas number is required')
      }

      const deployment = await deploymentService.scaleDeployment(id, body.replicas)
      if (!deployment) {
        return sendNotFound(res, 'Deployment not found')
      }

      return sendSuccess(res, deployment)
    } catch (error) {
      return sendError(res, error instanceof Error ? error.message : 'Failed to scale deployment', 400)
    }
  }) as ControllerHandler,

  getDeploymentMetrics: (async (req: IncomingMessage, res: ServerResponse, params?: Record<string, string>) => {
    try {
      const id = params?.id
      if (!id) {
        return sendValidationError(res, { id: 'Deployment ID is required' }, 'Deployment ID is required')
      }

      const metrics = await deploymentService.getDeploymentMetrics(id)
      if (!metrics) {
        return sendNotFound(res, 'Deployment not found')
      }

      return sendSuccess(res, metrics)
    } catch {
      return sendError(res, 'Failed to get deployment metrics', 500)
    }
  }) as ControllerHandler,

  getDeploymentLogs: (async (req: IncomingMessage, res: ServerResponse, params?: Record<string, string>) => {
    try {
      const id = params?.id
      if (!id) {
        return sendValidationError(res, { id: 'Deployment ID is required' }, 'Deployment ID is required')
      }

      const logs = await deploymentService.getDeploymentLogs(id)
      if (!logs) {
        return sendNotFound(res, 'Deployment not found')
      }

      return sendSuccess(res, { logs })
    } catch {
      return sendError(res, 'Failed to get deployment logs', 500)
    }
  }) as ControllerHandler,

  rollbackDeployment: (async (req: IncomingMessage, res: ServerResponse, params?: Record<string, string>, body?: RequestBody) => {
    try {
      const id = params?.id
      if (!id) {
        return sendValidationError(res, { id: 'Deployment ID is required' }, 'Deployment ID is required')
      }

      if (!body || !body.version) {
        return sendValidationError(res, { version: 'Version is required' }, 'Version is required')
      }

      const deployment = await deploymentService.rollbackDeployment(id, body.version as string)
      if (!deployment) {
        return sendNotFound(res, 'Deployment not found')
      }

      return sendSuccess(res, deployment)
    } catch (error) {
      return sendError(res, error instanceof Error ? error.message : 'Failed to rollback deployment', 400)
    }
  }) as ControllerHandler,

  getDeploymentHealth: (async (req: IncomingMessage, res: ServerResponse, params?: Record<string, string>) => {
    try {
      const id = params?.id
      if (!id) {
        return sendValidationError(res, { id: 'Deployment ID is required' }, 'Deployment ID is required')
      }

      const health = await deploymentService.getDeploymentHealth(id)
      if (!health) {
        return sendNotFound(res, 'Deployment not found')
      }

      return sendSuccess(res, health)
    } catch {
      return sendError(res, 'Failed to get deployment health', 500)
    }
  }) as ControllerHandler,
} 