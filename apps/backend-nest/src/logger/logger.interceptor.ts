import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest<{ method: string; url: string }>();
    const { method, url } = req;
    this.logger.log(`[${method}] ${url}`, 'Request');
    return next.handle().pipe(
      tap(() => {
        this.logger.log(`[${method}] ${url} - completed`, 'Response');
      }),
    );
  }
} 