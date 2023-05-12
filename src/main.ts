import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: false });
  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  const servicePort = configService.get<number>('port') || 3000;
  await app.listen(servicePort);
}

bootstrap().then();
