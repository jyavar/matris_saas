import express from 'express'
import helmet from 'helmet'

import router from './routes/router.js'
import logger from './services/logger.service.js'
import { 
  compressionMiddleware, 
  corsMiddleware, 
  performanceMiddleware, 
  memoryMiddleware 
} from './middleware/performance.middleware.js'

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
    version: process.env.npm_package_version || '1.0.0'
  })
})

// Performance metrics endpoint
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
    version: process.version,
    platform: process.platform,
  })
})

// Routes
app.use('/api', router)

// Error handling
const createErrorHandler = (logger: {
  error: (data: unknown, message: string) => void
}) => {
  return (err: Error, req: express.Request, res: express.Response) => {
    logger.error({ error: err.message, stack: err.stack }, 'Unhandled error')

    if (res.headersSent) {
      return
    }

    res.status(500).json({
      success: false,
      error: 'Internal server error',
    })
  }
}

app.use(createErrorHandler(logger))

export { app }
