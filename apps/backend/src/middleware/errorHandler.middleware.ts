import { type NextFunction, type Request, type Response } from 'express'

import { getConfig } from '../services/config.service.js'
import { ApiError } from '../utils/ApiError.js'

const config = getConfig()

export const createErrorHandler = (logger: { error: (err: Error) => void }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (err: Error, req: Request, res: Response, _next: NextFunction) => {
    logger.error(err)

    if (err instanceof ApiError) {
      res.status(err.statusCode).json({
        success: false,
        message: err.message,
        ...(config.NODE_ENV === 'development' && { stack: err.stack }),
      })
      return
    }

    res.status(500).json({
      success: false,
      message: 'An unexpected internal server error occurred.',
      ...(config.NODE_ENV === 'development' && { stack: err.stack }),
    })
  }
}
