import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { LoggingService } from '../logging.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private logger: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    
    res.on('finish', () => {
      this.logger.logRequest(req);

      if (res.getHeader && res.getHeader('Type-Logging') === 'error') {
        return;
      }

      this.logger.logResponse(res);
    });

    next();
  }
}
