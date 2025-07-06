import { IncomingMessage, ServerResponse } from 'http'

import type { ControllerHandler, RequestBody, RouteDefinition } from '../types/express/index.js'

type MiddlewareHandler = (
  req: IncomingMessage,
  res: ServerResponse,
  _next: () => void
) => void | Promise<void>

/**
 * Simple router for Node.js native HTTP
 */
export class Router {
  private routes: RouteDefinition[] = []

  /**
   * Add a GET route
   */
  get(path: string, handler: ControllerHandler, middlewares: MiddlewareHandler[] = []): void {
    this.routes.push({
      method: 'GET',
      path,
      handler,
      middlewares,
    })
  }

  /**
   * Add a POST route
   */
  post(path: string, handler: ControllerHandler, middlewares: MiddlewareHandler[] = []): void {
    this.routes.push({
      method: 'POST',
      path,
      handler,
      middlewares,
    })
  }

  /**
   * Add a PUT route
   */
  put(path: string, handler: ControllerHandler, middlewares: MiddlewareHandler[] = []): void {
    this.routes.push({
      method: 'PUT',
      path,
      handler,
      middlewares,
    })
  }

  /**
   * Add a DELETE route
   */
  delete(path: string, handler: ControllerHandler, middlewares: MiddlewareHandler[] = []): void {
    this.routes.push({
      method: 'DELETE',
      path,
      handler,
      middlewares,
    })
  }

  /**
   * Add a PATCH route
   */
  patch(path: string, handler: ControllerHandler, middlewares: MiddlewareHandler[] = []): void {
    this.routes.push({
      method: 'PATCH',
      path,
      handler,
      middlewares,
    })
  }

  /**
   * Handle incoming request
   */
  async handleRequest(req: IncomingMessage, res: ServerResponse): Promise<void> {
    const route = this.findRoute(req.method || 'GET', req.url || '')
    
    if (!route) {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: false, error: 'Not found' }))
      return
    }

    try {
      const params = this.extractParams(req.url || '', route.path)
      
      // Execute middlewares if they exist
      if (route.middlewares && route.middlewares.length > 0) {
        await this.executeMiddlewares(route.middlewares, req, res)
      }

      const body = await this.parseRequestBody(req)
      await route.handler(req, res, _params, body as RequestBody | undefined)
    } catch {
      console.error('Request handling error:', error)
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: false, error: 'Internal server error' }))
    }
  }

  /**
   * Find matching route
   */
  private findRoute(method: string, path: string): RouteDefinition | undefined {
    return this.routes.find(route => {
      if (route.method !== method) return false
      return this.matchPath(route.path, path)
    })
  }

  /**
   * Match path pattern with actual path
   */
  private matchPath(pattern: string, path: string): boolean {
    // Simple pattern matching for :param
    const patternParts = pattern.split('/')
    const pathParts = path.split('/')

    if (patternParts.length !== pathParts.length) return false

    for (let i = 0; i < patternParts.length; i++) {
      const patternPart = patternParts[i]
      const pathPart = pathParts[i]

      if (patternPart?.startsWith(':')) {
        // Parameter placeholder
        continue
      }

      if (patternPart !== pathPart) {
        return false
      }
    }

    return true
  }

  /**
   * Extract parameters from path
   */
  private extractParams(pattern: string, path: string): Record<string, string> {
    const params: Record<string, string> = {}
    const patternParts = pattern.split('/')
    const pathParts = path.split('/')

    for (let i = 0; i < patternParts.length; i++) {
      const patternPart = patternParts[i]
      const pathPart = pathParts[i]

      if (patternPart?.startsWith(':')) {
        const paramName = patternPart.slice(1)
        params[paramName] = pathPart || ''
      }
    }

    return params
  }

  /**
   * Execute middlewares
   */
  private async executeMiddlewares(middlewares: MiddlewareHandler[], req: IncomingMessage, res: ServerResponse): Promise<void> {
    for (const middleware of middlewares) {
      await new Promise<void>((resolve, reject) => {
        const result = middleware(req, res, () => {
          resolve()
        })
        
        if (result instanceof Promise) {
          result.then(resolve).catch(reject)
        }
      })
    }
  }

  /**
   * Get all routes (for debugging)
   */
  getRoutes(): RouteDefinition[] {
    return [...this.routes]
  }

  /**
   * Clear all routes
   */
  clear(): void {
    this.routes = []
  }

  /**
   * Parse request body
   */
  private async parseRequestBody(req: IncomingMessage): Promise<unknown> {
    return new Promise((resolve, reject) => {
      let body = ''
      
      req.on('data', (chunk) => {
        body += chunk.toString()
      })
      
      req.on('end', () => {
        try {
          if (body) {
            const contentType = req.headers['content-type'] || ''
            if (contentType.includes('application/json')) {
              resolve(JSON.parse(body))
            } else {
              resolve(body)
            }
          } else {
            resolve({})
          }
        } catch {
          reject(error)
        }
      })
      
      req.on('error', (error) => {
        reject(error)
      })
    })
  }
}

/**
 * Create a new router instance
 */
export const createRouter = (): Router => {
  return new Router()
} 