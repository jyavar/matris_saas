import request from 'supertest';
import { createServer } from 'http';
import { app } from '../index';

describe('ML Module Integration Tests', () => {
  let server: any;

  beforeAll(() => {
    server = createServer(app);
  });

  afterAll((done) => {
    server.close(done);
  });

  describe('GET /ml/health', () => {
    it('should return health status', async () => {
      const response = await request(server)
        .get('/ml/health')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toHaveProperty('status');
      expect(response.body.data).toHaveProperty('circuitBreaker');
      expect(response.body.data).toHaveProperty('uptime');
    });
  });

  describe('GET /ml/metrics', () => {
    it('should return global metrics', async () => {
      const response = await request(server)
        .get('/ml/metrics')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toHaveProperty('total_models');
      expect(response.body.data).toHaveProperty('total_datasets');
      expect(response.body.data).toHaveProperty('active_jobs');
    });
  });

  describe('GET /ml/status', () => {
    it('should return system status', async () => {
      const response = await request(server)
        .get('/ml/status')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toHaveProperty('version');
      expect(response.body.data).toHaveProperty('environment');
      expect(response.body.data).toHaveProperty('uptime');
    });
  });

  describe('GET /ml/models', () => {
    it('should return paginated models', async () => {
      const response = await request(server)
        .get('/ml/models')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body).toHaveProperty('count');
      expect(response.body).toHaveProperty('page');
      expect(response.body).toHaveProperty('limit');
    });

    it('should filter models by type', async () => {
      const response = await request(server)
        .get('/ml/models?type=classification')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toBeInstanceOf(Array);
    });
  });

  describe('POST /ml/models', () => {
    it('should create a new model', async () => {
      const modelData = {
        name: 'Test Integration Model',
        type: 'classification',
        description: 'Model created during integration test',
        framework: 'tensorflow',
        version: '1.0.0',
      };

      const response = await request(server)
        .post('/ml/models')
        .send(modelData)
        .expect(201);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data).toHaveProperty('name', modelData.name);
      expect(response.body.data).toHaveProperty('type', modelData.type);
    });

    it('should validate required fields', async () => {
      const invalidData = {
        description: 'Missing required fields',
      };

      const response = await request(server)
        .post('/ml/models')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /ml/datasets', () => {
    it('should return paginated datasets', async () => {
      const response = await request(server)
        .get('/ml/datasets')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body).toHaveProperty('count');
    });
  });

  describe('POST /ml/datasets', () => {
    it('should create a new dataset', async () => {
      const datasetData = {
        name: 'Test Integration Dataset',
        description: 'Dataset created during integration test',
        type: 'tabular',
        size: 1000,
        features: 10,
        format: 'csv',
      };

      const response = await request(server)
        .post('/ml/datasets')
        .send(datasetData)
        .expect(201);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data).toHaveProperty('name', datasetData.name);
      expect(response.body.data).toHaveProperty('type', datasetData.type);
    });
  });

  describe('GET /ml/training', () => {
    it('should return paginated training jobs', async () => {
      const response = await request(server)
        .get('/ml/training')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body).toHaveProperty('count');
    });
  });

  describe('POST /ml/training', () => {
    it('should start a training job', async () => {
      const jobData = {
        model_id: 'test-model-id',
        dataset_id: 'test-dataset-id',
        hyperparameters: {
          learning_rate: 0.001,
          batch_size: 32,
          epochs: 100,
        },
        config: {
          validation_split: 0.2,
          early_stopping: true,
        },
      };

      const response = await request(server)
        .post('/ml/training')
        .send(jobData)
        .expect(201);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data).toHaveProperty('model_id', jobData.model_id);
      expect(response.body.data).toHaveProperty('dataset_id', jobData.dataset_id);
      expect(response.body.data).toHaveProperty('status', 'queued');
    });
  });

  describe('POST /ml/prediction', () => {
    it('should make a prediction', async () => {
      const predictionData = {
        model_id: 'test-model-id',
        input: {
          feature1: 1.0,
          feature2: 2.0,
          feature3: 3.0,
        },
        options: {
          confidence_threshold: 0.8,
        },
      };

      const response = await request(server)
        .post('/ml/prediction')
        .send(predictionData)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data).toHaveProperty('model_id', predictionData.model_id);
      expect(response.body.data).toHaveProperty('prediction');
      expect(response.body.data).toHaveProperty('confidence');
    });
  });

  describe('GET /ml/deployment', () => {
    it('should return paginated deployments', async () => {
      const response = await request(server)
        .get('/ml/deployment')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body).toHaveProperty('count');
    });
  });

  describe('POST /ml/deployment', () => {
    it('should deploy a model', async () => {
      const deploymentData = {
        model_id: 'test-model-id',
        environment: 'production',
        config: {
          replicas: 3,
          resources: {
            cpu: '1',
            memory: '2Gi',
          },
        },
      };

      const response = await request(server)
        .post('/ml/deployment')
        .send(deploymentData)
        .expect(201);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data).toHaveProperty('model_id', deploymentData.model_id);
      expect(response.body.data).toHaveProperty('environment', deploymentData.environment);
      expect(response.body.data).toHaveProperty('status', 'deploying');
    });
  });

  describe('GET /ml/analytics', () => {
    it('should return paginated analyses', async () => {
      const response = await request(server)
        .get('/ml/analytics')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body).toHaveProperty('count');
    });
  });

  describe('POST /ml/analytics', () => {
    it('should create an analysis', async () => {
      const analysisData = {
        name: 'Test Integration Analysis',
        type: 'performance',
        model_id: 'test-model-id',
        dataset_id: 'test-dataset-id',
        config: {
          metrics: ['accuracy', 'precision', 'recall'],
          threshold: 0.8,
        },
      };

      const response = await request(server)
        .post('/ml/analytics')
        .send(analysisData)
        .expect(201);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data).toHaveProperty('name', analysisData.name);
      expect(response.body.data).toHaveProperty('type', analysisData.type);
      expect(response.body.data).toHaveProperty('status', 'running');
    });
  });
}); 