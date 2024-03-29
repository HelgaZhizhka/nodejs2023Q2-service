import { Injectable, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import {
  appendFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  statSync,
} from 'node:fs';
import { parse, resolve } from 'node:path';
import { EOL } from 'node:os';

import { LOG_PATH } from '../utils/constants';

@Injectable()
export class LoggingService extends Logger {
  private readonly logger = new Logger(LoggingService.name);

  logRequest(req: Request) {
    const { method, body, params, originalUrl } = req;
    const logMessage = `${method} ${originalUrl} - Body: ${JSON.stringify(
      body,
    )} - Params: ${JSON.stringify(params)}`;
    this.logger.log(logMessage);
  }

  logResponse(res: Response) {
    const { statusCode, statusMessage } = res;
    const logMessage = `Response: ${statusCode} ${statusMessage}`;
    this.logger.verbose(logMessage);
  }

  logError(message: string | Error, stack?: string) {
    const logMessage = typeof message === 'string' ? message : message.message;
    const logStack =
      stack || (message instanceof Error ? message.stack : undefined);
    const fullMessage = logStack
      ? `${logMessage} - Stack: ${logStack}`
      : logMessage;
    this.logger.error(fullMessage);
  }
}
