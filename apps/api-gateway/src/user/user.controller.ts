import {
  Controller,
  Get,
  InternalServerErrorException,
  Req,
  Res,
  UseGuards,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import type { Request, Response } from 'express';

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getUserProfile(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    try {
      this.logger.log('Fetching user profile for user request');
      const response = await this.userService.getUserProfile(
        req.session.token!,
      );
      res.status(HttpStatus.OK).send(response);
    } catch (error) {
      this.logger.error(
        `Error getting user profile: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Error getting user profile');
    }
  }

  @Get('all')
  @UseGuards(AuthGuard)
  async getAllUsers(@Req() req: Request, @Res() res: Response): Promise<void> {
    try {
      this.logger.log('Fetching all users for user request');
      const response = await this.userService.getAllUsers(req.session.token!);
      res.status(HttpStatus.OK).send(response);
    } catch (error) {
      this.logger.error(
        `Error getting all users: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Error getting all users');
    }
  }
}
