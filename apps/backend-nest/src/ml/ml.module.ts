import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

import { MLController } from './ml.controller';
import { MLService } from './ml.service';
import { ModelsController } from './controllers/models.controller';
import { DatasetsController } from './controllers/datasets.controller';
import { TrainingController } from './controllers/training.controller';
import { PredictionController } from './controllers/prediction.controller';
import { AnalyticsController } from './controllers/analytics.controller';
import { DeploymentController } from './controllers/deployment.controller';
import { ModelsService } from './services/models.service';
import { DatasetsService } from './services/datasets.service';
import { TrainingService } from './services/training.service';
import { PredictionService } from './services/prediction.service';
import { AnalyticsService } from './services/analytics.service';
import { DeploymentService } from './services/deployment.service';
import { MLAuditService } from './services/ml-audit.service';
import { MLSecurityGuard } from './guards/ml-security.guard';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        name: 'ml-short',
        ttl: 60_000, // 1 minuto
        limit: 100, // 100 requests por minuto
      },
      {
        name: 'ml-medium',
        ttl: 900_000, // 15 minutos
        limit: 500, // 500 requests por 15 min
      },
      {
        name: 'ml-long',
        ttl: 3600_000, // 1 hora
        limit: 1000, // 1000 requests por hora
      },
    ]),
  ],
  controllers: [
    MLController,
    ModelsController,
    DatasetsController,
    TrainingController,
    PredictionController,
    AnalyticsController,
    DeploymentController,
  ],
  providers: [
    MLService,
    ModelsService,
    DatasetsService,
    TrainingService,
    PredictionService,
    AnalyticsService,
    DeploymentService,
    MLAuditService,
    {
      provide: APP_GUARD,
      useClass: MLSecurityGuard,
    },
  ],
  exports: [
    MLService,
    ModelsService,
    DatasetsService,
    TrainingService,
    PredictionService,
    AnalyticsService,
    DeploymentService,
    MLAuditService,
  ],
})
export class MLModule {} 