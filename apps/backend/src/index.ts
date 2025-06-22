import express from 'express'
import pinoHttp from 'pino-http'
import { createErrorHandler } from './middleware/errorHandler.middleware.js'
import devRoutes from './routes/dev.routes.js'
import healthRoutes from './routes/health.routes.js'
import logger from './services/logger.service.js'

export { logger }
export const app = express()

app.use(express.json())
app.use(pinoHttp({ logger }))

// Route registration
app.use('/health', healthRoutes)
app.use('/dev', devRoutes)

// Error handling middleware
app.use(createErrorHandler(logger))
