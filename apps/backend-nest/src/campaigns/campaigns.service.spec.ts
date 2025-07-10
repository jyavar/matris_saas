import { CampaignsService, Campaign } from './campaigns.service';

describe('CampaignsService', () => {
  let service: CampaignsService;
  let mockRepo: {
    list: jest.MockedFunction<() => Campaign[]>;
    create: jest.MockedFunction<(name: string) => Campaign>;
    delete: jest.MockedFunction<(id: string) => boolean>;
  };

  beforeEach(() => {
    mockRepo = {
      list: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
    };
    service = new CampaignsService(mockRepo);
  });

  it('should return list of campaigns', () => {
    const mockList: Campaign[] = [
      { id: '1', name: 'Test Campaign 1', status: 'active' },
      { id: '2', name: 'Test Campaign 2', status: 'paused' },
    ];
    mockRepo.list.mockReturnValue(mockList);
    const result = service.list();
    expect(result).toEqual(mockList);
    expect(mockRepo.list).toHaveBeenCalled();
  });

  it('should create a campaign', () => {
    const name = 'New Campaign';
    const mockCampaign: Campaign = { id: '3', name, status: 'active' };
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

  it('should throw if campaign not found on delete', () => {
    mockRepo.delete.mockImplementation(() => {
      throw new Error('No encontrada');
    });
    expect(() => service.delete('999')).toThrow('No encontrada');
    expect(mockRepo.delete).toHaveBeenCalledWith('999');
  });
});
