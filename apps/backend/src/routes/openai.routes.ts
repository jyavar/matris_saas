import { openaiController } from '../controllers/openai.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { handleAsync } from '../middleware/errorHandler.middleware.js'

export const openaiRoutes = [
  { method: 'POST', path: '/generate', middlewares: [authMiddleware], handler: handleAsync(openaiController.generateText) },
]
