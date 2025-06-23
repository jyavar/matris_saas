import { NextFunction, Request, Response } from 'express'

import { supabase } from '../lib/supabase.js'
import { ApiError } from '../utils/ApiError.js'

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
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(jwt)

    if (error || !user) {
      throw new ApiError(401, 'Invalid or expired token.')
    }

    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}
