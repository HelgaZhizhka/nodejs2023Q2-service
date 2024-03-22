import { Injectable, NestMiddleware } from '@nestjs/common';
import { LoggingService } from './logging.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  // constructor(private logger: LoggingService) {}

  use(req: Request, res: Response, next: () => void) {
    const { method, url } = req;
    // res.on('finish', () => {
    //   const message = `${method} ${url} ${res.statusCode}`;
    //   this.logger.log(message);
    // });

    next();
  }
}
