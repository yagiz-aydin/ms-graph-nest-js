import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { InternalServerErrorException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

const mockUserService = {
  getUserProfile: jest.fn(),
  getAllUsers: jest.fn(),
};

const mockResponse = {
  status: jest.fn().mockReturnThis(),
  send: jest.fn(),
} as unknown as Response;

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUserProfile', () => {
    it('should return user profile', async () => {
      const mockRequest = { session: { token: 'valid-token' } } as any;
      const mockData = { id: '1', name: 'User' };
      mockUserService.getUserProfile.mockResolvedValue(mockData);

      await controller.getUserProfile(mockRequest, mockResponse);

      expect(service.getUserProfile).toHaveBeenCalledWith('valid-token');
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockResponse.send).toHaveBeenCalledWith(mockData);
    });

    it('should throw InternalServerErrorException on error', async () => {
      const mockRequest = { session: { token: 'valid-token' } } as any;
      mockUserService.getUserProfile.mockRejectedValue(new Error('Error'));

      await expect(
        controller.getUserProfile(mockRequest, mockResponse),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const mockRequest = { session: { token: 'valid-token' } } as any;
      const mockData = { value: [{ id: '1', name: 'User 1' }] };
      mockUserService.getAllUsers.mockResolvedValue(mockData);

      await controller.getAllUsers(mockRequest, mockResponse);

      expect(service.getAllUsers).toHaveBeenCalledWith('valid-token');
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockResponse.send).toHaveBeenCalledWith(mockData);
    });

    it('should throw InternalServerErrorException on error', async () => {
      const mockRequest = { session: { token: 'valid-token' } } as any;
      mockUserService.getAllUsers.mockRejectedValue(new Error('Error'));

      await expect(
        controller.getAllUsers(mockRequest, mockResponse),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });
});
