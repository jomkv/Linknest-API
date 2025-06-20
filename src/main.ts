import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //app.set('query parser', 'extended');

  app.setGlobalPrefix('api', { exclude: ['/api/auth/{*path}'] });

  await app.listen(3000);
}
bootstrap();
