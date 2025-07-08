import { runtimeController } from '../controllers/runtime.controller.js'

export const runtimeRoutes = [
  { method: 'GET', path: '/status', handler: runtimeController.getStatus },
  { method: 'GET', path: '/health', handler: runtimeController.getHealth },
  { method: 'GET', path: '/metrics', handler: runtimeController.getMetrics },
  { method: 'GET', path: '/logs', handler: runtimeController.getLogs },
  { method: 'POST', path: '/restart', handler: runtimeController.restart },
  { method: 'POST', path: '/shutdown', handler: runtimeController.shutdown },
  { method: 'GET', path: '/config', handler: runtimeController.getConfig },
  { method: 'PUT', path: '/config', handler: runtimeController.updateConfig },
  { method: 'GET', path: '/agents', handler: runtimeController.getAgents },
  {
    method: 'POST',
    path: '/agents/:name/start',
    handler: runtimeController.startAgent,
  },
  {
    method: 'POST',
    path: '/agents/:name/stop',
    handler: runtimeController.stopAgent,
  },
  {
    method: 'GET',
    path: '/agents/:name/status',
    handler: runtimeController.getAgentStatus,
  },
  {
    method: 'GET',
    path: '/agents/:name/logs',
    handler: runtimeController.getAgentLogs,
  },
  {
    method: 'POST',
    path: '/agents/:name/run',
    handler: runtimeController.runAgent,
  },
  { method: 'GET', path: '/tasks', handler: runtimeController.getTasks },
  { method: 'POST', path: '/tasks', handler: runtimeController.createTask },
  { method: 'GET', path: '/tasks/:id', handler: runtimeController.getTaskById },
  { method: 'PUT', path: '/tasks/:id', handler: runtimeController.updateTask },
  {
    method: 'DELETE',
    path: '/tasks/:id',
    handler: runtimeController.deleteTask,
  },
  {
    method: 'POST',
    path: '/tasks/:id/execute',
    handler: runtimeController.executeTask,
  },
  {
    method: 'GET',
    path: '/tasks/:id/result',
    handler: runtimeController.getTaskResult,
  },
]
