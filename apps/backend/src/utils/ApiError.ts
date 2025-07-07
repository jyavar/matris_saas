export class ApiError extends Error {
  public readonly statusCode: number
  public readonly isOperational: boolean

  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true,
    stack: string = '',
  ) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational
    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }

  static badRequest(message: string = 'Bad Request'): ApiError {
    return new ApiError(message, 400)
  }

  static unauthorized(message: string = 'Unauthorized'): ApiError {
    return new ApiError(message, 401)
  }

  static forbidden(message: string = 'Forbidden'): ApiError {
    return new ApiError(message, 403)
  }

  static notFound(message: string = 'Not Found'): ApiError {
    return new ApiError(message, 404)
  }

  static conflict(message: string = 'Conflict'): ApiError {
    return new ApiError(message, 409)
  }

  static tooManyRequests(message: string = 'Too Many Requests'): ApiError {
    return new ApiError(message, 429)
  }

  static internal(message: string = 'Internal Server Error'): ApiError {
    return new ApiError(message, 500)
  }
}