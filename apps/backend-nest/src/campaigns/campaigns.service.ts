import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

export interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused';
}

const campaigns: Campaign[] = [];

@Injectable()
export class CampaignsService {
  list(): Campaign[] {
    return campaigns;
  }
  create(name: string): Campaign {
    if (!name) throw new BadRequestException('Falta nombre');
    const campaign: Campaign = {
      id: String(Date.now()),
      name,
      status: 'active',
    };
    campaigns.push(campaign);
    return campaign;
  }
  delete(id: string): boolean {
    const idx = campaigns.findIndex((c) => c.id === id);
    if (idx === -1) throw new NotFoundException('No encontrada');
    campaigns.splice(idx, 1);
    return true;
  }
}
