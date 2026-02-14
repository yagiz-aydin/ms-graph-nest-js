import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { MicrosoftGraphUser, MicrosoftGraphUserResponse } from '@app/shared';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'get_user_profile' })
  async getUserProfile(
    @Payload() accessToken: string,
  ): Promise<MicrosoftGraphUser> {
    return this.userService.getUserProfile(accessToken);
  }

  @MessagePattern({ cmd: 'get_all_users' })
  async getAllUsers(
    @Payload() accessToken: string,
  ): Promise<MicrosoftGraphUserResponse> {
    return this.userService.getAllUsers(accessToken);
  }
}
