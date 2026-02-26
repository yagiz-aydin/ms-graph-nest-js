import { Injectable, Logger } from '@nestjs/common';
import {
  GraphClientService,
  MicrosoftGraphApplicationResponse,
  Endpoint,
} from '@app/shared';

@Injectable()
export class ApplicationsService {
  private readonly logger = new Logger(ApplicationsService.name);

  constructor(private readonly graphClientService: GraphClientService) {}

  async getApplications(
    accessToken: string,
  ): Promise<MicrosoftGraphApplicationResponse> {
    this.logger.log(`Getting applications from Microsoft Graph API`);
    try {
      const client = this.graphClientService.getClient(accessToken);
      const response = await client
        .api(Endpoint.APPLICATIONS)
        .header('ConsistencyLevel', 'eventual')
        .get();

      this.logger.log('Successfully fetched applications');
      return response as MicrosoftGraphApplicationResponse;
    } catch (error) {
      this.logger.error(
        `Error fetching applications: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
