import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Response } from 'express';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    signIn: jest.fn(),
    signOut: jest.fn(),
    handleRedirect: jest.fn(),
    getAfterLoginRedirect: jest.fn(),
    deleteAfterLoginRedirect: jest.fn(),
  };

  const mockResponse = {
    redirect: jest.fn(),
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should redirect to login url', async () => {
      mockAuthService.signIn.mockResolvedValue('https://login-url');
      await controller.login(mockResponse);
      expect(mockAuthService.signIn).toHaveBeenCalled();
      expect(mockResponse.redirect).toHaveBeenCalledWith('https://login-url');
    });
  });
});
