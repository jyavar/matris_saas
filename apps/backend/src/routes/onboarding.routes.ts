import { Router } from 'express'

import {
  onboardingSchema,
  OnboardingService,
} from '../services/onboarding.service.js'

const router = Router()

router.post('/register', async (req, res) => {
  const parse = onboardingSchema.safeParse(req.body)
  if (!parse.success) {
    return res
      .status(400)
      .json({ error: 'Datos inválidos', details: parse.error.errors })
  }
  try {
    const result = await OnboardingService.registerUser(parse.data)
    res.json(result)
  } catch (e) {
    res
      .status(500)
      .json({ ok: false, error: e instanceof Error ? e.message : String(e) })
  }
})

export default router
