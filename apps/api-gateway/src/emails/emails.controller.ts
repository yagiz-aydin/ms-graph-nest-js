import {
  Controller,
  Get,
  InternalServerErrorException,
  Req,
  UseGuards,
} from '@nestjs/common';
import { EmailsService } from './emails.service';
import { AuthGuard } from '../auth/auth.guard';
import type { Request } from 'express';
import { EmailFormatted, MicrosoftGraphEmail } from '@app/shared';

@Controller('emails')
export class EmailsController {
  constructor(private emailsService: EmailsService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getEmails(@Req() req: Request): Promise<EmailFormatted[]> {
    try {
      const response = await this.emailsService.getEmails(req.session.token!);
      return this.formatterEmails(response.value);
    } catch {
      throw new InternalServerErrorException('Error getting emails');
    }
  }

  formatterEmails(emails: MicrosoftGraphEmail[]): EmailFormatted[] {
    return emails.map((email: MicrosoftGraphEmail) => {
      return {
        id: email.id,
        subject: email.subject,
        sender: {
          name: email.sender.emailAddress.name,
          address: email.sender.emailAddress.address,
        },
        receivedDateTime: email.receivedDateTime,
        bodyPreview: email.bodyPreview,
        webLink: email.webLink,
      };
    });
  }
}
