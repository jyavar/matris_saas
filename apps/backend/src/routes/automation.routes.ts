import { automationController } from '../controllers/automation.controller.js'

export const automationRoutes = [
  {
    method: 'GET',
    path: '/workflows',
    handler: automationController.getWorkflows,
  },
  {
    method: 'GET',
    path: '/workflows/:id',
    handler: automationController.getWorkflowById,
  },
  {
    method: 'POST',
    path: '/workflows',
    handler: automationController.createWorkflow,
  },
  {
    method: 'PUT',
    path: '/workflows/:id',
    handler: automationController.updateWorkflow,
  },
  {
    method: 'DELETE',
    path: '/workflows/:id',
    handler: automationController.deleteWorkflow,
  },
  { method: 'GET', path: '/jobs', handler: automationController.getJobs },
  {
    method: 'GET',
    path: '/jobs/:id',
    handler: automationController.getJobById,
  },
  {
    method: 'POST',
    path: '/workflows/:id/execute',
    handler: automationController.executeWorkflow,
  },
  {
    method: 'POST',
    path: '/jobs/:id/pause',
    handler: automationController.pauseJob,
  },
  {
    method: 'POST',
    path: '/jobs/:id/resume',
    handler: automationController.resumeJob,
  },
]
