import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';

@Controller('campaigns')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Get()
  @Throttle({ default: { limit: 100, ttl: 900_000 } })
  list() {
    return this.campaignsService.list();
  }

  @Post()
  @Throttle({ default: { limit: 100, ttl: 900_000 } })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateCampaignDto) {
    return this.campaignsService.create(dto.name);
  }

  @Delete(':id')
  @Throttle({ default: { limit: 100, ttl: 900_000 } })
  delete(@Param('id') id: string) {
    this.campaignsService.delete(id);
    return { ok: true };
  }
}
