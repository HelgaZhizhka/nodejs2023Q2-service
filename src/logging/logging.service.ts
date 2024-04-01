import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { existsSync, mkdirSync } from 'node:fs';
import { stat, appendFile } from 'node:fs/promises';
import { join } from 'node:path';

import { Utils } from '../utils/entities/Utils';
import { ERROR_FILENAME, LOG_FILENAME, LOG_PATH } from '../utils/constants';
import { LogLevel } from '../utils/enums';

@Injectable()
export class LoggingService extends Logger {
  private readonly logger = new Logger(LoggingService.name);
  private logDirectory: string;
  private logLevel: number;
  private maxFileSize: number;
  private logFileName: string;
  private errorFileName: string;

  constructor(private configService: ConfigService) {
    super();
    this.logDirectory = join(__dirname, LOG_PATH);
    this.maxFileSize = this.configService.get<number>(
      'log.maxFileSize',
      102400,
    );
    this.logLevel = this.configService.get<number>('log.logLevel');
    this.logFileName = LOG_FILENAME;
    this.errorFileName = ERROR_FILENAME;
    this.checkAndCreateDirectory();
    this.rotateFile(this.logFileName);
    this.rotateFile(this.errorFileName);
  }

  private checkAndCreateDirectory() {
    if (!existsSync(this.logDirectory)) {
      mkdirSync(this.logDirectory, { recursive: true });
    }
  }

  private async writeToFile(fileName: string, message: string) {
    const stats = await stat(fileName).catch(() => null);
    const isFileSizeExceeded = stats && stats.size > this.maxFileSize;

    if (isFileSizeExceeded) {
      this.rotateFile(fileName);
    }
    this.checkAndCreateDirectory();
    await appendFile(fileName, message, { encoding: 'utf-8' }).catch((err) => {
      this.logger.error(`Error writing to file: ${err}`);
    });
  }

  private rotateFile(logFileName: string) {
    const newFileName = this.generateFileName(logFileName);
    const newFilePath = join(this.logDirectory, newFileName);
    newFileName.includes('logging.log')
      ? (this.logFileName = newFileName)
      : (this.errorFileName = newFileName);
    appendFile(newFilePath, '', { flag: 'w', encoding: 'utf-8' }).catch(
      (err) => {
        this.logger.error(`Error creating new log file: ${err}`);
      },
    );
  }

  private generateFileName(logFileName: string) {
    const timestamp = Utils.getFormattedTimestamp();
    const fileName = logFileName.includes('logging.log')
      ? 'logging.log'
      : 'error.log';
    return `${timestamp}-${fileName}`;
  }

  override log(message: string, context?: string) {
    if (this.logLevel <= LogLevel.LOG) {
      return;
    }

    const logMessage = message || '';
    const logContent = context ? context : '';
    super.log(logMessage, logContent);
    const formatMessage = `[${Utils.getFormattedTimestamp()}] [LOG] [Context: ${logContent}] ${logMessage}\n`;
    const filePath = join(this.logDirectory, this.logFileName);
    this.writeToFile(filePath, formatMessage);
  }

  override error(message: string, trace?: string, context?: string) {
    if (this.logLevel <= LogLevel.ERROR) {
      return;
    }

    const logMessage = message || '';
    const logContent = context ? context : '';
    const logTrace = trace ? trace : '';
    super.error(logMessage, logTrace, logContent);
    const formatMessage = `[${Utils.getFormattedTimestamp()}] [ERROR] [Context: ${logContent}] [Trace: ${logTrace}] ${logMessage}\n`;
    const filePath = join(this.logDirectory, this.errorFileName);
    this.writeToFile(filePath, formatMessage);
  }

  override warn(message: string, context?: string) {
    if (this.logLevel <= LogLevel.WARN) {
      return;
    }
    const logMessage = message || '';
    const logContent = context ? context : '';
    super.warn(logMessage, logContent);
    const formatMessage = `[${Utils.getFormattedTimestamp()}] [WARN] [Context: ${logContent}] ${logMessage}\n`;
    const filePath = join(this.logDirectory, this.logFileName);
    this.writeToFile(filePath, formatMessage);
  }

  override debug(message: string, context?: string) {
    if (this.logLevel <= LogLevel.DEBUG) {
      return;
    }

    const logMessage = message || '';
    const logContent = context ? context : '';
    super.debug(logMessage, logContent);
    const formatMessage = `[${Utils.getFormattedTimestamp()}] [DEBUG] [Context: ${logContent}] ${logMessage}\n`;
    const filePath = join(this.logDirectory, this.logFileName);
    this.writeToFile(filePath, formatMessage);
  }

  override verbose(message: string, context?: string) {
    if (this.logLevel <= LogLevel.VERBOSE) {
      return;
    }

    const logMessage = message || '';
    const logContent = context ? context : '';
    super.verbose(logMessage, logContent);
    const formatMessage = `[${Utils.getFormattedTimestamp()}] [VERBOSE] [Context: ${logContent}] ${logMessage}\n`;
    const filePath = join(this.logDirectory, this.logFileName);
    this.writeToFile(filePath, formatMessage);
  }

  logRequest(req: Request) {
    const { method, body, params, originalUrl } = req;
    const logMessage = `${method} ${originalUrl} - Body: ${JSON.stringify(
      body,
      null,
      2,
    )} - Params: ${JSON.stringify(params, null, 2)}`;
    this.log(logMessage);
  }

  logResponse(res: Response) {
    const { statusCode, statusMessage } = res;
    const logMessage = `Response: ${statusCode} ${statusMessage}`;
    this.log(logMessage);
  }

  logError(message: string) {
    this.error(message);
  }
}
