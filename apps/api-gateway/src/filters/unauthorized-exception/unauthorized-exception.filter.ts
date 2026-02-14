import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  catch(_exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const afterLoginRedirect = request.url;

    if (!this.validateRedirectHostname(afterLoginRedirect, request)) {
      console.error(
        '400 Bad Request: Invalid request hostname: ' + request.hostname,
      );
      throw new BadRequestException(
        'Invalid request hostname: ' + request.hostname,
      );
    }

    request.session.afterLoginRedirect = afterLoginRedirect;

    console.error(
      '401 Unauthorized: User not logged in, redirecting to login.',
    );

    response.redirect('auth/login');
  }

  private validateRedirectHostname(
    afterLoginRedirectUrl: string,
    req: Request,
  ): boolean {
    const url = new URL(afterLoginRedirectUrl, `http://${req.headers.host}`);

    if (url.hostname !== req.hostname) {
      return false;
    }

    return true;
  }
}
