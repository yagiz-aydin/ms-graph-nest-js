import { Injectable } from '@nestjs/common';
import { getGraphClient } from 'src/utils/graphClient';
import { MicrosoftGraphEmailResponse } from 'src/types/dto/Email';
import { Endpoint } from 'src/types/endpoint';

@Injectable()
export class EmailsService {
  /**
   * Emails
   * https://learn.microsoft.com/en-us/graph/api/user-list-messages?view=graph-rest-1.0&tabs=http
   * @param accessToken
   * @returns
   */
  async getEmails(accessToken: string): Promise<MicrosoftGraphEmailResponse> {
    const client = getGraphClient(accessToken);
    const response = client
      .api(Endpoint.EMAILS)
      .header('ConsistencyLevel', 'eventual')
      .get() as Promise<MicrosoftGraphEmailResponse>;
    return response;
  }
}
