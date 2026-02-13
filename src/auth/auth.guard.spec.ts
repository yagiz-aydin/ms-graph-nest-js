import { AuthGuard } from './auth.guard';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    guard = new AuthGuard();
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  describe('canActivate', () => {
    it('should return true if token is present in session', () => {
      const mockContext = {
        switchToHttp: () => ({
          getRequest: () => ({
            session: {
              token: 'valid-token',
            },
          }),
        }),
      } as unknown as ExecutionContext;

      expect(guard.canActivate(mockContext)).toBe(true);
    });

    it('should throw UnauthorizedException if token is missing', () => {
      const mockContext = {
        switchToHttp: () => ({
          getRequest: () => ({
            session: {}, // no token
          }),
        }),
      } as unknown as ExecutionContext;

      expect(() => guard.canActivate(mockContext)).toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException if session is missing', () => {
      const mockContext = {
        switchToHttp: () => ({
          getRequest: () => ({}), // no session
        }),
      } as unknown as ExecutionContext;

      expect(() => guard.canActivate(mockContext)).toThrow(
        UnauthorizedException,
      );
    });
  });
});
