import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token'],
    credentials:true
  });

  app.useGlobalPipes(
    new ValidationPipe({
        whitelist: true, 
        forbidNonWhitelisted: true, 
        transform: true, 
    })
);

  await app.listen(process.env.PORT ?? 4000);
}

bootstrap();

