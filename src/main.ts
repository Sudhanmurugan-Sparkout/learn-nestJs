import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './common/exception/exception-filter';
import { SuccessResponseInterceptor } from './common/interceptor/successRespone.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true,
    }
  ));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new SuccessResponseInterceptor());
  await app.listen(configService.get<number>('PORT') ?? 3000);
}
bootstrap();