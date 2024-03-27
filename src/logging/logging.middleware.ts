import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';

import { LoggingService } from './logging.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  // constructor(private logger: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    console.log(
      `[${new Date().toISOString()}] Request...`,
      req.method,
      req.originalUrl,
    );
    next();
  }
}
