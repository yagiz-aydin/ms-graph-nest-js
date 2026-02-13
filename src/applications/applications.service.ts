import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getGraphClient } from 'src/utils/graphClient';
import { MicrosoftGraphApplicationResponse } from 'src/types/dto/Application';
import { Endpoint } from 'src/types/endpoint';

@Injectable()
export class ApplicationsService {
  constructor(private configService: ConfigService) {}

  /**
   * Applications
   * https://learn.microsoft.com/en-us/graph/api/user-list-calendars?view=graph-rest-1.0&tabs=http
   * @param accessToken
   * @returns
   */
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
