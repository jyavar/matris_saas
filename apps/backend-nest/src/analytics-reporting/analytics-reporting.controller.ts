import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { AnalyticsReportingService } from './analytics-reporting.service';
import { CreateReportDto } from './dto/create-report.dto';

@Controller('analytics-reporting')
export class AnalyticsReportingController {
  constructor(private readonly service: AnalyticsReportingService) {}

  @Get('reports')
  async getReports() {
    const reports = await this.service.getReports();
    return { success: true, data: reports, count: reports.length };
  }

  @Get('reports/:id')
  async getReportById(@Param('id') id: string) {
    const report = await this.service.getReportById(id);
    if (!report) {
      throw new NotFoundException('Report not found');
    }
    return { success: true, data: report };
  }

  @Post('reports')
  @HttpCode(HttpStatus.CREATED)
  async createReport(@Body() createReportDto: CreateReportDto) {
    const report = await this.service.createReport(createReportDto);
    return { success: true, data: report, message: 'Report created' };
  }

  @Delete('reports/:id')
  async deleteReport(@Param('id') id: string) {
    const deleted = await this.service.deleteReport(id);
    if (!deleted) {
      throw new NotFoundException('Report not found');
    }
    return { success: true, message: 'Report deleted' };
  }
} 