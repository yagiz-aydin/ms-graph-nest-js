import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ApplicationsService } from './applications.service';
import { MicrosoftGraphApplicationResponse } from '@app/shared';

@Controller()
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @MessagePattern({ cmd: 'get_applications' })
  async getApplications(
    @Payload() accessToken: string,
  ): Promise<MicrosoftGraphApplicationResponse> {
    return this.applicationsService.getApplications(accessToken);
  }
}
