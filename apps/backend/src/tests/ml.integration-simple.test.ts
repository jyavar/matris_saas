import { describe, it, expect } from 'vitest';
import { MLService } from '../services/ml.service';
import { ModelsService } from '../services/models.service';
import { DatasetsService } from '../services/datasets.service';
import { TrainingService } from '../services/training.service';
import { PredictionService } from '../services/prediction.service';
import { DeploymentService } from '../services/deployment.service';
import { AnalyticsService } from '../services/analytics.service';

describe('ML Module Simple Integration Test', () => {
  it('should verify all ML services are working', async () => {
    // Test ML Service
    const mlService = new MLService();
    const health = await mlService.checkHealth();
    expect(health.status).toBe('healthy');
    
    const metrics = await mlService.getGlobalMetrics();
    expect(metrics.total_models).toBeGreaterThanOrEqual(0);
    
    const status = await mlService.getSystemStatus();
    expect(status.version).toBeDefined();

    // Test Models Service
    const modelsService = new ModelsService();
    const models = await modelsService.getAllModels(5, 0);
    expect(models.data).toBeInstanceOf(Array);

    // Test Datasets Service
    const datasetsService = new DatasetsService();
    const datasets = await datasetsService.getAllDatasets(5, 0);
    expect(datasets.data).toBeInstanceOf(Array);

    // Test Training Service
    const trainingService = new TrainingService();
    const jobs = await trainingService.getAllJobs(5, 0);
    expect(jobs.data).toBeInstanceOf(Array);

    // Test Prediction Service
    const predictionService = new PredictionService();
    const prediction = await predictionService.makePrediction({
      modelId: 'test-model',
      inputData: { feature1: 1.0, feature2: 2.0 }
    });
    expect(prediction.prediction).toBeDefined();

    // Test Deployment Service
    const deploymentService = new DeploymentService();
    const deployments = await deploymentService.getAllDeployments(5, 0);
    expect(deployments.data).toBeInstanceOf(Array);

    // Test Analytics Service
    const analyticsService = new AnalyticsService();
    const analyses = await analyticsService.getAllAnalyses(5, 0);
    expect(analyses.data).toBeInstanceOf(Array);

    console.log('✅ All ML services are working correctly!');
  });

  it('should demonstrate complete ML workflow', async () => {
    const modelsService = new ModelsService();
    const datasetsService = new DatasetsService();
    const trainingService = new TrainingService();
    const predictionService = new PredictionService();
    const deploymentService = new DeploymentService();
    const analyticsService = new AnalyticsService();

    // 1. Create a model
    const model = await modelsService.createModel({
      name: 'Integration Test Model',
      type: 'classification' as const,
      version: '1.0.0',
    });
    expect(model.id).toBeDefined();

    // 2. Create a dataset
    const dataset = await datasetsService.createDataset({
      name: 'Integration Test Dataset',
      description: 'Test dataset for integration',
      type: 'structured' as const,
      format: 'csv' as const,
    });
    expect(dataset.id).toBeDefined();

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
    expect(trainingJob.id).toBeDefined();

    // 4. Make a prediction
    const prediction = await predictionService.makePrediction({
      modelId: model.id,
      inputData: {
        feature1: 1.0,
        feature2: 2.0,
        feature3: 3.0,
      },
    });
    expect(prediction.prediction).toBeDefined();

    // 5. Deploy the model
    const deployment = await deploymentService.deployModel({
      modelId: model.id,
      environment: 'production' as const,
      replicas: 3,
      cpuLimit: '1',
      memoryLimit: '2Gi',
    });
    expect(deployment.id).toBeDefined();

    // 6. Create an analysis
    const analysis = await analyticsService.startAnalysis(dataset.id, 'exploratory');
    expect(analysis.id).toBeDefined();

    console.log('✅ Complete ML workflow executed successfully!');
    console.log(`📊 Created: Model(${model.id}), Dataset(${dataset.id}), Training(${trainingJob.id}), Prediction(${prediction.id}), Deployment(${deployment.id}), Analysis(${analysis.id})`);
  });
}); 