import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MicrosoftGraphUser, MicrosoftGraphUserResponse } from '@app/shared';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

  async getUserProfile(accessToken: string): Promise<MicrosoftGraphUser> {
    const pattern = { cmd: 'get_user_profile' };
    const payload = accessToken;
    return lastValueFrom(
      this.client.send<MicrosoftGraphUser>(pattern, payload),
    );
  }

  async getAllUsers(accessToken: string): Promise<MicrosoftGraphUserResponse> {
    const pattern = { cmd: 'get_all_users' };
    const payload = accessToken;
    return lastValueFrom(
      this.client.send<MicrosoftGraphUserResponse>(pattern, payload),
    );
  }
}
