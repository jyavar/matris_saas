import { RuntimeService } from '../services/runtime.service.js'

export const runtimeController = {
  async getStatus(req: any, res: any, next: any) {
    try {
      const jobs = RuntimeService.listJobs()
      res.json({ success: true, data: { jobs, count: jobs.length } })
    } catch (error) {
      next(error)
    }
  },

  async getHealth(req: any, res: any, next: any) {
    try {
      res.json({ success: true, status: 'healthy' })
    } catch (error) {
      next(error)
    }
  },

  async getMetrics(req: any, res: any, next: any) {
    try {
      res.json({ success: true, data: {} })
    } catch (error) {
      next(error)
    }
  },

  async getLogs(req: any, res: any, next: any) {
    try {
      res.json({ success: true, data: [] })
    } catch (error) {
      next(error)
    }
  },

  async restart(req: any, res: any, next: any) {
    try {
      res.json({ success: true, message: 'Restart initiated' })
    } catch (error) {
      next(error)
    }
  },

  async shutdown(req: any, res: any, next: any) {
    try {
      res.json({ success: true, message: 'Shutdown initiated' })
    } catch (error) {
      next(error)
    }
  },

  async getConfig(req: any, res: any, next: any) {
    try {
      res.json({ success: true, data: {} })
    } catch (error) {
      next(error)
    }
  },

  async updateConfig(req: any, res: any, next: any) {
    try {
      res.json({ success: true, message: 'Config updated' })
    } catch (error) {
      next(error)
    }
  },

  async getAgents(req: any, res: any, next: any) {
    try {
      res.json({ success: true, data: ['refactor'] })
    } catch (error) {
      next(error)
    }
  },

  async startAgent(req: any, res: any, next: any) {
    try {
      const { name } = req.params
      res.json({ success: true, message: `Agent ${name} started` })
    } catch (error) {
      next(error)
    }
  },

  async stopAgent(req: any, res: any, next: any) {
    try {
      const { name } = req.params
      res.json({ success: true, message: `Agent ${name} stopped` })
    } catch (error) {
      next(error)
    }
  },

  async getAgentStatus(req: any, res: any, next: any) {
    try {
      const { name } = req.params
      res.json({ success: true, data: { name, status: 'running' } })
    } catch (error) {
      next(error)
    }
  },

  async getAgentLogs(req: any, res: any, next: any) {
    try {
      const { name } = req.params
      res.json({ success: true, data: [] })
    } catch (error) {
      next(error)
    }
  },

  async runAgent(req: any, res: any, next: any) {
    try {
      const { name } = req.params
      const result = await RuntimeService.runAgent(name, req.body)
      if (result.ok) {
        res.json({ success: true, result: result.result })
      } else {
        res.status(400).json({ success: false, error: result.error })
      }
    } catch (error) {
      next(error)
    }
  },

  async getTasks(req: any, res: any, next: any) {
    try {
      const jobs = RuntimeService.listJobs()
      res.json({ success: true, data: jobs })
    } catch (error) {
      next(error)
    }
  },

  async createTask(req: any, res: any, next: any) {
    try {
      const { id, schedule } = req.body
      if (!id || !schedule) {
        return res.status(400).json({ error: 'Missing id or schedule' })
      }
      const job = RuntimeService.createJob(id, schedule, () => {
        // Placeholder: aquí se ejecutaría la lógica real del job
      })
      res.status(201).json({ success: true, data: job })
    } catch (error) {
      next(error)
    }
  },

  async getTaskById(req: any, res: any, next: any) {
    try {
      const { id } = req.params
      const jobs = RuntimeService.listJobs()
      const job = jobs.find(j => j.id === id)
      if (!job) {
        return res.status(404).json({ error: 'Task not found' })
      }
      res.json({ success: true, data: job })
    } catch (error) {
      next(error)
    }
  },

  async updateTask(req: any, res: any, next: any) {
    try {
      res.json({ success: true, message: 'Task updated' })
    } catch (error) {
      next(error)
    }
  },

  async deleteTask(req: any, res: any, next: any) {
    try {
      const { id } = req.params
      RuntimeService.deleteJob(id)
      res.json({ success: true, message: 'Task deleted' })
    } catch (error) {
      next(error)
    }
  },

  async executeTask(req: any, res: any, next: any) {
    try {
      res.json({ success: true, message: 'Task executed' })
    } catch (error) {
      next(error)
    }
  },

  async getTaskResult(req: any, res: any, next: any) {
    try {
      res.json({ success: true, data: {} })
    } catch (error) {
      next(error)
    }
  },
} 