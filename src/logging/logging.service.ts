import { Injectable } from '@nestjs/common';
import { LoggerService } from '@nestjs/common';



@Injectable()
export class LoggingService implements LoggerService {
  log(message: string) {
    console.log(message);
  }

  error(message: string, trace: string) {
    console.error(message, trace);
  }

  warn(message: string) {
    console.warn(message);
  }
}
