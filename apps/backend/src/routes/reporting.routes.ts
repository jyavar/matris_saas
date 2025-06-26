import { Router } from 'express'

import { ReportingService } from '../services/reporting.service.js'

const router = Router()

// GET /reporting/usage?period=2024-07
router.get('/usage', async (req, res) => {
  const period = req.query.period as string
  if (!period) {
    res.status(400).json({ error: 'Missing period' })
    return
  }
  try {
    const report = await ReportingService.getUsageReport(period)
    res.json(report)
  } catch (e) {
    res.status(404).json({ error: (e as Error).message })
  }
})

// GET /reporting/event?event=login&period=2024-07
router.get('/event', async (req, res) => {
  const event = req.query.event as string
  const period = req.query.period as string
  if (!event || !period) {
    res.status(400).json({ error: 'Missing event or period' })
    return
  }
  try {
    const report = await ReportingService.getEventReport(event, period)
    res.json(report)
  } catch (e) {
    res.status(404).json({ error: (e as Error).message })
  }
})

export default router
