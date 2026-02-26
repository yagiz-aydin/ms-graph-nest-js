import { Injectable, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  MicrosoftGraphEmailResponse,
  MicrosoftGraphEmail,
  EmailFormatted,
  MessagePatterns,
} from '@app/shared';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class EmailsService {
  private readonly logger = new Logger(EmailsService.name);

  constructor(@Inject('EMAILS_SERVICE') private client: ClientProxy) {}

  async getEmails(accessToken: string): Promise<EmailFormatted[]> {
    this.logger.log('Requesting emails from emails microservice');
    const pattern = { cmd: MessagePatterns.GET_EMAILS };
    const payload = accessToken;

    const response = await lastValueFrom(
      this.client.send<MicrosoftGraphEmailResponse>(pattern, payload),
    );

    return this.formatterEmails(response.value);
  }

  private formatterEmails(emails: MicrosoftGraphEmail[]): EmailFormatted[] {
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
