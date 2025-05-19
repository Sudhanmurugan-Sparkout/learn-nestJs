import { Injectable, CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SuccessResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    console.log('SuccessResponseInterceptor: Intercepting request...');
    
    return next.handle().pipe(
      map((data) => ({
        success: true,
        data: data,
        message: 'Request was successful',
        timestamp: new Date().toISOString(),
      }))
    );
  }
}
