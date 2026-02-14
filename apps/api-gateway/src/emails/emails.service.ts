import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MicrosoftGraphEmailResponse } from '@app/shared';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class EmailsService {
  constructor(@Inject('EMAILS_SERVICE') private client: ClientProxy) {}

  async getEmails(accessToken: string): Promise<MicrosoftGraphEmailResponse> {
    const pattern = { cmd: 'get_emails' };
    const payload = accessToken;
    return lastValueFrom(
      this.client.send<MicrosoftGraphEmailResponse>(pattern, payload),
    );
  }
}
