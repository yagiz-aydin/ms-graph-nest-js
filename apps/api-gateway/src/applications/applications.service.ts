import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MicrosoftGraphApplicationResponse } from '@app/shared';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ApplicationsService {
  constructor(@Inject('APPLICATIONS_SERVICE') private client: ClientProxy) {}

  async getApplications(
    accessToken: string,
  ): Promise<MicrosoftGraphApplicationResponse> {
    const pattern = { cmd: 'get_applications' };
    const payload = accessToken;
    return lastValueFrom(
      this.client.send<MicrosoftGraphApplicationResponse>(pattern, payload),
    );
  }
}
