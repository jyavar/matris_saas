import { IncomingMessage, ServerResponse } from 'http'

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5173',
  'https://strato.app',
  'https://app.strato.app',
]

const allowedMethods = [
  'GET',
  'POST',
  'PUT',
  'DELETE',
  'PATCH',
  'OPTIONS',
]

const allowedHeaders = [
  'Content-Type',
  'Authorization',
  'X-Requested-With',
  'Accept',
  'Origin',
  'X-Test-User-Id',
  'X-Test-Tenant-Id',
]

export const corsMiddleware = (
  req: IncomingMessage,
  res: ServerResponse,
  next: () => void,
): void => {
  const origin = req.headers.origin

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': origin && allowedOrigins.includes(origin) ? origin : allowedOrigins[0],
      'Access-Control-Allow-Methods': allowedMethods.join(', '),
      'Access-Control-Allow-Headers': allowedHeaders.join(', '),
      'Access-Control-Max-Age': '86400', // 24 hours
      'Access-Control-Allow-Credentials': 'true',
    })
    res.end()
    return
  }

  // Set CORS headers for actual requests
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  } else {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigins[0])
  }

  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', allowedMethods.join(', '))
  res.setHeader('Access-Control-Allow-Headers', allowedHeaders.join(', '))

  next()
}

// Development CORS middleware (more permissive)
export const devCorsMiddleware = (
  req: IncomingMessage,
  res: ServerResponse,
  next: () => void,
): void => {
  if (process.env.NODE_ENV === 'development') {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
  }

  next()
} 