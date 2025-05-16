import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorHandlerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('ErrorHandlerInterceptor: Intercepting request...');
    const request = context.switchToHttp().getRequest();
    console.log(
      `ErrorHandlerInterceptor: Request method: ${request.method}, URL: ${request.url}`,
    );
    return next.handle().pipe(
      catchError((err) => {
        // Handle MongoDB duplicate key error
        if (err?.code === 11000 && err?.keyPattern) {
          const field = Object.keys(err.keyPattern)[0] || 'Field';
          return throwError(
            () => new ConflictException(`${field} already exists`),
          );
        }

        // Fallback for all other errors
        return throwError(
          () =>
            new InternalServerErrorException(
              err.message || 'Internal Server Error',
            ),
        );
      }),
    );
  }
}
