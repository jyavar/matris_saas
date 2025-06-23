import { NextFunction, Request, Response } from 'express'

import { supabase } from '../lib/supabase.js'

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    res.status(401).json({ error: 'No token provided' })
    return
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token)

  if (error) {
    res.status(401).json({ error: 'Invalid token' })
    return
  }

  // Extend the Express Request type to include the user object
  // You might want to do this in a separate .d.ts file for better organization
  // @ts-expect-error - Express types do not have a user property by default
  req.user = user
  next()
}
