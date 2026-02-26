import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ApplicationsService } from './applications.service';
import {
  MicrosoftGraphApplicationResponse,
  MessagePatterns,
} from '@app/shared';

@Controller()
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @MessagePattern({ cmd: MessagePatterns.GET_APPLICATIONS })
  async getApplications(
    @Payload() accessToken: string,
  ): Promise<MicrosoftGraphApplicationResponse> {
    return this.applicationsService.getApplications(accessToken);
  }
}
