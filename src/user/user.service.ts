import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MicrosoftGraphUser,
  MicrosoftGraphUserResponse,
} from 'src/types/dto/User';
import { getGraphClient } from 'src/utils/graphClient';
import { Endpoint } from 'src/types/endpoint';

@Injectable()
export class UserService {
  constructor(private configService: ConfigService) {}

  /**
   * My Profile
   * https://learn.microsoft.com/en-us/graph/api/profile-get?view=graph-rest-beta&tabs=http
   * @param accessToken
   * @returns
   */
  async getUserProfile(accessToken: string): Promise<MicrosoftGraphUser> {
    const client = getGraphClient(accessToken);
    return client.api(Endpoint.USER_ME).get() as Promise<MicrosoftGraphUser>;
  }


  /**
   * List Users
   * https://graph.microsoft.com/v1.0/users
   * @param accessToken
   * @returns
   */
  async getAllUsers(accessToken: string): Promise<MicrosoftGraphUserResponse> {
    const client = getGraphClient(accessToken);
    return client
      .api(Endpoint.USER_ALL)
      .get() as Promise<MicrosoftGraphUserResponse>;
  }
}
