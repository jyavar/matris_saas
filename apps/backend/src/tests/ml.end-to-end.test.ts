import { describe, it, expect, beforeEach } from 'vitest';
import { MLService } from '../services/ml.service';
import { ModelsService } from '../services/models.service';
import { DatasetsService } from '../services/datasets.service';
import { TrainingService } from '../services/training.service';
import { PredictionService } from '../services/prediction.service';
import { DeploymentService } from '../services/deployment.service';
import { AnalyticsService } from '../services/analytics.service';

describe('ML Module End-to-End Tests', () => {
  let mlService: MLService;
  let modelsService: ModelsService;
  let datasetsService: DatasetsService;
  let trainingService: TrainingService;
  let predictionService: PredictionService;
  let deploymentService: DeploymentService;
  let analyticsService: AnalyticsService;

  beforeEach(() => {
    mlService = new MLService();
    modelsService = new ModelsService();
    datasetsService = new DatasetsService();
    trainingService = new TrainingService();
    predictionService = new PredictionService();
    deploymentService = new DeploymentService();
    analyticsService = new AnalyticsService();
  });

  describe('ML Service Integration', () => {
    it('should provide health status', async () => {
      const health = await mlService.checkHealth();
      expect(health).toBeDefined();
      expect(health.status).toBe('healthy');
      expect(health.circuitBreaker).toBeDefined();
      expect(health.circuitBreaker.state).toBe('closed');
    });

    it('should provide global metrics', async () => {
      const metrics = await mlService.getGlobalMetrics();
      expect(metrics).toBeDefined();
      expect(metrics.total_models).toBeGreaterThanOrEqual(0);
      expect(metrics.total_datasets).toBeGreaterThanOrEqual(0);
      expect(metrics.active_jobs).toBeGreaterThanOrEqual(0);
    });

    it('should provide system status', async () => {
      const status = await mlService.getSystemStatus();
      expect(status).toBeDefined();
      expect(status.version).toBeDefined();
      expect(status.environment).toBeDefined();
      expect(status.uptime).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Models Service Integration', () => {
    it('should manage models lifecycle', async () => {
      // Create a model
      const modelData = {
        name: 'E2E Test Model',
        type: 'classification' as const,
        description: 'Model for end-to-end testing',
        framework: 'tensorflow',
        version: '1.0.0',
      };

      const createdModel = await modelsService.createModel(modelData);
      expect(createdModel).toBeDefined();
      expect(createdModel.name).toBe(modelData.name);
      expect(createdModel.type).toBe(modelData.type);

      // Get model by ID
      const retrievedModel = await modelsService.getModelById(createdModel.id);
      expect(retrievedModel).toBeDefined();
      expect(retrievedModel?.id).toBe(createdModel.id);

      // Update model
      const updateData = {
        name: 'Updated E2E Test Model',
        description: 'Updated description',
      };

      const updatedModel = await modelsService.updateModel(createdModel.id, updateData);
      expect(updatedModel).toBeDefined();
      expect(updatedModel?.name).toBe(updateData.name);

      // Get all models
      const allModels = await modelsService.getAllModels(10, 0);
      expect(allModels).toBeDefined();
      expect(allModels.data).toBeInstanceOf(Array);
      expect(allModels.count).toBeGreaterThan(0);

      // Delete model
      const deleted = await modelsService.deleteModel(createdModel.id);
      expect(deleted).toBe(true);
    });
  });

  describe('Datasets Service Integration', () => {
    it('should manage datasets lifecycle', async () => {
      // Create a dataset
      const datasetData = {
        name: 'E2E Test Dataset',
        description: 'Dataset for end-to-end testing',
        type: 'structured' as const,
        format: 'csv' as const,
      };

      const createdDataset = await datasetsService.createDataset(datasetData);
      expect(createdDataset).toBeDefined();
      expect(createdDataset.name).toBe(datasetData.name);
      expect(createdDataset.type).toBe(datasetData.type);

      // Get dataset by ID
      const retrievedDataset = await datasetsService.getDatasetById(createdDataset.id);
      expect(retrievedDataset).toBeDefined();
      expect(retrievedDataset?.id).toBe(createdDataset.id);

      // Update dataset
      const updateData = {
        name: 'Updated E2E Test Dataset',
        description: 'Updated description',
      };

      const updatedDataset = await datasetsService.updateDataset(createdDataset.id, updateData);
      expect(updatedDataset).toBeDefined();
      expect(updatedDataset?.name).toBe(updateData.name);

      // Get all datasets
      const allDatasets = await datasetsService.getAllDatasets(10, 0);
      expect(allDatasets).toBeDefined();
      expect(allDatasets.data).toBeInstanceOf(Array);
      expect(allDatasets.count).toBeGreaterThan(0);

      // Delete dataset
      const deleted = await datasetsService.deleteDataset(createdDataset.id);
      expect(deleted).toBe(true);
    });
  });

  describe('Training Service Integration', () => {
    it('should manage training jobs lifecycle', async () => {
      // Create a training job
      const jobData = {
        modelId: 'test-model-id',
        datasetId: 'test-dataset-id',
        hyperparameters: {
          learning_rate: 0.001,
          batch_size: 32,
          epochs: 100,
        },
      };

      const createdJob = await trainingService.startTraining(jobData);
      expect(createdJob).toBeDefined();
      expect(createdJob.model_id).toBe(jobData.modelId);
      expect(createdJob.dataset_id).toBe(jobData.datasetId);
      expect(createdJob.status).toBe('queued');

      // Get job by ID
      const retrievedJob = await trainingService.getJobById(createdJob.id);
      expect(retrievedJob).toBeDefined();
      expect(retrievedJob?.id).toBe(createdJob.id);

      // Get all jobs
      const allJobs = await trainingService.getAllJobs(10, 0);
      expect(allJobs).toBeDefined();
      expect(allJobs.data).toBeInstanceOf(Array);
      expect(allJobs.count).toBeGreaterThan(0);
    });
  });

  describe('Prediction Service Integration', () => {
    it('should make predictions', async () => {
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
      expect(prediction.confidence).toBeLessThanOrEqual(1);
    });
  });

  describe('Deployment Service Integration', () => {
    it('should manage deployments lifecycle', async () => {
      // Deploy a model
      const deploymentData = {
        modelId: 'test-model-id',
        environment: 'production' as const,
        replicas: 3,
        cpuLimit: '1',
        memoryLimit: '2Gi',
      };

      const createdDeployment = await deploymentService.deployModel(deploymentData);
      expect(createdDeployment).toBeDefined();
      expect(createdDeployment.model_id).toBe(deploymentData.modelId);
      expect(createdDeployment.environment).toBe(deploymentData.environment);
      expect(createdDeployment.status).toBe('deploying');

      // Get deployment by ID
      const retrievedDeployment = await deploymentService.getDeploymentById(createdDeployment.id);
      expect(retrievedDeployment).toBeDefined();
      expect(retrievedDeployment?.id).toBe(createdDeployment.id);

      // Get all deployments
      const allDeployments = await deploymentService.getAllDeployments(10, 0);
      expect(allDeployments).toBeDefined();
      expect(allDeployments.data).toBeInstanceOf(Array);
      expect(allDeployments.count).toBeGreaterThan(0);

      // Update deployment
      const updateData = {
        replicas: 5,
        cpuLimit: '2',
        memoryLimit: '4Gi',
      };

      const updatedDeployment = await deploymentService.updateDeployment(createdDeployment.id, updateData);
      expect(updatedDeployment).toBeDefined();
      expect(updatedDeployment?.replicas).toBe(updateData.replicas);

      // Delete deployment
      const deleted = await deploymentService.deleteDeployment(createdDeployment.id);
      expect(deleted).toBe(true);
    });
  });

  describe('Analytics Service Integration', () => {
    it('should manage analyses lifecycle', async () => {
      // Create an analysis
      const analysisData = {
        name: 'E2E Test Analysis',
        type: 'exploratory' as const,
        model_id: 'test-model-id',
        dataset_id: 'test-dataset-id',
        config: {
          metrics: ['accuracy', 'precision', 'recall'],
          threshold: 0.8,
        },
      };

      const createdAnalysis = await analyticsService.startAnalysis(analysisData.dataset_id, analysisData.type);
      expect(createdAnalysis).toBeDefined();
      expect(createdAnalysis.dataset_id).toBe(analysisData.dataset_id);
      expect(createdAnalysis.type).toBe(analysisData.type);
      expect(createdAnalysis.status).toBe('running');

      // Get analysis by ID
      const retrievedAnalysis = await analyticsService.getAnalysisById(createdAnalysis.id);
      expect(retrievedAnalysis).toBeDefined();
      expect(retrievedAnalysis?.id).toBe(createdAnalysis.id);

      // Get all analyses
      const allAnalyses = await analyticsService.getAllAnalyses(10, 0);
      expect(allAnalyses).toBeDefined();
      expect(allAnalyses.data).toBeInstanceOf(Array);
      expect(allAnalyses.count).toBeGreaterThan(0);
    });
  });

  describe('Cross-Service Integration', () => {
    it('should support complete ML workflow', async () => {
      // 1. Create a model
      const model = await modelsService.createModel({
        name: 'Workflow Test Model',
        type: 'classification' as const,
        version: '1.0.0',
      });

      // 2. Create a dataset
      const dataset = await datasetsService.createDataset({
        name: 'Workflow Test Dataset',
        description: 'Dataset for workflow testing',
        type: 'structured' as const,
        format: 'csv' as const,
      });

      // 3. Start training
      const trainingJob = await trainingService.startTraining({
        modelId: model.id,
        datasetId: dataset.id,
        hyperparameters: {
          learning_rate: 0.001,
          batch_size: 32,
          epochs: 100,
        },
      });

      // 4. Deploy the model
      const deployment = await deploymentService.deployModel({
        modelId: model.id,
        environment: 'production' as const,
        replicas: 3,
        cpuLimit: '1',
        memoryLimit: '2Gi',
      });

      // 5. Make a prediction
      const prediction = await predictionService.makePrediction({
        modelId: model.id,
        inputData: {
          feature1: 1.0,
          feature2: 2.0,
          feature3: 3.0,
        },
      });

      // 6. Create an analysis
      const analysis = await analyticsService.startAnalysis(dataset.id, 'exploratory');

      // Verify all components are connected
      expect(model.id).toBe(trainingJob.model_id);
      expect(dataset.id).toBe(trainingJob.dataset_id);
      expect(model.id).toBe(deployment.model_id);
      expect(model.id).toBe(prediction.model_id);
      expect(dataset.id).toBe(analysis.dataset_id);

      // Cleanup
      await modelsService.deleteModel(model.id);
      await datasetsService.deleteDataset(dataset.id);
      await deploymentService.deleteDeployment(deployment.id);
    });
  });
}); 