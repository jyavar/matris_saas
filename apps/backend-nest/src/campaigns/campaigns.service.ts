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
  private repo: { list: () => Campaign[]; create: (name: string) => Campaign; delete: (id: string) => boolean };

  constructor(repo?: { list: () => Campaign[]; create: (name: string) => Campaign; delete: (id: string) => boolean }) {
    if (repo) {
      this.repo = repo;
    } else {
      // Default repo using the global array
      this.repo = {
        list: () => campaigns,
        create: (name: string) => {
          if (!name) throw new BadRequestException('Falta nombre');
          const campaign: Campaign = {
            id: String(Date.now()),
            name,
            status: 'active',
          };
          campaigns.push(campaign);
          return campaign;
        },
        delete: (id: string) => {
          const idx = campaigns.findIndex((c) => c.id === id);
          if (idx === -1) throw new NotFoundException('No encontrada');
          campaigns.splice(idx, 1);
          return true;
        },
      };
    }
  }

  list(): Campaign[] {
    return this.repo.list();
  }
  create(name: string): Campaign {
    return this.repo.create(name);
  }
  delete(id: string): boolean {
    return this.repo.delete(id);
  }
}
