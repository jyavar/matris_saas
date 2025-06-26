import type { NextFunction, Request, Response } from 'express'
import rateLimit from 'express-rate-limit'

export const strictRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many requests, please try again later.',
  },
  handler: (req: Request, res: Response, _next: NextFunction, options) => {
    res.status(options.statusCode).json(options.message)
  },
})
