import { Injectable, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  MicrosoftGraphApplicationResponse,
  MicrosoftGraphApplication,
  MessagePatterns,
} from '@app/shared';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ApplicationsService {
  private readonly logger = new Logger(ApplicationsService.name);

  constructor(@Inject('APPLICATIONS_SERVICE') private client: ClientProxy) {}

  async getApplications(
    accessToken: string,
  ): Promise<MicrosoftGraphApplication[]> {
    this.logger.log('Requesting applications from microservice');
    const pattern = { cmd: MessagePatterns.GET_APPLICATIONS };
    const payload = accessToken;
    const response = await lastValueFrom(
      this.client.send<MicrosoftGraphApplicationResponse>(pattern, payload),
    );
    return this.formatterApplications(response.value);
  }

  private formatterApplications(
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
