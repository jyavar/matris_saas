import { BadRequestException, Injectable } from '@nestjs/common';

export interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  content: string;
  recipients: string[];
  status: 'draft' | 'sent' | 'scheduled';
  sent_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateCampaignData {
  name: string;
  subject: string;
  content: string;
  recipients: string[];
}

export interface UpdateCampaignData {
  name?: string;
  subject?: string;
  content?: string;
  recipients?: string[];
  status?: EmailCampaign['status'];
}

@Injectable()
export class EmailCampaignsService {
  private campaigns: EmailCampaign[] = [];

  async getCampaigns(): Promise<EmailCampaign[]> {
    await Promise.resolve(); // Simulación de operación async
    return this.campaigns;
  }

  async getCampaignById(id: string): Promise<EmailCampaign | null> {
    await Promise.resolve(); // Simulación de operación async
    return this.campaigns.find((c) => c.id === id) ?? null;
  }

  async createCampaign(data: CreateCampaignData): Promise<EmailCampaign> {
    if (
      !data.name ||
      !data.subject ||
      !data.content ||
      !Array.isArray(data.recipients) ||
      data.recipients.length === 0
    ) {
      throw new BadRequestException('Invalid campaign data');
    }

    await Promise.resolve(); // Simulación de operación async

    const campaign: EmailCampaign = {
      id: `campaign-${Date.now()}`,
      name: data.name,
      subject: data.subject,
      content: data.content,
      recipients: data.recipients,
      status: 'draft',
      sent_at: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.campaigns.push(campaign);
    return campaign;
  }

  async updateCampaign(
    id: string,
    update: UpdateCampaignData,
  ): Promise<EmailCampaign | null> {
    const campaign = await this.getCampaignById(id);
    if (!campaign) return null;
    Object.assign(campaign, update, { updated_at: new Date().toISOString() });
    return campaign;
  }

  async deleteCampaign(id: string): Promise<boolean> {
    await Promise.resolve(); // Simulación de operación async

    const idx = this.campaigns.findIndex((c) => c.id === id);
    if (idx === -1) return false;
    this.campaigns.splice(idx, 1);
    return true;
  }

  async sendCampaign(
    id: string,
  ): Promise<{ success: boolean; error?: string }> {
    const campaign = await this.getCampaignById(id);
    if (!campaign) return { success: false, error: 'Campaign not found' };
    if (campaign.status === 'sent')
      return { success: false, error: 'Already sent' };
    // Simulación de integración con Resend
    try {
      // Aquí iría la integración real con Resend
      campaign.status = 'sent';
      campaign.sent_at = new Date().toISOString();
      return { success: true };
    } catch {
      return { success: false, error: 'Failed to send campaign' };
    }
  }
}
