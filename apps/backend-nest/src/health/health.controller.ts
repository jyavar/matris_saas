import { Controller, Get } from '@nestjs/common';

import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  getHealth(): {
    status: string;
    message: string;
    timestamp: string;
    uptime: number;
    version: string;
  } {
    return this.healthService.getHealthStatus();
  }
}
