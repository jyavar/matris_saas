import { createServer, ServerResponse } from 'http'
import { parse } from 'url'
import { analyticsRoutes } from '../routes/analytics.routes'
import { analyticsReportingRoutes } from '../routes/analytics-reporting.routes'
import { authRoutes } from '../routes/auth.routes'
import { automationRoutes } from '../routes/automation.routes'
import { billingRoutes } from '../routes/billing.routes'
import { campaignsRoutes } from '../routes/campaigns.routes'
import { devRoutes } from '../routes/dev.routes'
import { emailCampaignsRoutes } from '../routes/email-campaigns.routes'
import { healthRoutes } from '../routes/health.routes'
import { launchboardRoutes } from '../routes/launchboard.routes'
import { onboardingRoutes } from '../routes/onboarding.routes'
import { openaiRoutes } from '../routes/openai.routes'
import { paymentsRoutes } from '../routes/payments.routes'
import { posthogRoutes } from '../routes/posthog.routes'
import { pricingRoutes } from '../routes/pricing.routes'
import { profilesRoutes } from '../routes/profiles.routes'
import { reportingRoutes } from '../routes/reporting.routes'
import { resendRoutes } from '../routes/resend.routes'
import { runtimeRoutes } from '../routes/runtime.routes'
import { todoRoutes } from '../routes/todo.routes'
import logger from '../services/logger.service'
import type { RouteDefinition } from '../types/express'
import { createRouter } from '../utils/router'

const version = process.env.npm_package_version || '1.0.0'

function sendJson(res: ServerResponse, status: number, data: unknown): void {
  res.writeHead(status, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(data))
}

// Helper function to register routes safely
function registerRoutes(routes: RouteDefinition[], basePath: string = '') {
  const router = createRouter()
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
  return router
}

export async function createTestServer() {
  const router = createRouter()

  // Register all route modules with their base paths
  const analyticsReportingRouter = registerRoutes(analyticsReportingRoutes, '/api/analytics-reporting')
  const analyticsRouter = registerRoutes(analyticsRoutes, '/api/analytics')
  const authRouter = registerRoutes(authRoutes, '/api/auth')
  const automationRouter = registerRoutes(automationRoutes, '/api/automation')
  const billingRouter = registerRoutes(billingRoutes, '/api/billing')
  const campaignsRouter = registerRoutes(campaignsRoutes)
  const devRouter = registerRoutes(devRoutes, '/api/dev')
  const emailCampaignsRouter = registerRoutes(emailCampaignsRoutes, '/api/email-campaigns')
  const healthRouter = registerRoutes(healthRoutes, '/api/health')
  const launchboardRouter = registerRoutes(launchboardRoutes, '/api/launchboard')
  const onboardingRouter = registerRoutes(onboardingRoutes, '/api/onboarding')
  const openaiRouter = registerRoutes(openaiRoutes, '/api/openai')
  const paymentsRouter = registerRoutes(paymentsRoutes, '/api/payments')
  const posthogRouter = registerRoutes(posthogRoutes, '/api/posthog')
  const pricingRouter = registerRoutes(pricingRoutes, '/api/pricing')
  const profilesRouter = registerRoutes(profilesRoutes, '/api/profiles')
  const reportingRouter = registerRoutes(reportingRoutes, '/api/reporting')
  const resendRouter = registerRoutes(resendRoutes, '/api/resend')
  const runtimeRouter = registerRoutes(runtimeRoutes, '/api/runtime')
  const todoRouter = registerRoutes(todoRoutes, '/api/todos')

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

  const server = createServer(async (req, res) => {
    const { pathname } = parse(req.url || '', true)

    // Built-in health and metrics endpoints
    if (req.method === 'GET' && pathname === '/health') {
      return sendJson(res, 200, {
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
      })
    }

    if (req.method === 'GET' && pathname === '/api/health') {
      return sendJson(res, 200, {
        success: true,
        data: {
          status: 'OK',
          timestamp: new Date().toISOString(),
          uptime: process.uptime(),
          environment: process.env.NODE_ENV || 'development',
        },
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

  return server
}

/**
 * Test utilities
 */
export const testUtils = {
  /**
   * Create test user data
   */
  createTestUser: (overrides = {}) => ({
    email: 'test@example.com',
    password: 'password123',
    tenant_id: '00000000-0000-0000-0000-000000000001',
    ...overrides,
  }),

  /**
   * Create test todo data
   */
  createTestTodo: (overrides = {}) => ({
    title: 'Test Todo',
    description: 'Test Description',
    completed: false,
    priority: 'medium' as const,
    dueDate: new Date().toISOString(),
    ...overrides,
  }),

  /**
   * Create test campaign data
   */
  createTestCampaign: (overrides = {}) => ({
    title: 'Test Campaign',
    description: 'Test Description',
    budget: 1000,
    status: 'draft' as const,
    ...overrides,
  }),
} 