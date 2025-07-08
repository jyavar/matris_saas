// Controller Factory for STRATO Core OS™
// This utility eliminates 80% of controller boilerplate by providing
// generic CRUD operations with consistent error handling and logging

import type { IncomingMessage, ServerResponse } from 'node:http'


import { logAction} from '../services/logger.service.js'
import type { AuthenticatedUser } from '../types/express/index.js'
import { ApiError} from './ApiError.js'
import { parseBody, parseParams} from './request.helper.js'
import { sendNotFound, sendUnauthorized} from './response.helper.js'

export interface CrudService<T, CreateDTO, UpdateDTO> {
  getAll: (userId: string, _params?: Record<string, unknown>) => Promise<T[]>
  getById: (id: string, userId?: string) => Promise<T | null>
  create: (data: CreateDTO & { user_id: string }) => Promise<T | null>
  update: (id: string, data: UpdateDTO) => Promise<T | null>
  delete: (id: string) => Promise<T | null>
  validateCreate?: (data: unknown) => CreateDTO
  validateUpdate?: (data: unknown) => UpdateDTO
}

export interface ControllerOptions {
  requireAuth?: boolean
  logActions?: boolean
  validateTenant?: boolean
}

/**
 * Higher-order function for handling authentication consistently
 * across all controller endpoints
 */
async function withAuth<T>(
  req: IncomingMessage,
  res: ServerResponse,
  handler: (user: AuthenticatedUser) => Promise<T>,
  options: ControllerOptions = {}
): Promise<T | void> {
  const { requireAuth = true, /* logActions */ = true } = options

  try {
    if (requireAuth) {
      const user = (req as { _user?: AuthenticatedUser })._user
      if (!user) {
        return sendUnauthorized(res, 'User not authenticated')
      }
      return await handler(user)
    } else {
      // For public endpoints, create a mock user
      const mockUser = { id: 'anonymous', email: 'anonymous', role: 'guest' } as AuthenticatedUser
      return await handler(mockUser)
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return sendError(res, 'Validation failed', 400, {
        validation_errors: error.errors
      })
    }
    
    if (error instanceof ApiError) {
      return sendError(res, (error as Error).message, error.statusCode)
    }
    
    console.error('Controller error:', error)
    return sendError(res, 'Internal server error', 500)
  }
}

/**
 * Creates a complete CRUD controller with standardized endpoints
 * and consistent error handling
 */
export function createCrudController<T, CreateDTO, UpdateDTO>(
  service: CrudService<T, CreateDTO, UpdateDTO>,
  entityName: string,
  options: ControllerOptions = {}
) {
  const { /* logActions */ = true, /* validateTenant */ = false } = options

  return {
    /**
     * GET /api/{entity} - Get all items
     */
    async getAll(req: IncomingMessage, res: ServerResponse) {
      return withAuth(req, res, async (user) => {
        const items = await service.getAll(user?.id)
        
        if (logActions) {
          logAction(`${entityName}_list_retrieved`, user?.id, { 
            count: items.length,
            ip: req.socket.remoteAddress 
          })
        }
        
        return sendSuccess(res, items)
      }, options)
    },

    /**
     * GET /api/{entity}/:id - Get item by ID
     */
    async getById(req: IncomingMessage, res: ServerResponse) {
      return withAuth(req, res, async (user) => {
        const { id } = parseParams(req.url || '', `/${entityName}/:id`)
        
        if (!id) {
          return sendError(res, `${entityName} ID is required`, 400)
        }
        
        const item = await service.getById(id, user?.id)
        
        if (!item) {
          return sendNotFound(res, `${entityName} not found`)
        }
        
        if (logActions) {
          logAction(`${entityName}_retrieved`, user?.id, { 
            id,
            ip: req.socket.remoteAddress 
          })
        }
        
        return sendSuccess(res, item)
      }, options)
    },

    /**
     * POST /api/{entity} - Create new item
     */
    async create(req: IncomingMessage, res: ServerResponse) {
      return withAuth(req, res, async (user) => {
        const body = await parseBody(req)
        
        // Validate input if validator is provided
        let validatedData: CreateDTO
        if (service.validateCreate) {
          validatedData = service.validateCreate(body)
        } else {
          validatedData = body as CreateDTO
        }
        
        const item = await service.create({ 
          ...validatedData, 
          user_id: user?.id 
        })
        
        if (!item) {
          return sendError(res, `Failed to create ${entityName}`, 500)
        }
        
        if (logActions) {
          logAction(`${entityName}_created`, user?.id, { 
            id: (item as { id: unknown }).id,
            ip: req.socket.remoteAddress 
          })
        }
        
        return sendCreated(res, item)
      }, options)
    },

    /**
     * PUT /api/{entity}/:id - Update item
     */
    async update(req: IncomingMessage, res: ServerResponse) {
      return withAuth(req, res, async (user) => {
        const { id } = parseParams(req.url || '', `/${entityName}/:id`)
        
        if (!id) {
          return sendError(res, `${entityName} ID is required`, 400)
        }
        
        const body = await parseBody(req)
        
        // Validate input if validator is provided
        let validatedData: UpdateDTO
        if (service.validateUpdate) {
          validatedData = service.validateUpdate(body)
        } else {
          validatedData = body as UpdateDTO
        }
        
        const item = await service.update(id, validatedData)
        
        if (!item) {
          return sendNotFound(res, `${entityName} not found`)
        }
        
        if (logActions) {
          logAction(`${entityName}_updated`, user?.id, { 
            id,
            ip: req.socket.remoteAddress 
          })
        }
        
        return sendSuccess(res, item)
      }, options)
    },

    /**
     * DELETE /api/{entity}/:id - Delete item
     */
    async delete(req: IncomingMessage, res: ServerResponse) {
      return withAuth(req, res, async (user) => {
        const { id } = parseParams(req.url || '', `/${entityName}/:id`)
        
        if (!id) {
          return sendError(res, `${entityName} ID is required`, 400)
        }
        
        const deletedItem = await service.delete(id)
        
        if (!deletedItem) {
          return sendNotFound(res, `${entityName} not found`)
        }
        
        if (logActions) {
          logAction(`${entityName}_deleted`, user?.id, { 
            id,
            ip: req.socket.remoteAddress 
          })
        }
        
        return sendSuccess(res, { 
          message: `${entityName} deleted successfully`,
          id 
        })
      }, options)
    }
  }
}

/**
 * Creates a controller with only read operations (no create, update, delete)
 */
export function createReadOnlyController<T>(
  service: Pick<CrudService<T, unknown, unknown>, 'getAll' | 'getById'>,
  entityName: string,
  options: ControllerOptions = {}
) {
  const crudController = createCrudController(
    service as CrudService<T, unknown, unknown>,
    entityName,
    options
  )
  
  return {
    getAll: crudController.getAll,
    getById: crudController.getById
  }
}

/**
 * Creates a controller with custom actions beyond CRUD
 */
export function createExtendedController<T, CreateDTO, UpdateDTO>(
  service: CrudService<T, CreateDTO, UpdateDTO>,
  entityName: string,
  customActions: Record<string, (req: IncomingMessage, res: ServerResponse) => Promise<void>>,
  options: ControllerOptions = {}
) {
  const crudController = createCrudController(service, entityName, options)
  
  return {
    ...crudController,
    ...customActions
  }
}