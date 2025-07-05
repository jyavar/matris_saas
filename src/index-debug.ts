import { createServer } from 'http'
import { parse } from 'url'

import { authController } from './controllers/auth.controller'
import { healthController } from './controllers/health.controller'
import logger from './services/logger.service'
import { createRouter } from './utils/router'

const version = process.env.npm_package_version || '1.0.0'
const router = createRouter()

function sendJson(res: any, status: number, data: any) {
  res.writeHead(status, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(data))
}

// Setup routes
router.post('/api/auth/signup', authController.signUp)
router.post('/api/auth/signin', authController.signIn)

const server = createServer(async (req, res) => {
  const { pathname } = parse(req.url || '', true)
  
  // Built-in health and metrics endpoints
  if (req.method === 'GET' && pathname === '/api/health') {
    return sendJson(res, 200, {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      version
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