import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { LoggingService } from '../../logging/logging.service';
import { Utils } from '../entities/Utils';

@Catch()
class HttpExceptionFilter implements ExceptionFilter {
  constructor(private loggingService: LoggingService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    const result = {
      statusCode: status,
      message:
        typeof message === 'object'
          ? JSON.stringify(message, null, 2)
          : message,
      timestamp: Utils.getFormattedTimestamp(),
      path: request.url,
    };

    this.loggingService.logError(result);

    response.setHeader('Type-Logging', 'error');

    response.status(status).json(result);
  }
}

export default HttpExceptionFilter;
