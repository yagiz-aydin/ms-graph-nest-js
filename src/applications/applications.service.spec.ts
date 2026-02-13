import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationsService } from './applications.service';
import { ConfigService } from '@nestjs/config';

describe('ApplicationsService', () => {
  let service: ApplicationsService;

  const mockConfigService = {
    get: jest.fn((key: string) => 'mock-value'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApplicationsService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<ApplicationsService>(ApplicationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
