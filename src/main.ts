import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from '@nestjs/class-validator';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app use global pipes to automaticly validate requests
  app.useGlobalPipes(new ValidationPipe());
  // wrap AppModule with UseContainer
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(3000);
}

bootstrap();
