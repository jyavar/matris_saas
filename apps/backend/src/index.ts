import express from 'express'
import helmet from 'helmet'

import {
  compressionMiddleware,
  corsMiddleware,
  memoryMiddleware,
  performanceMiddleware,
} from './middleware/performance.middleware.js'
import analyticsRoutes from './routes/analytics.routes.js'
import analyticsReportingRoutes from './routes/analytics-reporting.routes.js'
import authRoutes from './routes/auth.routes.js'
import automationRoutes from './routes/automation.routes.js'
import billingRoutes from './routes/billing.routes.js'
import campaignsRoutes from './routes/campaigns.routes.js'
import devRoutes from './routes/dev.routes.js'
import emailCampaignsRoutes from './routes/email-campaigns.routes.js'
import healthRoutes from './routes/health.routes.js'
import launchboardRoutes from './routes/launchboard.routes.js'
import onboardingRoutes from './routes/onboarding.routes.js'
import openaiRoutes from './routes/openai.routes.js'
import posthogRoutes from './routes/posthog.routes.js'
import pricingRoutes from './routes/pricing.routes.js'
import profilesRoutes from './routes/profiles.routes.js'
import reportingRoutes from './routes/reporting.routes.js'
import resendRoutes from './routes/resend.routes.js'
import runtimeRoutes from './routes/runtime.routes.js'
import todoRoutes from './routes/todo.routes.js'
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

// Montar routers
app.use('/api/analytics', analyticsRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/campaigns', campaignsRoutes)
app.use('/api/health', healthRoutes)
app.use('/api/onboarding', onboardingRoutes)
app.use('/api/openai', openaiRoutes)
app.use('/api/posthog', posthogRoutes)
app.use('/api/pricing', pricingRoutes)
app.use('/api/profiles', profilesRoutes)
app.use('/api/todo', todoRoutes)
app.use('/api/automation', automationRoutes)
app.use('/api/analytics-reporting', analyticsReportingRoutes)
app.use('/api/runtime', runtimeRoutes)
app.use('/api/resend', resendRoutes)
app.use('/api/email-campaigns', emailCampaignsRoutes)
app.use('/api/launchboard', launchboardRoutes)
app.use('/api/dev', devRoutes)
app.use('/api/reporting', reportingRoutes)
app.use('/api/billing', billingRoutes)

// Error handling middleware
app.use((err: Error, _req: express.Request, res: express.Response) => {
  logger.error(err, 'Unhandled error')
  res.status(500).json({
    success: false,
    error: 'Internal server error',
  })
})

// 404 handler
app.use('{*path}', (_req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
  })
})

// Instrumentación para capturar errores de path-to-regexp
process.on('uncaughtException', (err) => {
  if (err && err.message && err.message.includes('path-to-regexp')) {
    // eslint-disable-next-line no-console
    console.error('PATH-TO-REGEXP ERROR DETECTED:', err.stack)
  }
  throw err
})
process.on('unhandledRejection', (reason) => {
  if (
    reason &&
    reason instanceof Error &&
    reason.message.includes('path-to-regexp')
  ) {
    // eslint-disable-next-line no-console
    console.error('PATH-TO-REGEXP ERROR DETECTED (Promise):', reason.stack)
  }
  throw reason
})

export { app, logger }
