import {
  Controller,
  Get,
  InternalServerErrorException,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import type { Request, Response } from 'express';
import { HttpStatus } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getUserProfile(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const response = await this.userService.getUserProfile(
        req.session.token!,
      );
      res.status(HttpStatus.OK).send(response);
    } catch {
      const errMessage = 'Error getting user profile';
      throw new InternalServerErrorException(errMessage);
    }
  }

  @Get('all')
  @UseGuards(AuthGuard)
  async getAllUsers(@Req() req: Request, @Res() res: Response): Promise<any> {
    try {
      const response = await this.userService.getAllUsers(req.session.token!);
      res.status(HttpStatus.OK).send(response);
    } catch {
      const errMessage = 'Error getting all users';
      throw new InternalServerErrorException(errMessage);
    }
  }
}
