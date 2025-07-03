import { Module } from '@nestjs/common';
import { AnalyticsReportingController } from './analytics-reporting.controller';
import { AnalyticsReportingService } from './analytics-reporting.service';

@Module({
  controllers: [AnalyticsReportingController],
  providers: [AnalyticsReportingService],
  exports: [AnalyticsReportingService],
})
export class AnalyticsReportingModule {}
