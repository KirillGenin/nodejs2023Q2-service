import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import { readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { parse } from 'yaml';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  const file = await readFile(
    join(dirname(__dirname), 'doc', 'api.yaml'),
    'utf-8',
  );
  const doc = parse(file) as OpenAPIObject;
  SwaggerModule.setup('doc', app, doc);

  const configService = app.get<ConfigService>(ConfigService);
  const PORT = configService.get('PORT') || 4000;

  await app.listen(PORT, () => {
    console.log(`Server started on ${PORT} port!`);
  });
}

bootstrap();
