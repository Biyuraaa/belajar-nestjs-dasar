import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as CookieParser from 'cookie-parser';
import * as mustache from 'mustache-express';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setBaseViewsDir(__dirname + '/../views');
  app.setViewEngine('html');
  app.engine('html', mustache());
  app.use(CookieParser('Biyuraaa'));
  await app.listen(3000);
}
bootstrap();
