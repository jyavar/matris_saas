import { Router } from 'express'

import { PostHogService } from '../services/posthog.service.js'

const router = Router()

// POST /posthog/event
router.post('/event', (req, res) => {
  const { distinctId, event, properties } = req.body
  if (!distinctId || !event)
    return res.status(400).json({ error: 'Missing distinctId or event' })
  PostHogService.captureEvent(distinctId, event, properties)
  res.json({ ok: true })
})

export default router
