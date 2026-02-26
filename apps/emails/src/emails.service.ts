import { Injectable, Logger } from '@nestjs/common';
import {
  GraphClientService,
  MicrosoftGraphEmailResponse,
  Endpoint,
} from '@app/shared';

@Injectable()
export class EmailsService {
  private readonly logger = new Logger(EmailsService.name);

  constructor(private readonly graphClientService: GraphClientService) {}

  async getEmails(accessToken: string): Promise<MicrosoftGraphEmailResponse> {
    this.logger.log(`Getting emails with token length: ${accessToken?.length}`);
    try {
      const client = this.graphClientService.getClient(accessToken);
      const response = await client
        .api(Endpoint.EMAILS)
        .header('ConsistencyLevel', 'eventual')
        .get();

      const result = response as MicrosoftGraphEmailResponse;
      this.logger.log('Successfully fetched emails from Microsoft Graph API');
      return result;
    } catch (error) {
      this.logger.error(`Error fetching emails: ${error.message}`, error.stack);
      throw error;
    }
  }
}
