import { Module } from '@nestjs/common';

import { AnalyticsModule } from './analytics/analytics.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BillingModule } from './billing/billing.module';
import { CampaignsModule } from './campaigns/campaigns.module';
import { EmailCampaignsModule } from './email-campaigns/email-campaigns.module';
import { HealthModule } from './health/health.module';
import { AnalyticsReportingModule } from './analytics-reporting/analytics-reporting.module';

@Module({
  imports: [
    AnalyticsModule,
    HealthModule,
    AuthModule,
    BillingModule,
    CampaignsModule,
    EmailCampaignsModule,
    AnalyticsReportingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
