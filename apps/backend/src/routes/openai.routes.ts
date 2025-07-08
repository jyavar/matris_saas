import { openaiController } from '../controllers/openai.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { handleAsync } from '../middleware/errorHandler.middleware.js'
import type { RouteDefinition } from '../types/express/index.js'

export const openaiRoutes: RouteDefinition[] = [
  {
    method: 'POST',
    path: '/generate',
    middlewares: [authMiddleware],
    handler: handleAsync(openaiController.generateText),
  },
]
