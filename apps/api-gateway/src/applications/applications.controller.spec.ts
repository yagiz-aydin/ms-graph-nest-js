import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';
import type { Request } from 'express';

const mockApplicationsService = {
  getApplications: jest.fn(),
};

describe('ApplicationsController', () => {
  let controller: ApplicationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationsController],
      providers: [
        {
          provide: ApplicationsService,
          useValue: mockApplicationsService,
        },
      ],
    }).compile();

    controller = module.get<ApplicationsController>(ApplicationsController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getApplications', () => {
    it('should return formatted applications', async () => {
      const mockRequest = {
        session: {
          token: 'valid-token',
        },
      } as unknown as Request;

      const mockResponse = {
        value: [
          {
            displayName: 'App 1',
            appId: '123',
            createdDateTime: '2023-01-01',
            signInAudience: 'AzureADMyOrg',
            publisherDomain: 'example.com',
          },
        ],
      };

      mockApplicationsService.getApplications.mockResolvedValue(mockResponse);

      const result = await controller.getApplications(mockRequest);

      expect(mockApplicationsService.getApplications).toHaveBeenCalledWith(
        'valid-token',
      );
      expect(result).toEqual([
        {
          displayName: 'App 1',
          appId: '123',
          createdDateTime: '2023-01-01',
          signInAudience: 'AzureADMyOrg',
          publisherDomain: 'example.com',
        },
      ]);
    });
  });
});
