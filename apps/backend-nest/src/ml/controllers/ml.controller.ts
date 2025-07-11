import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RequireMLRead } from '../decorators/ml-permissions.decorator';
import { MLService } from '../ml.service';
import { MLAuditService } from '../services/ml-audit.service';

@Controller('ml')
@UseGuards(JwtAuthGuard)
export class MLController {
  constructor(
    private readonly mlService: MLService,
    private readonly mlAuditService: MLAuditService,
  ) {}

  @Get('health')
  @HttpCode(HttpStatus.OK)
  @Throttle({ 'ml-short': { limit: 1000, ttl: 60_000 } })
  async getHealth() {
    const health = await this.mlService.checkHealth();
    
    // Auditoría de health check
    this.mlAuditService.logEvent({
      event_type: 'health_check',
      user_id: 'system',
      operation: 'health_check',
      status: 'success',
      metadata: { health },
      timestamp: new Date().toISOString(),
    });

    return {
      success: true,
      data: health,
      message: 'ML service is healthy',
    };
  }

  @Get('metrics')
  @HttpCode(HttpStatus.OK)
  @RequireMLRead()
  @Throttle({ 'ml-medium': { limit: 100, ttl: 900_000 } })
  async getMetrics() {
    const metrics = await this.mlService.getGlobalMetrics();
    
    // Auditoría de métricas
    this.mlAuditService.logPerformanceMetrics('system', metrics);

    return {
      success: true,
      data: metrics,
      message: 'ML metrics retrieved successfully',
    };
  }

  @Get('status')
  @HttpCode(HttpStatus.OK)
  @RequireMLRead()
  @Throttle({ 'ml-medium': { limit: 100, ttl: 900_000 } })
  async getStatus() {
    const status = await this.mlService.getSystemStatus();
    
    // Auditoría de status
    this.mlAuditService.logEvent({
      event_type: 'status_check',
      user_id: 'system',
      operation: 'status_check',
      status: 'success',
      metadata: { status },
      timestamp: new Date().toISOString(),
    });

    return {
      success: true,
      data: status,
      message: 'ML service status retrieved successfully',
    };
  }
} 