import { Module } from '@nestjs/common';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

import { AnalyticsModule } from './analytics/analytics.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BillingModule } from './billing/billing.module';
import { CampaignsModule } from './campaigns/campaigns.module';
import { EmailCampaignsModule } from './email-campaigns/email-campaigns.module';
import { HealthModule } from './health/health.module';
import { AnalyticsReportingModule } from './analytics-reporting/analytics-reporting.module';
import { LoggerModule } from './logger/logger.module';
import { SecurityModule } from './security/security.module';

@Module({
  imports: [
    AnalyticsModule,
    HealthModule,
    AuthModule,
    BillingModule,
    CampaignsModule,
    EmailCampaignsModule,
    AnalyticsReportingModule,
    LoggerModule,
    SecurityModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          name: 'short',
          ttl: 60_000, // 1 minuto
          limit: 100, // 100 requests por minuto
        },
        {
          name: 'medium',
          ttl: 900_000, // 15 minutos
          limit: 500, // 500 requests por 15 min
        },
        {
          name: 'long',
          ttl: 3600_000, // 1 hora
          limit: 1000, // 1000 requests por hora
        },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
