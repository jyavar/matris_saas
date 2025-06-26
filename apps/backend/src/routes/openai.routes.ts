import { Router } from 'express'
import { z } from 'zod'

import { OpenAIService } from '../services/openai.service.js'

const router = Router()

const promptSchema = z.object({ prompt: z.string().min(3) })

router.post('/prompt', async (req, res) => {
  const parse = promptSchema.safeParse(req.body)
  if (!parse.success) {
    return res
      .status(400)
      .json({ error: 'Prompt inválido', details: parse.error.errors })
  }
  try {
    const answer = await OpenAIService.sendPrompt(parse.data.prompt)
    res.json({ ok: true, answer })
  } catch (e) {
    res
      .status(500)
      .json({ ok: false, error: e instanceof Error ? e.message : String(e) })
  }
})

export default router
