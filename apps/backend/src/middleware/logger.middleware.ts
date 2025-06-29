import { type NextFunction, type Request, type Response } from 'express'
import { pinoHttp } from 'pino-http'

import logger from '../services/logger.service.js'

const pinoMiddleware = pinoHttp({
  logger,
  autoLogging: {
    ignore: (req: Request) => req.originalUrl === '/health',
  },
})

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  pinoMiddleware(req, res)
  next()
}
