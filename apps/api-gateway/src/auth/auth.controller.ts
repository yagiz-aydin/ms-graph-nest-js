import {
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  BadRequestException,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Message } from '@app/shared';
import type { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login')
  async login(@Res() res: Response): Promise<void> {
    const loginUrl = await this.authService.signIn();
    res.redirect(loginUrl);
  }

  @Get('logout')
  async logout(@Req() req: Request, @Res() res: Response): Promise<void> {
    await this.authService
      .signOut(req)
      .then((status) => {
        let message = Message.LOGGED_OUT_SUCCESSFULLY;

        if (status === HttpStatus.BAD_REQUEST) {
          message = Message.USER_NOT_LOGGED_IN;
        }

        res.status(status).send({ message: message });
      })
      .catch(() => {
        throw new InternalServerErrorException(Message.ERROR_LOGGING_OUT);
      });
  }

  @Get('callback')
  async callback(
    @Req() req: Request,
    @Query('code') code: string,
    @Query('error') error: string,
    @Query('error_description') errorDescription: string,
    @Res() res: Response,
  ): Promise<void> {
    if (!code) {
      if (error) {
        throw new BadRequestException(
          `Authentication failed: ${error} - ${errorDescription}`,
        );
      }
      throw new BadRequestException(Message.AUTHORIZATION_CODE_MISSING);
    }

    await this.authService.handleRedirect(req, code);

    // #TODO Optional Usage
    // const redirectUrl = await this.authService.getAfterLoginRedirect(req);
    const redirectUrl = '/api/v1/user';

    this.authService.deleteAfterLoginRedirect(req);

    res.redirect(redirectUrl);
  }
}
