import { IncomingMessage, ServerResponse } from 'http'

import { authMiddleware } from '../middleware/auth.middleware.js'
import type { ControllerHandler,RouteDefinition } from '../types/express/index.js'
import { ApiError } from '../utils/ApiError.js'

export const devRoutes: RouteDefinition[] = [
  {
    method: 'GET',
    path: '/error-test',
    handler: (async () => {
      // Test a custom ApiError
      throw new ApiError("I'm a teapot", 418)
    }) as ControllerHandler,
  },
  {
    method: 'GET',
    path: '/unexpected-error-test',
    handler: (async () => {
      // Test a generic error
      throw 'Unexpected error'
    }) as ControllerHandler,
  },
  {
    method: 'GET',
    path: '/protected',
    middlewares: [authMiddleware],
    handler: (async (_req: IncomingMessage, res: ServerResponse) => {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(
        JSON.stringify({ success: true, message: 'Protected route accessed' }),
      )
    }) as ControllerHandler,
  },
  {
    method: 'GET',
    path: '/health',
    handler: (async (_req: IncomingMessage, res: ServerResponse) => {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: true, status: 'healthy' }))
    }) as ControllerHandler,
  },
]
