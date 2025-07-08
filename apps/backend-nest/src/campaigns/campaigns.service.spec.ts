import { CampaignsService } from './campaigns.service';

describe('CampaignsService', () => {
  let service: CampaignsService;
  let mockRepo: {
    list: jest.Mock;
    create: jest.Mock;
    delete: jest.Mock;
  };

  beforeEach(() => {
    mockRepo = {
      list: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
    };
    service = new CampaignsService();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (service as any).repo = mockRepo;
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
