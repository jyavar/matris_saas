import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

import { MLService } from './ml.service';
import { ServiceHealth } from './interfaces/ml.interfaces';

@Controller('ml')
export class MLController {
  constructor(private readonly mlService: MLService) {}

  @Get('health')
  @Throttle({ default: { limit: 100, ttl: 60_000 } })
  @HttpCode(HttpStatus.OK)
  async getHealth(): Promise<{ success: boolean; data: ServiceHealth }> {
    const health = await this.mlService.checkHealth();
    return {
      success: true,
      data: health,
    };
  }

  @Get('metrics')
  @Throttle({ default: { limit: 100, ttl: 60_000 } })
  @HttpCode(HttpStatus.OK)
  async getMetrics(): Promise<{ success: boolean; data: Record<string, unknown> }> {
    const metrics = await this.mlService.getGlobalMetrics();
    return {
      success: true,
      data: metrics,
    };
  }

  @Get('status')
  @Throttle({ default: { limit: 100, ttl: 60_000 } })
  @HttpCode(HttpStatus.OK)
  async getStatus(): Promise<{ success: boolean; data: Record<string, unknown> }> {
    const status = await this.mlService.getSystemStatus();
    return {
      success: true,
      data: status,
    };
  }
} 