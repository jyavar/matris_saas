import { createServer } from 'http'
import { parse } from 'url'
import logger from './services/logger.service.js'

const version = process.env.npm_package_version || '1.0.0'

function sendJson(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(data))
}

const server = createServer((req, res) => {
  const { pathname } = parse(req.url || '', true)
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
  // 404 para cualquier otra ruta
  sendJson(res, 404, { success: false, error: 'Route not found' })
})

export { server, logger }
