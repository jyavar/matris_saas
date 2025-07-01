import { Router } from 'express'

import { ResendService } from '../services/resend.service.js'

const router = Router()

// @ts-expect-error - Express 5 compatibility issue
router.post('/email', async (req, res) => {
  const { to, subject } = req.body
  if (!to || !subject) {
    return res.status(400).json({ error: 'Faltan campos requeridos' })
  }
  try {
    const result = await ResendService.sendEmail(to, subject)
    res.json(result)
  } catch (e) {
    res
      .status(500)
      .json({ ok: false, error: e instanceof Error ? e.message : String(e) })
  }
})

export default router
