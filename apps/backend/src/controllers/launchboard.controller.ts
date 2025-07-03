import { Request, Response } from 'express'

import { launchboardService } from '../services/launchboard.service.js'

export const launchboardController = {
  async getDashboards(req: Request, res: Response): Promise<void> {
    const dashboards = await launchboardService.getDashboards()
    res.status(200).json({ success: true, data: dashboards })
  },

  async getDashboardById(req: Request, res: Response): Promise<void> {
    const { id } = req.params
    const dashboard = await launchboardService.getDashboardById(id)
    if (!dashboard) {
      res.status(404).json({ success: false, message: 'Dashboard not found' })
      return
    }
    res.status(200).json({ success: true, data: dashboard })
  },

  async createDashboard(req: Request, res: Response): Promise<void> {
    const { name, widgets } = req.body
    if (!name || typeof name !== 'string' || !Array.isArray(widgets)) {
      res.status(400).json({ success: false, message: 'Invalid data' })
      return
    }
    const dashboard = await launchboardService.createDashboard({
      name,
      widgets,
    })
    res.status(201).json({ success: true, data: dashboard })
  },

  async updateDashboard(req: Request, res: Response): Promise<void> {
    const { id } = req.params
    const { name, widgets } = req.body
    const dashboard = await launchboardService.updateDashboard(id, {
      name,
      widgets,
    })
    if (!dashboard) {
      res.status(404).json({ success: false, message: 'Dashboard not found' })
      return
    }
    res.status(200).json({ success: true, data: dashboard })
  },

  async deleteDashboard(req: Request, res: Response): Promise<void> {
    const { id } = req.params
    const deleted = await launchboardService.deleteDashboard(id)
    if (!deleted) {
      res.status(404).json({ success: false, message: 'Dashboard not found' })
      return
    }
    res.status(200).json({ success: true })
  },
}
