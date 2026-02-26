import { Injectable, Logger } from '@nestjs/common';
import {
  MicrosoftGraphUser,
  MicrosoftGraphUserResponse,
  GraphClientService,
  Endpoint,
} from '@app/shared';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly graphClientService: GraphClientService) {}

  async getUserProfile(accessToken: string): Promise<MicrosoftGraphUser> {
    this.logger.log('Fetching user profile from Graph API');
    try {
      const client = this.graphClientService.getClient(accessToken);
      const response = await client.api(Endpoint.USER_ME).get();
      return response as MicrosoftGraphUser;
    } catch (error) {
      this.logger.error(
        `Error fetching user profile: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async getAllUsers(accessToken: string): Promise<MicrosoftGraphUserResponse> {
    this.logger.log('Fetching all users from Graph API');
    try {
      const client = this.graphClientService.getClient(accessToken);
      const response = await client.api(Endpoint.USER_ALL).get();
      return response as MicrosoftGraphUserResponse;
    } catch (error) {
      this.logger.error(
        `Error fetching all users: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
