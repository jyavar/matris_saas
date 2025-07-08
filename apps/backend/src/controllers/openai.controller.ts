import { IncomingMessage, ServerResponse } from 'http'
import { z } from 'zod'

import logger from '../services/logger.service.js'
import { openaiService } from '../services/openai.service.js'
import type { AuthenticatedUser, RequestBody } from '../types/express/index.js'
import { enforceExactShape } from '../utils/enforceExactShape.js'
import {
  sendUnauthorized,
  sendValidationError,
} from '../utils/response.helper.js'
const generateTextSchema = z.object({
  user_id: z.string().min(1),
  prompt: z.string().min(1),
})

export const openaiController = {
  async generateText(
    _req: IncomingMessage,
    res: ServerResponse,
    _body?: RequestBody,
    user?: AuthenticatedUser,
    _user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      if (!_user?.id) {
        return sendUnauthorized(res, 'Unauthorized')
      }
      const prompt =
        _body && typeof _body.prompt === 'string' ? _body.prompt : ''
      const user_id = user && typeof _user?.id === 'string' ? _user?.id : ''
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const input = enforceExactShape({
        prompt: prompt as string,
        user_id: user_id as string,
      })
      const parsed = generateTextSchema.safeParse(input)

      if (!parsed.success) {
        return sendValidationError(res, parsed.error.errors, 'Validation error')
      }

      const result = await openaiService.generateText({
        user_id: parsed.data.user_id,
        prompt: parsed.data.prompt,
      })

      logger.info({ userId: parsed.data.user_id }, 'Text generated with OpenAI')

      return sendSuccess(res, result)
    } catch {
      return sendError(res, 'Internal server error', 500)
    }
  },
}
