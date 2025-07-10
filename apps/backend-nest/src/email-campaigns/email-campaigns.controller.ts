import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

import { CreateEmailCampaignDto } from './dto/create-email-campaign.dto';
import { UpdateEmailCampaignDto } from './dto/update-email-campaign.dto';
import { EmailCampaignsService } from './email-campaigns.service';

@Controller('email-campaigns')
export class EmailCampaignsController {
  constructor(private readonly service: EmailCampaignsService) {}

  @Get()
  @Throttle({ default: { limit: 100, ttl: 900_000 } })
  async list() {
    const campaigns = await this.service.getCampaigns();
    return { success: true, data: campaigns, count: campaigns.length };
  }

  @Get(':id')
  @Throttle({ default: { limit: 100, ttl: 900_000 } })
  async getById(@Param('id') id: string) {
    const campaign = await this.service.getCampaignById(id);
    if (!campaign) {
      return { success: false, error: 'Campaign not found' };
    }
    return { success: true, data: campaign };
  }

  @Post()
  @Throttle({ default: { limit: 100, ttl: 900_000 } })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateEmailCampaignDto) {
    const campaign = await this.service.createCampaign(dto);
    return { success: true, data: campaign, message: 'Campaign created' };
  }

  @Patch(':id')
  @Throttle({ default: { limit: 100, ttl: 900_000 } })
  async update(@Param('id') id: string, @Body() dto: UpdateEmailCampaignDto) {
    const campaign = await this.service.updateCampaign(id, dto);
    if (!campaign) {
      return { success: false, error: 'Campaign not found' };
    }
    return { success: true, data: campaign, message: 'Campaign updated' };
  }

  @Delete(':id')
  @Throttle({ default: { limit: 100, ttl: 900_000 } })
  async delete(@Param('id') id: string) {
    const deleted = await this.service.deleteCampaign(id);
    if (!deleted) {
      return { success: false, error: 'Campaign not found' };
    }
    return { success: true, message: 'Campaign deleted' };
  }

  @Post(':id/send')
  @Throttle({ default: { limit: 100, ttl: 900_000 } })
  async send(@Param('id') id: string) {
    const result = await this.service.sendCampaign(id);
    if (!result.success) {
      return { success: false, error: result.error ?? 'Send failed' };
    }
    return { success: true, message: 'Campaign sent' };
  }
}
