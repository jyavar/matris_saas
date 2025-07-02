import express from 'express'
import helmet from 'helmet'

import {
  compressionMiddleware,
  corsMiddleware,
  memoryMiddleware,
  performanceMiddleware,
} from './middleware/performance.middleware.js'
import router from './routes/router.js'
import logger from './services/logger.service.js'

const app = express()

// Configuración de seguridad
app.use(helmet())

// Performance middlewares
app.use(compressionMiddleware)
app.use(corsMiddleware)
app.use(performanceMiddleware)
app.use(memoryMiddleware)

// Parse JSON bodies
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Health check with performance headers
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.env.npm_package_version || '1.0.0',
  })
})

// Metrics endpoint
app.get('/metrics', (_req, res) => {
  const memUsage = process.memoryUsage()
  const cpuUsage = process.cpuUsage()

  res.status(200).json({
    memory: {
      rss: `${Math.round(memUsage.rss / 1024 / 1024)}MB`,
      heapUsed: `${Math.round(memUsage.heapUsed / 1024 / 1024)}MB`,
      heapTotal: `${Math.round(memUsage.heapTotal / 1024 / 1024)}MB`,
      external: `${Math.round(memUsage.external / 1024 / 1024)}MB`,
    },
    cpu: {
      user: `${Math.round(cpuUsage.user / 1000)}ms`,
      system: `${Math.round(cpuUsage.system / 1000)}ms`,
    },
    uptime: process.uptime(),
    version: process.env.npm_package_version || '1.0.0',
    platform: process.platform,
  })
})

// API routes
app.use('/api', router)

// Error handling middleware
app.use((err: Error, _req: express.Request, res: express.Response) => {
  logger.error(err, 'Unhandled error')
  res.status(500).json({
    success: false,
    error: 'Internal server error',
  })
})

// 404 handler
app.use('*', (_req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
  })
})

export { app, logger }
