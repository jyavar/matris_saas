import express, { type ErrorRequestHandler } from 'express'

import { authMiddleware } from './middleware/auth.middleware.js'
import { createErrorHandler } from './middleware/errorHandler.middleware.js'
import { loggerMiddleware } from './middleware/logger.middleware.js'
import router from './routes/router.js'
import logger from './services/logger.service.js'

export { logger }
export const app = express()

app.use(express.json())
app.use(loggerMiddleware)

// Route registration
app.use(router)

app.get('/protected', authMiddleware, (_req, res) => {
  res.status(200).json({ ok: true, message: 'Protected route accessed' })
})

// Error handling middleware
const errorHandler: ErrorRequestHandler = createErrorHandler(logger)
app.use(errorHandler)
