import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  HttpCode,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

import { ModelsService } from '../services/models.service';
import { CreateModelDto, UpdateModelDto, QueryParamsDto, MLResponseDto, MLListResponseDto } from '../dto/ml.dto';
import { MLModel } from '../interfaces/ml.interfaces';

@Controller('ml/models')
export class ModelsController {
  constructor(private readonly modelsService: ModelsService) {}

  @Get()
  @Throttle({ default: { limit: 100, ttl: 60_000 } })
  @HttpCode(HttpStatus.OK)
  async getAllModels(@Query() query: QueryParamsDto): Promise<MLListResponseDto<MLModel>> {
    const { limit = 20, offset = 0, type, status } = query;
    const models = await this.modelsService.getAllModels(limit, offset, type, status);
    return {
      success: true,
      data: models.data,
      count: models.count,
      page: Math.floor(offset / limit) + 1,
      limit,
      total_pages: Math.ceil(models.count / limit),
    };
  }

  @Get(':id')
  @Throttle({ default: { limit: 100, ttl: 60_000 } })
  @HttpCode(HttpStatus.OK)
  async getModelById(@Param('id') id: string): Promise<MLResponseDto<MLModel>> {
    const model = await this.modelsService.getModelById(id);
    if (!model) {
      throw new NotFoundException('Model not found');
    }
    return {
      success: true,
      data: model,
    };
  }

  @Post()
  @Throttle({ default: { limit: 50, ttl: 60_000 } })
  @HttpCode(HttpStatus.CREATED)
  async createModel(@Body() createModelDto: CreateModelDto): Promise<MLResponseDto<MLModel>> {
    try {
      const model = await this.modelsService.createModel(createModelDto);
      return {
        success: true,
        data: model,
      };
    } catch (error) {
      throw new BadRequestException(error instanceof Error ? error.message : 'Failed to create model');
    }
  }

  @Put(':id')
  @Throttle({ default: { limit: 50, ttl: 60_000 } })
  @HttpCode(HttpStatus.OK)
  async updateModel(
    @Param('id') id: string,
    @Body() updateModelDto: UpdateModelDto,
  ): Promise<MLResponseDto<MLModel>> {
    try {
      const model = await this.modelsService.updateModel(id, updateModelDto);
      if (!model) {
        throw new NotFoundException('Model not found');
      }
      return {
        success: true,
        data: model,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(error instanceof Error ? error.message : 'Failed to update model');
    }
  }

  @Delete(':id')
  @Throttle({ default: { limit: 50, ttl: 60_000 } })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteModel(@Param('id') id: string): Promise<void> {
    const deleted = await this.modelsService.deleteModel(id);
    if (!deleted) {
      throw new NotFoundException('Model not found');
    }
  }

  @Get(':id/versions')
  @Throttle({ default: { limit: 100, ttl: 60_000 } })
  @HttpCode(HttpStatus.OK)
  async getModelVersions(@Param('id') id: string): Promise<MLResponseDto<Array<{
    version: string;
    created_at: string;
    status: string;
    metrics: Record<string, number>;
  }>>> {
    const versions = await this.modelsService.getModelVersions(id);
    if (!versions) {
      throw new NotFoundException('Model not found');
    }
    return {
      success: true,
      data: versions,
    };
  }

  @Post(':id/evaluate')
  @Throttle({ default: { limit: 20, ttl: 60_000 } })
  @HttpCode(HttpStatus.OK)
  async evaluateModel(
    @Param('id') id: string,
    @Body() body: { testDatasetId: string },
  ): Promise<MLResponse<{
    accuracy: number;
    precision: number;
    recall: number;
    f1_score: number;
    confusion_matrix: number[][];
    classification_report: Record<string, unknown>;
  }>> {
    try {
      const evaluation = await this.modelsService.evaluateModel(id, body.testDatasetId);
      return {
        success: true,
        data: evaluation,
      };
    } catch (error) {
      throw new BadRequestException(error instanceof Error ? error.message : 'Failed to evaluate model');
    }
  }
} 