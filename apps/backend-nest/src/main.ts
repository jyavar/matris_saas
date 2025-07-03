import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración básica para STRATO
  app.setGlobalPrefix('api');

  // CORS para desarrollo
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
  });

  const port = process.env.PORT || 3002;
  await app.listen(port);

  console.log(`🚀 STRATO NestJS Backend running on port ${port}`);
  console.log(`📊 Health check: http://localhost:${port}/api/health`);
}
bootstrap();
