import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';

import { CampaignsService } from './campaigns.service';

describe('CampaignsService', () => {
  let service: CampaignsService;
  type MockRepo = {
    list: Mock;
    create: Mock;
    delete: Mock;
  };

  let mockRepo: MockRepo;

  beforeEach(() => {
    mockRepo = {
      list: vi.fn(),
      create: vi.fn(),
      delete: vi.fn(),
    } as unknown as MockRepo;
    service = new CampaignsService();
    service['repo'] = mockRepo;
  });

  it('should return list of campaigns', () => {
    const mockList = [
      { id: '1', name: 'Test Campaign 1' },
      { id: '2', name: 'Test Campaign 2' },
    ];
    mockRepo.list.mockReturnValue(mockList);
    const result = service.list();
    expect(result).toEqual(mockList);
    expect(mockRepo.list).toHaveBeenCalled();
  });

  it('should create a campaign', () => {
    const name = 'New Campaign';
    const mockCampaign = { id: '3', name };
    mockRepo.create.mockReturnValue(mockCampaign);
    const result = service.create(name);
    expect(result).toEqual(mockCampaign);
    expect(mockRepo.create).toHaveBeenCalledWith(name);
  });

  it('should delete a campaign', () => {
    mockRepo.delete.mockReturnValue(true);
    const result = service.delete('1');
    expect(result).toBe(true);
    expect(mockRepo.delete).toHaveBeenCalledWith('1');
  });

  it('should return false if campaign not found on delete', () => {
    mockRepo.delete.mockReturnValue(false);
    const result = service.delete('999');
    expect(result).toBe(false);
    expect(mockRepo.delete).toHaveBeenCalledWith('999');
  });
});
