import { Test, TestingModule } from '@nestjs/testing';

import { AnalyticsController } from './analytics.controller';
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
  tags?: Record<string, string>;
}

interface QueryParams {
  limit?: number;
  offset?: number;
  user_id?: number;
}

interface AnalyticsEvent {
  id: number;
  event_name: string;
  user_id: number;
  properties: Record<string, unknown>;
  created_at: string;
}

interface AnalyticsMetric {
  id: number;
  metric_name: string;
  value: number;
  user_id: number;
  tags: Record<string, string>;
  created_at: string;
}

interface AnalyticsSummary {
  total_events: number;
  total_metrics: number;
  unique_users: number;
  date_range: {
    start: string | undefined;
    end: string | undefined;
  };
}

interface MockAnalyticsService {
  trackEvent: jest.MockedFunction<
    (eventData: EventData) => Promise<AnalyticsEvent>
  >;
  trackMetric: jest.MockedFunction<
    (metricData: MetricData) => Promise<AnalyticsMetric>
  >;
  getEvents: jest.MockedFunction<
    (query: QueryParams) => Promise<AnalyticsEvent[]>
  >;
  getMetrics: jest.MockedFunction<
    (query: QueryParams) => Promise<AnalyticsMetric[]>
  >;
  getAnalyticsSummary: jest.MockedFunction<
    (startDate?: string, endDate?: string) => Promise<AnalyticsSummary>
  >;
}

