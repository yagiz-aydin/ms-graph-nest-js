import {
  Controller,
  Get,
  InternalServerErrorException,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { AuthGuard } from '../auth/auth.guard';
import type { Request } from 'express';
import { MicrosoftGraphApplication, Message } from '@app/shared';

@Controller('applications')
export class ApplicationsController {
  constructor(private applicationsService: ApplicationsService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getApplications(
    @Req() req: Request,
  ): Promise<MicrosoftGraphApplication[]> {
    try {
      const response = await this.applicationsService.getApplications(
        req.session.token!,
      );
      return this.formatterApplications(response.value);
    } catch {
      throw new InternalServerErrorException(Message.GET_APPLICATIONS);
    }
  }

  formatterApplications(
    applications: MicrosoftGraphApplication[],
  ): MicrosoftGraphApplication[] {
    return applications.map((app: MicrosoftGraphApplication) => {
      return {
        displayName: app.displayName,
        appId: app.appId,
        createdDateTime: app.createdDateTime,
        signInAudience: app.signInAudience,
        publisherDomain: app.publisherDomain,
      };
    });
  }
}
