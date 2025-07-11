import { createServer, ServerResponse } from 'http'
import { parse } from 'url'

import { analyticsRoutes } from './routes/analytics.routes'
// Import all route modules
import { analyticsReportingRoutes } from './routes/analytics-reporting.routes'
import { authRoutes } from './routes/auth.routes'
import { automationRoutes } from './routes/automation.routes'
import { billingRoutes } from './routes/billing.routes'
import { campaignsRoutes } from './routes/campaigns.routes'
import { devRoutes } from './routes/dev.routes'
import { emailCampaignsRoutes } from './routes/email-campaigns.routes'
import { healthRoutes } from './routes/health.routes'
import { launchboardRoutes } from './routes/launchboard.routes'
import { onboardingRoutes } from './routes/onboarding.routes'
import { openaiRoutes } from './routes/openai.routes'
import { paymentsRoutes } from './routes/payments.routes'
import { posthogRoutes } from './routes/posthog.routes'
import { pricingRoutes } from './routes/pricing.routes'
import { profilesRoutes } from './routes/profiles.routes'
import { reportingRoutes } from './routes/reporting.routes'
import { resendRoutes } from './routes/resend.routes'
import { runtimeRoutes } from './routes/runtime.routes'
import { settingsRoutes } from './routes/settings.routes'
import { todoRoutes } from './routes/todo.routes'
import logger from './services/logger.service'
import type { RouteDefinition } from './types/express'
import { createRouter } from './utils/router'
const version = process.env.npm_package_version || '1.0.0'
const router = createRouter()

function sendJson(res: ServerResponse, status: number, data: unknown): void {
  res.writeHead(status, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(data))
}

// Helper function to register routes safely
function registerRoutes(routes: RouteDefinition[], basePath: string = '') {
  routes.forEach((route) => {
    const method = route.method.toLowerCase() as keyof typeof router
    if (typeof router[method] === 'function') {
      const fullPath = basePath ? `${basePath}${route.path}` : route.path
      ;(router[method] as (path: string, handler: RouteDefinition['handler'], middlewares?: RouteDefinition['middlewares']) => void)(
        fullPath,
        route.handler,
        route.middlewares || [],
      )
    }
  })
}

// Register all route modules with their base paths
registerRoutes(analyticsReportingRoutes, '/api/analytics-reporting')
registerRoutes(analyticsRoutes, '/api/analytics')
registerRoutes(authRoutes, '/auth')
registerRoutes(automationRoutes, '/api/automation')
registerRoutes(billingRoutes, '/api/billing')
registerRoutes(campaignsRoutes) // campaigns routes already have full paths
registerRoutes(devRoutes, '/api/dev')
registerRoutes(emailCampaignsRoutes, '/api/email-campaigns')
registerRoutes(healthRoutes, '/api/health')
registerRoutes(launchboardRoutes, '/api/launchboard')
registerRoutes(onboardingRoutes, '/api/onboarding')
registerRoutes(openaiRoutes, '/api/openai')
registerRoutes(paymentsRoutes, '/api/payments')
registerRoutes(posthogRoutes, '/api/posthog')
registerRoutes(pricingRoutes, '/api/pricing')
registerRoutes(profilesRoutes, '/api/profiles')
registerRoutes(reportingRoutes, '/api/reporting')
registerRoutes(resendRoutes, '/api/resend')
registerRoutes(runtimeRoutes, '/api/runtime')
registerRoutes(settingsRoutes, '/api')
registerRoutes(todoRoutes, '/api/todos')

// Health endpoint
router.get('/health', async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(
    JSON.stringify({
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
    }),
  )
})

router.get('/api/health', async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(
    JSON.stringify({
      success: true,
      data: {
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
      },
    }),
  )
})

// Metrics endpoint
router.get('/metrics', async (req, res) => {
  const memUsage = process.memoryUsage()
  const cpuUsage = process.cpuUsage()

  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(
    JSON.stringify({
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
      version,
      platform: process.platform,
    }),
  )
})

const server = createServer(async (req, res) => {
  const { pathname } = parse(req.url || '', true)

  // Built-in health and metrics endpoints
  if (req.method === 'GET' && pathname === '/api/health') {
    return sendJson(res, 200, {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      version,
    })
  }

  if (req.method === 'GET' && pathname === '/api/metrics') {
    const memUsage = process.memoryUsage()
    const cpuUsage = process.cpuUsage()
    return sendJson(res, 200, {
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
      version,
      platform: process.platform,
    })
  }

  // Handle all other routes through the router
  try {
    await router.handleRequest(req, res)
  } catch (error) {
    logger.error('Error handling request:', error)
    sendJson(res, 500, { success: false, error: 'Internal server error' })
  }
})

export { logger, server }
