import { Injectable, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  MicrosoftGraphUser,
  MicrosoftGraphUserResponse,
  MessagePatterns,
} from '@app/shared';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

  async getUserProfile(accessToken: string): Promise<MicrosoftGraphUser> {
    this.logger.log('Requesting user profile from user microservice');
    const pattern = { cmd: MessagePatterns.GET_USER_PROFILE };
    const payload = accessToken;
    return lastValueFrom(
      this.client.send<MicrosoftGraphUser>(pattern, payload),
    );
  }

  async getAllUsers(accessToken: string): Promise<MicrosoftGraphUserResponse> {
    this.logger.log('Requesting all users from user microservice');
    const pattern = { cmd: MessagePatterns.GET_ALL_USERS };
    const payload = accessToken;
    return lastValueFrom(
      this.client.send<MicrosoftGraphUserResponse>(pattern, payload),
    );
  }
}
