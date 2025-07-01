import type { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

import logger from '../services/logger.service.js'
import { openaiService } from '../services/openai.service.js'
import { ApiError } from '../utils/ApiError.js'
import { enforceExactShape } from '../utils/enforceExactShape.js'

const generateTextSchema = z.object({
  user_id: z.string().min(1),
  prompt: z.string().min(1),
})

export const OpenAIController = {
  async generateText(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user
      if (!user?.id) throw new ApiError(401, 'Unauthorized')
      const prompt =
        req.body && typeof req.body.prompt === 'string' ? req.body.prompt : ''
      const user_id = user && typeof user.id === 'string' ? user.id : ''
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const input = enforceExactShape({
        prompt: prompt as string,
        user_id: user_id as string,
      })
      const parsed = generateTextSchema.safeParse(input)

      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          error: 'Validation error',
          details: parsed.error.errors,
        })
      }

      const result = await openaiService.generateText({
        user_id: parsed.data.user_id,
        prompt: parsed.data.prompt,
      })

      logger.info({ userId: parsed.data.user_id }, 'Text generated with OpenAI')

      return res.status(200).json({
        success: true,
        data: result,
      })
    } catch (error) {
      next(error)
    }
  },
}
