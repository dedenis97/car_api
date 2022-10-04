import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    // origin:"http://localhost:4200"  esempio link frontend
    credentials: true
  })

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true // not let add extra parameter on body, accept only dto params
  }))

  await app.listen(3000);

}
bootstrap();
