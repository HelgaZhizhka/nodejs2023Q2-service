import { Injectable } from '@nestjs/common';
import { LoggerService } from '@nestjs/common';

@Injectable()
export class LoggingService implements LoggerService {
  log(message: string, context?: string): void {
    const prefix = context ? `[${context}]` : '';
    console.log(`${prefix} ${message}`);
  }

  error(message: string, context?: string, trace?: string, ): void {
    // Тут твоя логика логирования ошибок
    const prefix = context ? `[${context}]` : '';
    console.error(`${prefix} ${message} Trace: ${trace}`);
  }

  warn(message: string, context?: string): void {
    // Тут твоя логика логирования предупреждений
    const prefix = context ? `[${context}]` : '';
    console.warn(`${prefix} ${message}`);
  }

  debug?(message: string, context?: string): void {
    // Тут твоя логика логирования отладочной информации
    const prefix = context ? `[${context}]` : '';
    console.debug(`${prefix} ${message}`);
  }

  verbose?(message: string, context?: string): void {
    // Тут твоя логика для подробного логирования
    const prefix = context ? `[${context}]` : '';
    console.log(`[Verbose] ${prefix} ${message}`);
  }
}
