import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiError } from '../../utils/ApiError';

@Catch()
export class HttpGlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpGlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();

    // ApiError personalizado
    if (exception instanceof ApiError) {
      this.logger.error(exception);
      response.status(exception.statusCode).json({
        success: false,
        message: exception.message,
        stack: exception.stack,
      });
      return;
    }

    // ZodError (validación)
    if (
      typeof exception === 'object' &&
      exception !== null &&
      'name' in exception &&
      exception['name'] === 'ZodError'
    ) {
      this.logger.error(exception);
      response.status(400).json({
        success: false,
        error:
          'errors' in exception
            ? (exception as { errors: unknown }).errors
            : undefined,
        message: 'Validation error',
      });
      return;
    }

    // HttpException estándar de Nest
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const res = exception.getResponse();
      this.logger.error(exception);
      response
        .status(status)
        .json(
          typeof res === 'string'
            ? { success: false, message: res }
            : { success: false, ...res },
        );
      return;
    }

    // Error genérico
    this.logger.error(exception);
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'An unexpected internal server error occurred.',
      stack: exception instanceof Error ? exception.stack : undefined,
    });
  }
}
