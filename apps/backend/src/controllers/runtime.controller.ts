/* eslint-disable @typescript-eslint/no-unused-vars */
import { RuntimeService } from '../services/runtime.service.js'
// Simple response helpers to replace controller-refactor
const responseHelpers = {
  success: (res: unknown, data: unknown, statusCode = 200) => {
    res.status(statusCode).json({ success: true, data })
  },
  error: (res: unknown, message: string, statusCode = 500) => {
    res.status(statusCode).json({ success: false, error: message })
  },
  badRequest: (res: unknown, message: string) => {
    res.status(400).json({ success: false, error: message })
  },
  notFound: (res: unknown, message: string) => {
    res.status(404).json({ success: false, error: message })
  },
}
export const runtimeController = {
  getStatus: (async (_req, res, _params, _body, _user) => {
    try {
      const jobs = RuntimeService.listJobs()
      responseHelpers.success(res, { jobs, count: jobs.length })
    } catch {
      responseHelpers.error(res, 'Failed to get runtime status')
    }
  }) as ControllerHandler,

  getHealth: (async (_req, res, _params, _body, _user) => {
    try {
      responseHelpers.success(res, { status: 'healthy' })
    } catch {
      responseHelpers.error(res, 'Health check failed')
    }
  }) as ControllerHandler,

  getMetrics: (async (_req, res, _params, _body, _user) => {
    try {
      responseHelpers.success(res, {})
    } catch {
      responseHelpers.error(res, 'Failed to get metrics')
    }
  }) as ControllerHandler,

  getLogs: (async (_req, res, _params, _body, _user) => {
    try {
      responseHelpers.success(res, [])
    } catch {
      responseHelpers.error(res, 'Failed to get logs')
    }
  }) as ControllerHandler,

  restart: (async (_req, res, _params, _body, _user) => {
    try {
      responseHelpers.success(res, { message: 'Restart initiated' })
    } catch {
      responseHelpers.error(res, 'Failed to restart')
    }
  }) as ControllerHandler,

  shutdown: (async (_req, res, _params, _body, _user) => {
    try {
      responseHelpers.success(res, { message: 'Shutdown initiated' })
    } catch {
      responseHelpers.error(res, 'Failed to shutdown')
    }
  }) as ControllerHandler,

  getConfig: (async (_req, res, _params, _body, _user) => {
    try {
      responseHelpers.success(res, {})
    } catch {
      responseHelpers.error(res, 'Failed to get config')
    }
  }) as ControllerHandler,

  updateConfig: (async (_req, res, _params, _body, _user) => {
    try {
      responseHelpers.success(res, { message: 'Config updated' })
    } catch {
      responseHelpers.error(res, 'Failed to update config')
    }
  }) as ControllerHandler,

  getAgents: (async (_req, res, _params, _body, _user) => {
    try {
      responseHelpers.success(res, ['refactor'])
    } catch {
      responseHelpers.error(res, 'Failed to get agents')
    }
  }) as ControllerHandler,

  startAgent: (async (_req, res, _params, _body, _user) => {
    try {
      const name = _params?.name
      if (!name) {
        responseHelpers.badRequest(res, 'Agent name is required')
        return
      }
      responseHelpers.success(res, { message: `Agent ${name} started` })
    } catch {
      responseHelpers.error(res, 'Failed to start agent')
    }
  }) as ControllerHandler,

  stopAgent: (async (_req, res, _params, _body, _user) => {
    try {
      const name = _params?.name
      if (!name) {
        responseHelpers.badRequest(res, 'Agent name is required')
        return
      }
      responseHelpers.success(res, { message: `Agent ${name} stopped` })
    } catch {
      responseHelpers.error(res, 'Failed to stop agent')
    }
  }) as ControllerHandler,

  getAgentStatus: (async (_req, res, _params, _body, _user) => {
    try {
      const name = _params?.name
      if (!name) {
        responseHelpers.badRequest(res, 'Agent name is required')
        return
      }
      responseHelpers.success(res, { name, status: 'running' })
    } catch {
      responseHelpers.error(res, 'Failed to get agent status')
    }
  }) as ControllerHandler,

  getAgentLogs: (async (_req, res, _params, _body, _user) => {
    try {
      const name = _params?.name
      if (!name) {
        responseHelpers.badRequest(res, 'Agent name is required')
        return
      }
      responseHelpers.success(res, [])
    } catch {
      responseHelpers.error(res, 'Failed to get agent logs')
    }
  }) as ControllerHandler,

  runAgent: (async (_req, res, _params, _body, _user) => {
    try {
      const name = _params?.name
      if (!name) {
        responseHelpers.badRequest(res, 'Agent name is required')
        return
      }
      const result = await RuntimeService.runAgent(
        name,
        _body as Record<string, unknown>,
      )
      if (result.ok) {
        responseHelpers.success(res, { result: result.result })
      } else {
        responseHelpers.badRequest(res, result.error)
      }
    } catch {
      responseHelpers.error(res, 'Failed to run agent')
    }
  }) as ControllerHandler,

  getTasks: (async (_req, res, _params, _body, _user) => {
    try {
      const jobs = RuntimeService.listJobs()
      responseHelpers.success(res, jobs)
    } catch {
      responseHelpers.error(res, 'Failed to get tasks')
    }
  }) as ControllerHandler,

  createTask: (async (_req, res, _params, _body, _user) => {
    try {
      const { id, schedule } = _body || {}
      if (!id || !schedule) {
        responseHelpers.badRequest(res, 'Missing id or schedule')
        return
      }
      const job = RuntimeService.createJob(
        id as string,
        schedule as string,
        () => {
          // Placeholder: aquí se ejecutaría la lógica real del job
        },
      )
      responseHelpers.success(res, job, 201)
    } catch {
      responseHelpers.error(res, 'Failed to create task')
    }
  }) as ControllerHandler,

  getTaskById: (async (_req, res, _params, _body, _user) => {
    try {
      const id = _params?.id
      if (!id) {
        responseHelpers.badRequest(res, 'Task ID is required')
        return
      }
      const jobs = RuntimeService.listJobs()
      const job = jobs.find((j) => j.id === id)
      if (!job) {
        responseHelpers.notFound(res, 'Task not found')
        return
      }
      responseHelpers.success(res, job)
    } catch {
      responseHelpers.error(res, 'Failed to get task')
    }
  }) as ControllerHandler,

  updateTask: (async (_req, res, _params, _body, _user) => {
    try {
      responseHelpers.success(res, { message: 'Task updated' })
    } catch {
      responseHelpers.error(res, 'Failed to update task')
    }
  }) as ControllerHandler,

  deleteTask: (async (_req, res, _params, _body, _user) => {
    try {
      const id = _params?.id
      if (!id) {
        responseHelpers.badRequest(res, 'Task ID is required')
        return
      }
      RuntimeService.deleteJob(id)
      responseHelpers.success(res, { message: 'Task deleted' })
    } catch {
      responseHelpers.error(res, 'Failed to delete task')
    }
  }) as ControllerHandler,

  executeTask: (async (_req, res, _params, _body, _user) => {
    try {
      responseHelpers.success(res, { message: 'Task executed' })
    } catch {
      responseHelpers.error(res, 'Failed to execute task')
    }
  }) as ControllerHandler,

  getTaskResult: (async (_req, res, _params, _body, _user) => {
    try {
      responseHelpers.success(res, {})
    } catch {
      responseHelpers.error(res, 'Failed to get task result')
    }
  }) as ControllerHandler,
}
