import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

export interface AnalyticsReport {
  id: string;
  name: string;
  type: string;
  data: Record<string, unknown>;
  created_at: string;
}

export interface CreateReportData {
  name: string;
  type: string;
  data: Record<string, unknown>;
}

@Injectable()
export class AnalyticsReportingService {
  private reports: AnalyticsReport[] = [];

  async getReports(): Promise<AnalyticsReport[]> {
    return this.reports;
  }

  async getReportById(id: string): Promise<AnalyticsReport | null> {
    return this.reports.find((r) => r.id === id) || null;
  }

  async createReport(data: CreateReportData): Promise<AnalyticsReport> {
    if (!data.name || !data.type || !data.data) {
      throw new BadRequestException('Invalid report data');
    }

    // Simulación de integración con PostHog
    // Aquí se podría hacer fetch a PostHog API
    const report: AnalyticsReport = {
      id: `report-${Date.now()}`,
      name: data.name,
      type: data.type,
      data: data.data,
      created_at: new Date().toISOString(),
    };

    this.reports.push(report);
    console.log(`Analytics report created: ${report.id}`);
    return report;
  }

  async deleteReport(id: string): Promise<boolean> {
    const idx = this.reports.findIndex((r) => r.id === id);
    if (idx === -1) return false;

    this.reports.splice(idx, 1);
    console.log(`Analytics report deleted: ${id}`);
    return true;
  }
}
