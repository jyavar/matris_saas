import { IncomingMessage, ServerResponse } from 'http'

import { authMiddleware } from '../middleware/auth.middleware.js'
import { ApiError } from '../utils/ApiError.js'

export const devRoutes = [
  {
    method: 'GET',
    path: '/error-test',
    handler: (
      _req: IncomingMessage,
      _res: ServerResponse,
      _next: () => void,
    ) => {
      // Test a custom ApiError
      _next()
      throw new ApiError("I'm a teapot", 418)
    },
  },
  {
    method: 'GET',
    path: '/unexpected-error-test',
    handler: (
      _req: IncomingMessage,
      _res: ServerResponse,
      _next: () => void,
    ) => {
      // Test a generic error
      _next()
      throw 'Unexpected error'
    },
  },
  {
    method: 'GET',
    path: '/protected',
    middlewares: [authMiddleware],
    handler: (_req: IncomingMessage, res: ServerResponse) => {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(
        JSON.stringify({ success: true, message: 'Protected route accessed' }),
      )
    },
  },
  {
    method: 'GET',
    path: '/health',
    handler: (_req: IncomingMessage, res: ServerResponse) => {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: true, status: 'healthy' }))
    },
  },
]
