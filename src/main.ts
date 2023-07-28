import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  const PORT = configService.get('PORT') || 4000;

  await app.listen(PORT, () => {
    console.log(`Server started on ${PORT} port!`);
  });
}

bootstrap();
