import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { AnalyticsService } from './analytics.service';

interface EventData {
  event_name: string;
  user_id: number;
  properties?: Record<string, unknown>;
}

interface MetricData {
  metric_name: string;
  value: number;
  user_id: number;
  tags?: Record<string, unknown>;
}

interface QueryParams {
  limit?: number;
  offset?: number;
  user_id?: number;
}

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post('track/event')
  async trackEvent(@Body() eventData: EventData) {
    const event = await this.analyticsService.trackEvent(eventData);
    return {
      success: true,
      data: event,
    };
  }

  @Post('track/metric')
  async trackMetric(@Body() metricData: MetricData) {
    const metric = await this.analyticsService.trackMetric(metricData);
    return {
      success: true,
      data: metric,
    };
  }

  @Get('events')
  async getEvents(@Query() query: QueryParams) {
    const events = await this.analyticsService.getEvents(query);
    return {
      success: true,
      data: events,
      count: events.length,
    };
  }

  @Get('metrics')
  async getMetrics(@Query() query: QueryParams) {
    const metrics = await this.analyticsService.getMetrics(query);
    return {
      success: true,
      data: metrics,
      count: metrics.length,
    };
  }

  @Get('summary')
  async getAnalyticsSummary(
    @Query('start_date') startDate?: string,
    @Query('end_date') endDate?: string,
  ) {
    const summary = await this.analyticsService.getAnalyticsSummary(
      startDate,
      endDate,
    );
    return {
      success: true,
      data: summary,
    };
  }
}
