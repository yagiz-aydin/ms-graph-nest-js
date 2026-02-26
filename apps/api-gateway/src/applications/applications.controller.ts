import {
  Controller,
  Get,
  InternalServerErrorException,
  Req,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { AuthGuard } from '../auth/auth.guard';
import type { Request } from 'express';
import { MicrosoftGraphApplication, Message } from '@app/shared';

@Controller('applications')
export class ApplicationsController {
  private readonly logger = new Logger(ApplicationsController.name);

  constructor(private readonly applicationsService: ApplicationsService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getApplications(
    @Req() req: Request,
  ): Promise<MicrosoftGraphApplication[]> {
    try {
      this.logger.log('Fetching applications for user request');
      return await this.applicationsService.getApplications(req.session.token!);
    } catch (error) {
      this.logger.error(
        `Error getting applications: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException(Message.GET_APPLICATIONS);
    }
  }
}
