import { type NextFunction, type Request, type Response } from 'express'
import { type pino } from 'pino'
import pinoHttp from 'pino-http'

export const createLoggerMiddleware = (logger: pino.Logger) => {
  const pinoMiddleware = pinoHttp({
    logger,
    autoLogging: {
      ignore: (req) => req.originalUrl === '/health',
    },
  })

  return (req: Request, res: Response, next: NextFunction) => {
    pinoMiddleware(req, res)
    next()
  }
}
