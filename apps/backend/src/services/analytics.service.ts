import { z } from 'zod'
import { MLAnalysis, MLFeature } from '../types/ml.types.js'

export const eventSchema = z.object({
  event_name: z.string().min(1, 'event_name is required'),
  user_id: z.string().optional(),
  timestamp: z.string().optional(),
  properties: z.record(z.unknown()).optional(),
})

export class AnalyticsService {
  private analyses: MLAnalysis[] = [
    {
      id: 'analysis-1',
      dataset_id: 'dataset-1',
      type: 'exploratory',
      status: 'completed',
      results: {
        total_rows: 15000,
        total_columns: 25,
        missing_values: 150,
        duplicate_rows: 0,
        data_types: {
          string: 5,
          number: 15,
          boolean: 3,
          datetime: 2,
        },
        correlations: {
          age_income: 0.45,
          tenure_monthly_charges: 0.32,
          income_total_charges: 0.78,
        },
      },
      visualizations: [
        'correlation_matrix.png',
        'missing_values_heatmap.png',
        'feature_distributions.png',
      ],
      insights: [
        'Strong correlation between income and total charges',
        'Age shows moderate correlation with income',
        'Missing values are minimal (1%)',
        'No duplicate rows found',
      ],
      created_at: '2024-01-15T10:00:00Z',
      duration: 180,
    },
    {
      id: 'analysis-2',
      dataset_id: 'dataset-2',
      type: 'feature-importance',
      status: 'completed',
      results: {
        feature_importance: {
          previous_sales: 0.35,
          region: 0.25,
          season: 0.20,
          product_category: 0.15,
          marketing_spend: 0.05,
        },
        model_performance: {
          accuracy: 0.92,
          precision: 0.91,
          recall: 0.93,
          f1_score: 0.92,
        },
      },
      visualizations: [
        'feature_importance_bar.png',
        'shap_values.png',
        'permutation_importance.png',
      ],
      insights: [
        'Previous sales is the most important feature',
        'Region has significant impact on predictions',
        'Seasonality plays a moderate role',
        'Marketing spend has minimal impact',
      ],
      created_at: '2024-01-18T14:30:00Z',
      duration: 240,
    },
    {
      id: 'analysis-3',
      dataset_id: 'dataset-3',
      type: 'outlier-detection',
      status: 'running',
      results: {},
      visualizations: [],
      insights: [],
      created_at: '2024-01-22T16:00:00Z',
      duration: 0,
    },
  ]

  private features: MLFeature[] = [
    {
      id: 'feature-1',
      name: 'age',
      type: 'numerical',
      importance: 0.15,
      correlation: 0.45,
      missing_values: 0,
      unique_values: 75,
      mean: 42.5,
      std: 12.3,
      min: 18,
      max: 95,
      distribution: {
        '18-30': 0.25,
        '31-45': 0.35,
        '46-60': 0.25,
        '60+': 0.15,
      },
    },
    {
      id: 'feature-2',
      name: 'income',
      type: 'numerical',
      importance: 0.25,
      correlation: 0.78,
      missing_values: 5,
      unique_values: 1200,
      mean: 65000,
      std: 25000,
      min: 20000,
      max: 200000,
      distribution: {
        '20k-40k': 0.20,
        '40k-60k': 0.30,
        '60k-80k': 0.25,
        '80k+': 0.25,
      },
    },
    {
      id: 'feature-3',
      name: 'region',
      type: 'categorical',
      importance: 0.20,
      correlation: 0.32,
      missing_values: 0,
      unique_values: 4,
      distribution: {
        'North': 0.30,
        'South': 0.25,
        'East': 0.25,
        'West': 0.20,
      },
    },
  ]

  async getAllAnalyses(limit = 20, offset = 0, type?: string, status?: string): Promise<{
    success: boolean
    data: MLAnalysis[]
    count: number
    page: number
    limit: number
    total_pages: number
  }> {
    let filteredAnalyses = this.analyses

    if (type) {
      filteredAnalyses = filteredAnalyses.filter((analysis) => analysis.type === type)
    }

    if (status) {
      filteredAnalyses = filteredAnalyses.filter((analysis) => analysis.status === status)
    }

    const paginatedAnalyses = filteredAnalyses.slice(offset, offset + limit)

    return {
      success: true,
      data: paginatedAnalyses,
      count: filteredAnalyses.length,
      page: Math.floor(offset / limit) + 1,
      limit,
      total_pages: Math.ceil(filteredAnalyses.length / limit),
    }
  }

  async getAnalysisById(id: string): Promise<MLAnalysis | null> {
    return this.analyses.find((analysis) => analysis.id === id) || null
  }

