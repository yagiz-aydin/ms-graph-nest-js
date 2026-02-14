import { Injectable } from '@nestjs/common';
import {
  getGraphClient,
  MicrosoftGraphApplicationResponse,
  Endpoint,
} from '@app/shared';

@Injectable()
export class ApplicationsService {
  async getApplications(
    accessToken: string,
  ): Promise<MicrosoftGraphApplicationResponse> {
    const client = getGraphClient(accessToken);
    return client
      .api(Endpoint.APPLICATIONS)
      .header('ConsistencyLevel', 'eventual')
      .get() as Promise<MicrosoftGraphApplicationResponse>;
  }
}
