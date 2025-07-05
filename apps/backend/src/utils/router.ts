import { IncomingMessage, ServerResponse } from 'http'

import type { ControllerHandler,RouteDefinition } from '../types/express/index.js'

type MiddlewareHandler = (
  req: IncomingMessage,
  res: ServerResponse,
  next: () => void
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
    const method = req.method || 'GET'
    const url = req.url || '/'
    const path = new URL(url, `http://${req.headers.host}`).pathname

    // Find matching route
    const route = this.findRoute(method, path)

    if (!route) {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: false,
        error: 'Route not found',
        timestamp: new Date().toISOString(),
      }))
      return
    }

    // Extract path parameters
    const params = this.extractParams(route.path, path)

    // Parse request body for POST/PUT/PATCH requests
    let body: any = undefined
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      try {
        body = await this.parseRequestBody(req)
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'Invalid request body',
          timestamp: new Date().toISOString(),
        }))
        return
      }
    }

    // Execute middlewares
    await this.executeMiddlewares(route.middlewares, req, res)

    // Execute handler
    await route.handler(req, res, params, body)
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

      if (patternPart.startsWith(':')) {
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

      if (patternPart.startsWith(':')) {
        const paramName = patternPart.slice(1)
        params[paramName] = pathPart
      }
    }

    return params
  }

  /**
   * Execute middlewares
   */
  private async executeMiddlewares(
    middlewares: MiddlewareHandler[],
    req: IncomingMessage,
    res: ServerResponse
  ): Promise<void> {
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
}

/**
 * Create a new router instance
 */
export const createRouter = (): Router => {
  return new Router()
} 