  async startAnalysis(
    datasetId: string,
    type: MLAnalysis['type']
  ): Promise<MLAnalysis> {
    const newAnalysis: MLAnalysis = {
      id: `analysis-${Date.now()}`,
      dataset_id: datasetId,
      type,
      status: 'running',
      results: {},
      visualizations: [],
      insights: [],
      created_at: new Date().toISOString(),
      duration: 0,
    }

    this.analyses.push(newAnalysis)

    // Simulate analysis completion
    setTimeout(async () => {
      const analysisIndex = this.analyses.findIndex((a) => a.id === newAnalysis.id)
      if (analysisIndex !== -1) {
        const completedAnalysis = await this.generateAnalysisResults(newAnalysis, type)
        this.analyses[analysisIndex] = completedAnalysis
      }
    }, 30000) // 30 seconds simulation

    return newAnalysis
  }

  async getFeatures(datasetId: string): Promise<MLFeature[]> {
    return this.features.filter((feature) => feature.id.startsWith('feature'))
  }

  async getFeatureById(id: string): Promise<MLFeature | null> {
    return this.features.find((feature) => feature.id === id) || null
  }

  async getDatasetInsights(datasetId: string): Promise<{
    data_quality: Record<string, number>
    feature_correlations: Record<string, number>
    key_insights: string[]
    recommendations: string[]
  }> {
    return {
      data_quality: {
        completeness: 0.98,
        accuracy: 0.95,
        consistency: 0.92,
        timeliness: 0.99,
      },
      feature_correlations: {
        age_income: 0.45,
        tenure_monthly_charges: 0.32,
        income_total_charges: 0.78,
      },
      key_insights: [
        'Dataset has high data quality with 98% completeness',
        'Strong correlation between income and total charges',
        'Age shows moderate correlation with income',
        'Missing values are minimal and well distributed',
      ],
      recommendations: [
        'Consider feature engineering for age groups',
        'Monitor data quality metrics regularly',
        'Implement automated outlier detection',
        'Add data validation rules for new entries',
      ],
    }
  }

  async getModelInsights(modelId: string): Promise<{
    performance_metrics: Record<string, number>
    feature_importance: Record<string, number>
    bias_analysis: Record<string, unknown>
    drift_detection: Record<string, unknown>
  }> {
    return {
      performance_metrics: {
        accuracy: 0.89,
        precision: 0.87,
        recall: 0.91,
        f1_score: 0.89,
        auc: 0.92,
      },
      feature_importance: {
        monthly_charges: 0.25,
        tenure: 0.20,
        age: 0.15,
        income: 0.10,
        region: 0.08,
      },
      bias_analysis: {
        gender_bias: 0.02,
        age_bias: 0.05,
        region_bias: 0.03,
        overall_fairness: 0.95,
      },
      drift_detection: {
        feature_drift: 0.08,
        label_drift: 0.03,
        data_drift: 0.06,
        last_check: new Date().toISOString(),
      },
    }
  }

  private async generateAnalysisResults(
    analysis: MLAnalysis,
    type: MLAnalysis['type']
  ): Promise<MLAnalysis> {
    const results: Record<string, unknown> = {}
    const visualizations: string[] = []
    const insights: string[] = []

    switch (type) {
      case 'exploratory':
        results.total_rows = 15000
        results.total_columns = 25
        results.missing_values = 150
        results.correlations = { age_income: 0.45, tenure_monthly_charges: 0.32 }
        visualizations.push('correlation_matrix.png', 'missing_values_heatmap.png')
        insights.push('Strong correlation between income and total charges', 'Missing values are minimal')
        break

      case 'feature-importance':
        results.feature_importance = {
          monthly_charges: 0.25,
          tenure: 0.20,
          age: 0.15,
        }
        visualizations.push('feature_importance_bar.png', 'shap_values.png')
        insights.push('Monthly charges is the most important feature', 'Tenure has significant impact')
        break

      case 'correlation':
        results.correlation_matrix = {
          age: { income: 0.45, tenure: 0.32 },
          income: { age: 0.45, total_charges: 0.78 },
        }
        visualizations.push('correlation_heatmap.png')
        insights.push('Strong positive correlation between income and total charges')
        break

      case 'outlier-detection':
        results.outliers = {
          total_outliers: 150,
          outlier_percentage: 0.01,
          outlier_features: ['income', 'monthly_charges'],
        }
        visualizations.push('outlier_scatter.png', 'box_plots.png')
        insights.push('1% of data points are outliers', 'Outliers mainly in income and monthly charges')
        break

      case 'data-quality':
        results.quality_metrics = {
          completeness: 0.98,
          accuracy: 0.95,
          consistency: 0.92,
        }
        visualizations.push('quality_dashboard.png')
        insights.push('High data quality with 98% completeness', 'Consistency could be improved')
        break
    }

    return {
      ...analysis,
      status: 'completed',
      results,
      visualizations,
      insights,
      duration: 180 + Math.random() * 120,
    }
  }
}
