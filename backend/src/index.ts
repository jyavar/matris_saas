import express, { type Application } from 'express'

import { createErrorHandler } from './middleware/errorHandler.middleware.js'
import { createLoggerMiddleware } from './middleware/logger.middleware.js'
import devRoutes from './routes/dev.routes.js'
import healthRoutes from './routes/health.routes.js'
import { getConfig } from './services/config.service.js'
import logger from './services/logger.service.js'

const app: Application = express()
const config = getConfig()

app.use(createLoggerMiddleware(logger))
app.use(express.json())

app.use('/health', healthRoutes)

if (config.NODE_ENV !== 'production') {
  app.use('/dev', devRoutes)
}

app.use(createErrorHandler(logger))

export default app
