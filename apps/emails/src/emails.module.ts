import { Module } from '@nestjs/common';
import { EmailsController } from './emails.controller';
import { EmailsService } from './emails.service';
import { SharedModule } from '@app/shared';

@Module({
  imports: [SharedModule],
  controllers: [EmailsController],
  providers: [EmailsService],
})
export class EmailsModule {}
