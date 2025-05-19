import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    let message = exception.message;
    // If the response is an object and has a 'message' property, use it
    if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
      if ('message' in exceptionResponse) {
        message = (exceptionResponse as any).message;
      }
    }
    const errorResponse = {
      data: {
        code: status,
        timestamp: new Date().toLocaleDateString(),
        path: request.url,
        method: request.method,
        message: message,
      },
    };
    response.status(status).json(errorResponse);
  }
}
