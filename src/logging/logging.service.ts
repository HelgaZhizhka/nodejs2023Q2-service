import { Injectable, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

import { LOG_PATH } from '../utils/constants';

@Injectable()
export class LoggingService extends Logger {
  private readonly logger = new Logger(LoggingService.name);

  logRequest(req: Request) {
    const { method, body, params, originalUrl } = req;
    const logMessage = `${method} ${originalUrl} - Body: ${JSON.stringify(body)} - Params: ${JSON.stringify(params)}`;
    this.logger.log(logMessage);
  }

  logResponse(res: Response) {
    const { statusCode, statusMessage } = res;
    const logMessage = `Response: ${statusCode} ${statusMessage}`;
    this.logger.verbose(logMessage);
  }

  logError(error: Error, stack: string) {
    const logMessage = `${error.message} - Stack: ${stack}`;
    this.logger.error(logMessage);
  }
}
