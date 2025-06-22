import express, { type Application } from 'express'

import { createLoggerMiddleware } from './middleware/logger.middleware.js'
import healthRoutes from './routes/health.routes.js'
import logger from './services/logger.service.js'

const app: Application = express()

app.use(createLoggerMiddleware(logger))
app.use(express.json())

app.use('/health', healthRoutes)

export default app
