import { Module } from '@nestjs/common';

import { AnalyticsModule } from './analytics/analytics.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AnalyticsModule, HealthModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
