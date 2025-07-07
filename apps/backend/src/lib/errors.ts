export class ApiError extends Error {
  status: number
  constructor(message: string, status: number = 500) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    Error.captureStackTrace?.(this, ApiError)
  }
}

export class NotFoundError extends ApiError {
  constructor(message = 'Not Found') {
    super(message, 404)
    this.name = 'NotFoundError'
  }
}

export class ValidationError extends ApiError {
  details?: unknown
  constructor(message = 'Validation Error', details?: unknown) {
    super(message, 400)
    this.name = 'ValidationError'
    this.details = details
  }
}
