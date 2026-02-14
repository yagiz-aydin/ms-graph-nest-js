import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EmailsService } from './emails.service';
import { MicrosoftGraphEmailResponse } from '@app/shared';

@Controller()
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) {}

  @MessagePattern({ cmd: 'get_emails' })
  async getEmails(
    @Payload() accessToken: string,
  ): Promise<MicrosoftGraphEmailResponse> {
    return this.emailsService.getEmails(accessToken);
  }
}
