import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import {
  MicrosoftGraphUser,
  MicrosoftGraphUserResponse,
  MessagePatterns,
} from '@app/shared';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: MessagePatterns.GET_USER_PROFILE })
  async getUserProfile(
    @Payload() accessToken: string,
  ): Promise<MicrosoftGraphUser> {
    return this.userService.getUserProfile(accessToken);
  }

  @MessagePattern({ cmd: MessagePatterns.GET_ALL_USERS })
  async getAllUsers(
    @Payload() accessToken: string,
  ): Promise<MicrosoftGraphUserResponse> {
    return this.userService.getAllUsers(accessToken);
  }
}
