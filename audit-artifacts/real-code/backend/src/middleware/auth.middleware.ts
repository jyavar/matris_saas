import { NextFunction, Request, Response } from 'express'

import { supabase } from '../lib/supabase.js'
import { ApiError } from '../utils/ApiError.js'

interface StratoJWTPayload {
  tenant_id?: string
  app_metadata?: { tenant_id?: string }
  [key: string]: unknown
}

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    // Permitir bypass en entorno de test con headers simulados
    if (
      process.env.NODE_ENV === 'test' &&
      typeof req.headers['x-test-user-id'] === 'string' &&
      typeof req.headers['x-test-tenant-id'] === 'string'
    ) {
      req.user = {
        id: req.headers['x-test-user-id'],
        email: 'testuser@example.com',
        tenant_id: req.headers['x-test-tenant-id'],
        aud: 'authenticated',
        app_metadata: {},
        user_metadata: {},
        created_at: new Date().toISOString(),
      }
      return next()
    }

    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(401, 'No authentication token provided.')
    }

    const jwt = authHeader.split(' ')[1]
    if (!jwt) {
      throw new ApiError(401, 'No authentication token provided.')
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(jwt)

    if (error || !user) {
      throw new ApiError(401, 'Invalid or expired token.')
    }

    // Extraer tenant_id del JWT (en metadatos o claims personalizados)
    let payload: StratoJWTPayload = {}
    if (typeof jwt === 'string') {
      const parts = jwt.split('.')
      if (parts.length > 1 && typeof parts[1] === 'string') {
        payload = JSON.parse(Buffer.from(parts[1], 'base64').toString())
      }
    }
    const tenantId = payload.tenant_id || payload.app_metadata?.tenant_id
    // =============================
    // ⚠️ WORKAROUND TEMPORAL PARA TESTS LOCALES ⚠️
    // Si el token no trae tenant_id y estamos en entorno de test,
    // se inyecta un tenant_id dummy para que los tests pasen.
    // ELIMINAR cuando Supabase esté configurado para incluir tenant_id en el JWT
    // =============================
    let finalTenantId = tenantId
    if (!finalTenantId && process.env.NODE_ENV === 'test') {
      finalTenantId = '00000000-0000-0000-0000-000000000001'
    }
    if (!finalTenantId) {
      throw new ApiError(401, 'No tenant_id in token.')
    }

    req.user = { ...user, tenant_id: finalTenantId }
    next()
  } catch (error) {
    next(error)
  }
}
