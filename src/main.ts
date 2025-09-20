import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //configuracion inicial para manejar dto con class validator
  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const configService = app.get(ConfigService);

  await app.listen(configService.get('PORT') || 3000);
  console.log(`Application running on: ${await app.getUrl()}`);
}
void bootstrap();
