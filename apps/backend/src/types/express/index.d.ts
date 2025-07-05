import { User } from '@supabase/supabase-js'
import { IncomingMessage, ServerResponse } from 'http'

declare global {
  namespace Express {
    export interface Request {
      user?: User
    }
  }
}

// User type for authenticated requests
export interface AuthenticatedUser {
  id: string
  email: string
  tenant_id?: string
  role?: string
  permissions?: string[]
}

// Request body type
export type RequestBody = Record<string, unknown>

// Controller handler signature
export type ControllerHandler = (
  req: IncomingMessage,
  res: ServerResponse,
  params?: Record<string, string>,
  body?: RequestBody,
  user?: AuthenticatedUser,
) => Promise<void>

// Route definition type
export interface RouteDefinition {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  path: string
  handler: ControllerHandler
  middlewares?: Array<(req: IncomingMessage, res: ServerResponse, next: () => void) => void>
}
