import { type NextFunction, type Request, type Response } from 'express'

// import { getConfig } from '../services/config.service.js'
import { ApiError } from '../utils/ApiError.js'

// const config = getConfig()

export const createErrorHandler = (logger: { error: (err: Error) => void }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (err: Error, req: Request, res: Response, _next: NextFunction) => {
    logger.error(err)

    if (err instanceof ApiError) {
      if (err.statusCode === 404) {
        return res.status(404).json({
          success: false,
          message: err.message,
          stack: err.stack,
        })
      }
      res.status(err.statusCode).json({
        success: false,
        message: err.message,
        stack: err.stack,
      })
      return
    }

    // Handle Zod validation errors (más robusto)
    if (err?.name === 'ZodError' || err?.constructor?.name === 'ZodError') {
      res.status(400).json({
        success: false,
        error: 'errors' in err ? (err as { errors: unknown }).errors : undefined,
        message: 'Validation error',
      })
      return
    }

    res.status(500).json({
      success: false,
      message: 'An unexpected internal server error occurred.',
      stack: err.stack,
    })
  }
}
