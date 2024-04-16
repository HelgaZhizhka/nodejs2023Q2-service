import { readFile } from 'fs/promises';
import { join } from 'path';
import { parse } from 'yaml';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { DOC_FILENAME, DOC_PATH } from './utils/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');
  app.useGlobalPipes(new ValidationPipe());
  const swaggerConfig = parse(
    await readFile(join(__dirname, DOC_PATH, DOC_FILENAME), 'utf8'),
  );
  SwaggerModule.setup('doc', app, swaggerConfig);
  await app.listen(port);
  Logger.log(`~ Application is running on port: ${port}`);
}
bootstrap();
