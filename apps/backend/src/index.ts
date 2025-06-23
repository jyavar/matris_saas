import express, { type ErrorRequestHandler } from 'express'

import { createErrorHandler } from './middleware/errorHandler.middleware.js'
import { loggerMiddleware } from './middleware/logger.middleware.js'
import analyticsRoutes from './routes/analytics.routes.js'
import authRoutes from './routes/auth.routes.js'
import devRoutes from './routes/dev.routes.js'
import healthRoutes from './routes/health.routes.js'
import profilesRoutes from './routes/profiles.routes.js'
import todoRoutes from './routes/todo.routes.js'
import logger from './services/logger.service.js'

export { logger }
export const app = express()

app.use(express.json())
app.use(loggerMiddleware)

// Route registration
app.use('/health', healthRoutes)
app.use('/dev', devRoutes)
app.use('/todos', todoRoutes)
app.use('/auth', authRoutes)
app.use('/profiles', profilesRoutes)
app.use('/analytics', analyticsRoutes)

// Error handling middleware
const errorHandler: ErrorRequestHandler = createErrorHandler(logger)
app.use(errorHandler)
