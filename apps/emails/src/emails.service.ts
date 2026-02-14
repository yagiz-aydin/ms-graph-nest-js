import { Injectable } from '@nestjs/common';
import {
  getGraphClient,
  MicrosoftGraphEmailResponse,
  Endpoint,
} from '@app/shared';

@Injectable()
export class EmailsService {
  async getEmails(accessToken: string): Promise<MicrosoftGraphEmailResponse> {
    const client = getGraphClient(accessToken);
    return client
      .api(Endpoint.EMAILS)
      .header('ConsistencyLevel', 'eventual')
      .get() as Promise<MicrosoftGraphEmailResponse>;
  }
}
