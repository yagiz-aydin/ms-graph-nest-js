import { Injectable } from '@nestjs/common';
import {
  MicrosoftGraphUser,
  MicrosoftGraphUserResponse,
  getGraphClient,
  Endpoint,
} from '@app/shared';

@Injectable()
export class UserService {
  async getUserProfile(accessToken: string): Promise<MicrosoftGraphUser> {
    const client = getGraphClient(accessToken);
    return client.api(Endpoint.USER_ME).get() as Promise<MicrosoftGraphUser>;
  }

  async getAllUsers(accessToken: string): Promise<MicrosoftGraphUserResponse> {
    const client = getGraphClient(accessToken);
    return client
      .api(Endpoint.USER_ALL)
      .get() as Promise<MicrosoftGraphUserResponse>;
  }
}
