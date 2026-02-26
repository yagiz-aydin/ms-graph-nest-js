import {
  Controller,
  Get,
  InternalServerErrorException,
  Req,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { EmailsService } from './emails.service';
import { AuthGuard } from '../auth/auth.guard';
import type { Request } from 'express';
import { EmailFormatted } from '@app/shared';

@Controller('emails')
export class EmailsController {
  private readonly logger = new Logger(EmailsController.name);

  constructor(private readonly emailsService: EmailsService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getEmails(@Req() req: Request): Promise<EmailFormatted[]> {
    try {
      this.logger.log('Fetching emails for user request');
      return await this.emailsService.getEmails(req.session.token!);
    } catch (error) {
      this.logger.error(`Error getting emails: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Error getting emails');
    }
  }
}
