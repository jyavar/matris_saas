import express, { type ErrorRequestHandler } from 'express'
import helmet from 'helmet'

// import { authMiddleware } from './middleware/auth.middleware.js'
// import { createErrorHandler } from './middleware/errorHandler.middleware.js'
import { loggerMiddleware } from './middleware/logger.middleware.js'
import healthRoutes from './routes/health.routes.js'
import router from './routes/router.js'
// import logger from './services/logger.service.js'

// export { logger }
export const app = express()

app.use(express.json())
app.use(loggerMiddleware)
// app.use((req, res, next) => {
//   console.log(`[${req.method}] ${req.url}`)
//   next()
// })
app.use(helmet())

// Route registration
app.use('/health', healthRoutes)
app.use(router)

// app.get('/protected', authMiddleware, (_req, res) => {
//   res.status(200).json({ ok: true, message: 'Protected route accessed' })
// })

// Error handling middleware
import { createErrorHandler } from './middleware/errorHandler.middleware.js'
import logger from './services/logger.service.js'
const errorHandler: ErrorRequestHandler = createErrorHandler(logger)
app.use(errorHandler)