describe('AnalyticsController', () => {
  let controller: AnalyticsController;
  let analyticsService: MockAnalyticsService;

  const mockAnalyticsService: MockAnalyticsService = {
    trackEvent: jest.fn(),
    trackMetric: jest.fn(),
    getEvents: jest.fn(),
    getMetrics: jest.fn(),
    getAnalyticsSummary: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnalyticsController],
      providers: [
        {
          provide: AnalyticsService,
          useValue: mockAnalyticsService,
        },
      ],
    }).compile();

    controller = module.get<AnalyticsController>(AnalyticsController);
    analyticsService = module.get<AnalyticsService>(
      AnalyticsService,
    ) as unknown as MockAnalyticsService;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('trackEvent', () => {
    it('should track an analytics event', async () => {
      const eventData: EventData = {
        event_name: 'user_signup',
        user_id: 123,
        properties: { source: 'web' },
      };

      const expectedEvent: AnalyticsEvent = {
        id: 1,
        event_name: 'user_signup',
        user_id: 123,
        properties: { source: 'web' },
        created_at: new Date().toISOString(),
      };

      analyticsService.trackEvent.mockResolvedValue(expectedEvent);

      const result = await controller.trackEvent(eventData);

      expect(analyticsService.trackEvent).toHaveBeenCalledWith(eventData);
      expect(result).toEqual({
        success: true,
        data: expectedEvent,
      });
    });

    it('should handle tracking errors', async () => {
      const eventData: EventData = {
        event_name: 'invalid_event',
        user_id: 123,
        properties: {},
      };

      const errorMessage = 'Invalid event type';
      analyticsService.trackEvent.mockRejectedValue(new Error(errorMessage));

      await expect(controller.trackEvent(eventData)).rejects.toThrow(
        errorMessage,
      );
      expect(analyticsService.trackEvent).toHaveBeenCalledWith(eventData);
    });
  });

  describe('trackMetric', () => {
    it('should track a metric successfully', async () => {
      const metricData: MetricData = {
        metric_name: 'page_views',
        value: 150,
        user_id: 123,
        tags: { page: '/dashboard', browser: 'chrome' },
      };

      const expectedMetric: AnalyticsMetric = {
        id: 1,
        metric_name: 'page_views',
        value: 150,
        user_id: 123,
        tags: { page: '/dashboard', browser: 'chrome' },
        created_at: new Date().toISOString(),
      };

      analyticsService.trackMetric.mockResolvedValue(expectedMetric);

      const result = await controller.trackMetric(metricData);

      expect(analyticsService.trackMetric).toHaveBeenCalledWith(metricData);
      expect(result).toEqual({
        success: true,
        data: expectedMetric,
      });
    });

    it('should handle metric tracking errors', async () => {
      const metricData: MetricData = {
        metric_name: 'invalid_metric',
        value: -1,
        user_id: 123,
      };

      const errorMessage = 'Invalid metric value';
      analyticsService.trackMetric.mockRejectedValue(new Error(errorMessage));

      await expect(controller.trackMetric(metricData)).rejects.toThrow(
        errorMessage,
      );
      expect(analyticsService.trackMetric).toHaveBeenCalledWith(metricData);
    });
  });

  describe('getEvents', () => {
    it('should return events with query parameters', async () => {
      const queryParams: QueryParams = {
        limit: 10,
        offset: 0,
        user_id: 123,
      };

      const expectedEvents: AnalyticsEvent[] = [
        {
          id: 1,
          event_name: 'user_signup',
          user_id: 123,
          properties: {},
          created_at: new Date().toISOString(),
        },
        {
          id: 2,
          event_name: 'user_login',
          user_id: 123,
          properties: {},
          created_at: new Date().toISOString(),
        },
      ];

      analyticsService.getEvents.mockResolvedValue(expectedEvents);

      const result = await controller.getEvents(queryParams);

      expect(analyticsService.getEvents).toHaveBeenCalledWith(queryParams);
      expect(result).toEqual({
        success: true,
        data: expectedEvents,
        count: 2,
      });
    });

    it('should return empty events array when no events found', async () => {
      const queryParams: QueryParams = { limit: 10, offset: 0 };

      analyticsService.getEvents.mockResolvedValue([]);

      const result = await controller.getEvents(queryParams);

      expect(analyticsService.getEvents).toHaveBeenCalledWith(queryParams);
      expect(result).toEqual({
        success: true,
        data: [],
        count: 0,
      });
    });
  });

  describe('getMetrics', () => {
    it('should return metrics with query parameters', async () => {
      const queryParams: QueryParams = {
        limit: 5,
        offset: 0,
        user_id: 123,
      };

      const expectedMetrics: AnalyticsMetric[] = [
        {
          id: 1,
          metric_name: 'page_views',
          value: 150,
          user_id: 123,
          tags: {},
          created_at: new Date().toISOString(),
        },
      ];

      analyticsService.getMetrics.mockResolvedValue(expectedMetrics);

      const result = await controller.getMetrics(queryParams);

      expect(analyticsService.getMetrics).toHaveBeenCalledWith(queryParams);
      expect(result).toEqual({
        success: true,
        data: expectedMetrics,
        count: 1,
      });
    });

    it('should return empty metrics array when no metrics found', async () => {
      const queryParams: QueryParams = { limit: 5, offset: 0 };

      analyticsService.getMetrics.mockResolvedValue([]);

      const result = await controller.getMetrics(queryParams);

      expect(analyticsService.getMetrics).toHaveBeenCalledWith(queryParams);
      expect(result).toEqual({
        success: true,
        data: [],
        count: 0,
      });
    });
  });

  describe('getAnalyticsSummary', () => {
    it('should return analytics summary with date range', async () => {
      const startDate = '2024-01-01';
      const endDate = '2024-01-31';

      const expectedSummary: AnalyticsSummary = {
        total_events: 1500,
        total_metrics: 750,
        unique_users: 250,
        date_range: {
          start: startDate,
          end: endDate,
        },
      };

      analyticsService.getAnalyticsSummary.mockResolvedValue(expectedSummary);

      const result = await controller.getAnalyticsSummary(startDate, endDate);

      expect(analyticsService.getAnalyticsSummary).toHaveBeenCalledWith(
        startDate,
        endDate,
      );
      expect(result).toEqual({
        success: true,
        data: expectedSummary,
      });
    });

    it('should return analytics summary without date range', async () => {
      const expectedSummary: AnalyticsSummary = {
        total_events: 5000,
        total_metrics: 2500,
        unique_users: 800,
        date_range: {
          start: undefined,
          end: undefined,
        },
      };

      analyticsService.getAnalyticsSummary.mockResolvedValue(expectedSummary);

      const result = await controller.getAnalyticsSummary();

      expect(analyticsService.getAnalyticsSummary).toHaveBeenCalledWith(
        undefined,
        undefined,
      );
      expect(result).toEqual({
        success: true,
        data: expectedSummary,
      });
    });

    it('should handle analytics summary errors', async () => {
      const startDate = 'invalid-date';
      const endDate = '2024-01-31';

      const errorMessage = 'Invalid date format';
      analyticsService.getAnalyticsSummary.mockRejectedValue(
        new Error(errorMessage),
      );

      await expect(
        controller.getAnalyticsSummary(startDate, endDate),
      ).rejects.toThrow(errorMessage);
      expect(analyticsService.getAnalyticsSummary).toHaveBeenCalledWith(
        startDate,
        endDate,
      );
    });
  });

  describe('Controller Instance', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('should have analyticsService injected', () => {
      expect(analyticsService).toBeDefined();
    });
  });
});
