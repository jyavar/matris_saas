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
    if (!tenantId) {
      throw new ApiError(401, 'No tenant_id in token.')
    }

    req.user = { ...user, tenant_id: tenantId }
    next()
  } catch (error) {
    next(error)
  }
}
