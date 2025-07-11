import { Test, TestingModule } from '@nestjs/testing';
import { MLModule } from './ml.module';
import { MLService } from './ml.service';
import { ModelsService } from './services/models.service';
import { DatasetsService } from './services/datasets.service';
import { TrainingService } from './services/training.service';
import { PredictionService } from './services/prediction.service';
import { DeploymentService } from './services/deployment.service';
import { AnalyticsService } from './services/analytics.service';
import { ModelType, DatasetType, DatasetFormat, DeploymentEnvironment } from './dto/ml.dto';

describe('MLModule', () => {
  let module: TestingModule;
  let mlService: MLService;
  let modelsService: ModelsService;
  let datasetsService: DatasetsService;
  let trainingService: TrainingService;
  let predictionService: PredictionService;
  let deploymentService: DeploymentService;
  let analyticsService: AnalyticsService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [MLModule],
    }).compile();

    mlService = module.get<MLService>(MLService);
    modelsService = module.get<ModelsService>(ModelsService);
    datasetsService = module.get<DatasetsService>(DatasetsService);
    trainingService = module.get<TrainingService>(TrainingService);
    predictionService = module.get<PredictionService>(PredictionService);
    deploymentService = module.get<DeploymentService>(DeploymentService);
    analyticsService = module.get<AnalyticsService>(AnalyticsService);
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should have MLService defined', () => {
    expect(mlService).toBeDefined();
  });

  it('should have ModelsService defined', () => {
    expect(modelsService).toBeDefined();
  });

  it('should have DatasetsService defined', () => {
    expect(datasetsService).toBeDefined();
  });

  it('should have TrainingService defined', () => {
    expect(trainingService).toBeDefined();
  });

  it('should have PredictionService defined', () => {
    expect(predictionService).toBeDefined();
  });

  it('should have DeploymentService defined', () => {
    expect(deploymentService).toBeDefined();
  });

  it('should have AnalyticsService defined', () => {
    expect(analyticsService).toBeDefined();
  });

  describe('MLService', () => {
    it('should return health status', async () => {
      const health = await mlService.checkHealth();
      expect(health).toBeDefined();
      expect(health.status).toBe('healthy');
      expect(health.circuitBreaker).toBeDefined();
    });

    it('should return global metrics', async () => {
      const metrics = await mlService.getGlobalMetrics();
      expect(metrics).toBeDefined();
      expect(metrics.total_models).toBeGreaterThanOrEqual(0);
      expect(metrics.total_datasets).toBeGreaterThanOrEqual(0);
      expect(metrics.active_jobs).toBeGreaterThanOrEqual(0);
    });

    it('should return system status', async () => {
      const status = await mlService.getSystemStatus();
      expect(status).toBeDefined();
      expect(status.version).toBeDefined();
      expect(status.environment).toBeDefined();
      expect(status.uptime).toBeDefined();
    });
  });

  describe('ModelsService', () => {
    it('should return paginated models', async () => {
      const result = await modelsService.getAllModels(10, 0);
      expect(result).toBeDefined();
      expect(result.data).toBeInstanceOf(Array);
      expect(result.count).toBeGreaterThanOrEqual(0);
    });

    it('should create a model', async () => {
      const modelData = {
        name: 'Test Model',
        type: ModelType.CLASSIFICATION,
        version: '1.0.0',
      };

      const model = await modelsService.createModel(modelData);
      expect(model).toBeDefined();
      expect(model.name).toBe(modelData.name);
      expect(model.type).toBe(modelData.type);
    });
  });

  describe('DatasetsService', () => {
    it('should return paginated datasets', async () => {
      const result = await datasetsService.getAllDatasets(10, 0);
      expect(result).toBeDefined();
      expect(result.data).toBeInstanceOf(Array);
      expect(result.count).toBeGreaterThanOrEqual(0);
    });

    it('should create a dataset', async () => {
      const datasetData = {
        name: 'Test Dataset',
        description: 'Test dataset for unit testing',
        type: DatasetType.STRUCTURED,
        format: DatasetFormat.CSV,
      };

      const dataset = await datasetsService.createDataset(datasetData);
      expect(dataset).toBeDefined();
      expect(dataset.name).toBe(datasetData.name);
      expect(dataset.type).toBe(datasetData.type);
    });
  });

  describe('TrainingService', () => {
    it('should return paginated training jobs', async () => {
      const result = await trainingService.getAllJobs(10, 0);
      expect(result).toBeDefined();
      expect(result.data).toBeInstanceOf(Array);
      expect(result.count).toBeGreaterThanOrEqual(0);
    });

    it('should start a training job', async () => {
      const jobData = {
        modelId: 'test-model-id',
        datasetId: 'test-dataset-id',
        hyperparameters: {
          learning_rate: 0.001,
          batch_size: 32,
          epochs: 100,
        },
      };

      const job = await trainingService.startTraining(jobData);
      expect(job).toBeDefined();
      expect(job.model_id).toBe(jobData.modelId);
      expect(job.dataset_id).toBe(jobData.datasetId);
      expect(job.status).toBe('queued');
    });
  });

  describe('PredictionService', () => {
    it('should make a prediction', async () => {
      const predictionData = {
        modelId: 'test-model-id',
        inputData: {
          feature1: 1.0,
          feature2: 2.0,
          feature3: 3.0,
        },
      };

      const prediction = await predictionService.makePrediction(predictionData);
      expect(prediction).toBeDefined();
      expect(prediction.model_id).toBe(predictionData.modelId);
      expect(prediction.prediction).toBeDefined();
      expect(prediction.confidence).toBeGreaterThan(0);
    });
  });

  describe('DeploymentService', () => {
    it('should return paginated deployments', async () => {
      const result = await deploymentService.getAllDeployments(10, 0);
      expect(result).toBeDefined();
      expect(result.data).toBeInstanceOf(Array);
      expect(result.count).toBeGreaterThanOrEqual(0);
    });

    it('should deploy a model', async () => {
      const deploymentData = {
        modelId: 'test-model-id',
        environment: DeploymentEnvironment.PRODUCTION,
        replicas: 3,
        cpuLimit: '1',
        memoryLimit: '2Gi',
      };

      const deployment = await deploymentService.deployModel(deploymentData);
      expect(deployment).toBeDefined();
      expect(deployment.model_id).toBe(deploymentData.modelId);
      expect(deployment.environment).toBe(deploymentData.environment);
      expect(deployment.status).toBe('deploying');
    });
  });

  describe('AnalyticsService', () => {
    it('should return paginated analyses', async () => {
      const result = await analyticsService.getAllAnalyses(10, 0);
      expect(result).toBeDefined();
      expect(result.data).toBeInstanceOf(Array);
      expect(result.count).toBeGreaterThanOrEqual(0);
    });

    it('should create an analysis', async () => {
      const analysisData = {
        name: 'Test Analysis',
        type: 'performance',
        model_id: 'test-model-id',
        dataset_id: 'test-dataset-id',
        config: {
          metrics: ['accuracy', 'precision', 'recall'],
          threshold: 0.8,
        },
      };

      const analysis = await analyticsService.runAnalysis(analysisData.dataset_id, analysisData.type, analysisData.config);
      expect(analysis).toBeDefined();
      expect(analysis.dataset_id).toBe(analysisData.dataset_id);
      expect(analysis.type).toBe(analysisData.type);
      expect(analysis.status).toBe('running');
    });
  });
}); 