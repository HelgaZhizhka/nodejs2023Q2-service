import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { parse } from 'yaml';

import { DOC_FILENAME, DOC_PATH } from './utils/constants';
// import { PrismaExceptionFilter } from './utils/prismaExceptionFilter';
// import { LoggingService } from './logging/logging.service';
import { LoggingMiddleware } from './logging/logging.middleware';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(new LoggingMiddleware().use);
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
  // const logger = app.get(LoggingService);
  // app.useGlobalFilters(new PrismaExceptionFilter());
  // process.on('uncaughtException', (error) => {
  //   logger.error(`Uncaught Exception: ${error.message}`, 'Bootstrap');
  // });

  // process.on('unhandledRejection', (reason) => {
  //   logger.error(`Unhandled Rejection: ${reason}`, 'Bootstrap');
  // });
  await app.listen(port);
  Logger.log(`~ Application is running on port: ${port}`, 'Bootstrap');
}
bootstrap();
