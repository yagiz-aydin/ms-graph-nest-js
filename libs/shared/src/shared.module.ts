import { Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { GraphClientService } from './utils/graphClient.service';

@Module({
  providers: [SharedService, GraphClientService],
  exports: [SharedService, GraphClientService],
})
export class SharedModule {}
