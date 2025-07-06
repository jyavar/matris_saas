import { IncomingMessage, ServerResponse } from 'http'
import { z } from 'zod'

import logger from '../services/logger.service.js'
import { openaiService } from '../services/openai.service.js'
import type { AuthenticatedUser, RequestBody } from '../types/express/index.js'
import { enforceExactShape } from '../utils/enforceExactShape.js'

const generateTextSchema = z.object({
  user_id: z.string().min(1),
  prompt: z.string().min(1),
})

export const openaiController = {
  async generateText(req: IncomingMessage, res: ServerResponse, _body?: RequestBody, user?: AuthenticatedUser): Promise<void> {
    try {
      if (!user?.id) {
        res.writeHead(401, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, error: 'Unauthorized' }))
        return
      }
      const prompt =
        _body && typeof _body.prompt === 'string' ? _body.prompt : ''
      const user_id = user && typeof user?.id === 'string' ? user?.id : ''
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const input = enforceExactShape({
        prompt: prompt as string,
        user_id: user_id as string,
      })
      const parsed = generateTextSchema.safeParse(input)

      if (!parsed.success) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'Validation error',
          details: parsed.error.errors,
        }))
        return
      }

      const result = await openaiService.generateText({
        user_id: parsed.data.user_id,
        prompt: parsed.data.prompt,
      })

      logger.info({ userId: parsed.data.user_id }, 'Text generated with OpenAI')

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: true,
        data: result,
      }))
    } catch {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: false, error: 'Internal server error' }))
    }
  },
}
