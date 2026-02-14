import { Injectable } from '@nestjs/common';
import {
  getGraphClient,
  MicrosoftGraphEmailResponse,
  Endpoint,
} from '@app/shared';

@Injectable()
export class EmailsService {
  async getEmails(accessToken: string): Promise<MicrosoftGraphEmailResponse> {
    console.log(
      'EmailsService: Getting emails with token length:',
      accessToken?.length,
    );
    try {
      const client = getGraphClient(accessToken);
      const response = await client
        .api(Endpoint.EMAILS)
        .header('ConsistencyLevel', 'eventual')
        .get();

      const result = response as MicrosoftGraphEmailResponse;
      console.log('EmailsService: Successfully fetched emails');
      return result;
    } catch (error) {
      console.error('EmailsService: Error fetching emails:', error);
      throw error;
    }
  }
}
