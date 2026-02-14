import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SearchService } from './search.service';
import { EntityType, SearchResponse } from '@app/shared';

@Controller()
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @MessagePattern({ cmd: 'search' })
  async search(
    @Payload()
    payload: {
      query: string;
      entityTypes: EntityType[];
      accessToken: string;
    },
  ): Promise<SearchResponse> {
    return this.searchService.search(
      payload.query,
      payload.entityTypes,
      payload.accessToken,
    );
  }
}
