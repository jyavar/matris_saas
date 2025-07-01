import express from 'express'
import helmet from 'helmet'

import router from './routes/router.js'
import logger from './services/logger.service.js'

const app = express()

// Configuración de seguridad
app.use(helmet())

// Parse JSON bodies
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Health check
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() })
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
