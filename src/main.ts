import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { parse } from 'yaml';

import { DOC_FILENAME, DOC_PATH } from './utils/constants';
import { PrismaExceptionFilter } from './utils/prismaExceptionFilter';
import { LoggingService } from './logging/logging.service';
import { LoggingMiddleware } from './logging/logging.middleware';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const logger = new LoggingService();
  // app.use(new LoggingMiddleware().use);
//  const logger = app.get(Logger);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidUnknownValues: true,
    }),
  );
  const swaggerConfig = parse(
    await readFile(join(__dirname, DOC_PATH, DOC_FILENAME), 'utf8'),
  );
  SwaggerModule.setup('doc', app, swaggerConfig);
  app.useGlobalFilters(new PrismaExceptionFilter());

  // process.on('uncaughtException', (err, origin) => {
  //   logger.error(`Uncaught Exception: ${err.message}`, err.stack);
  // });

  // process.on('unhandledRejection', (reason, promise) => {
  //   logger.warn(`Unhandled Rejection: ${reason}`);
  // });

  await app.listen(port);
  logger.log(`~ Application is running on port: ${port}`, 'Bootstrap');
}
bootstrap();
