import { automationController } from '../controllers/automation.controller.js'
import type { ControllerHandler,RouteDefinition } from '../types/express/index.js'

// Create wrapper functions to match ControllerHandler signature
const wrapHandler = (method: (...args: unknown[]) => Promise<void>): ControllerHandler => {
  return async (req, res, params, body, user) => {
    return method.call(automationController, req, res, params, body, user)
  }
}

export const automationRoutes: RouteDefinition[] = [
  {
    method: 'GET',
    path: '/workflows',
    handler: wrapHandler(automationController.getWorkflows),
  },
  {
    method: 'GET',
    path: '/workflows/:id',
    handler: wrapHandler(automationController.getWorkflowById),
  },
  {
    method: 'POST',
    path: '/workflows',
    handler: wrapHandler(automationController.createWorkflow),
  },
  {
    method: 'PUT',
    path: '/workflows/:id',
    handler: wrapHandler(automationController.updateWorkflow),
  },
  {
    method: 'DELETE',
    path: '/workflows/:id',
    handler: wrapHandler(automationController.deleteWorkflow),
  },
  { method: 'GET', path: '/jobs', handler: wrapHandler(automationController.getJobs) },
  {
    method: 'GET',
    path: '/jobs/:id',
    handler: wrapHandler(automationController.getJobById),
  },
  {
    method: 'POST',
    path: '/workflows/:id/execute',
    handler: wrapHandler(automationController.executeWorkflow),
  },
  {
    method: 'POST',
    path: '/jobs/:id/pause',
    handler: wrapHandler(automationController.pauseJob),
  },
  {
    method: 'POST',
    path: '/jobs/:id/resume',
    handler: wrapHandler(automationController.resumeJob),
  },
]
