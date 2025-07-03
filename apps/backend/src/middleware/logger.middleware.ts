import { type NextFunction, type Request, type Response } from 'express'

import logger from '../services/logger.service.js'

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.info(`[${req.method}] ${req.url}`)
  next()
}
