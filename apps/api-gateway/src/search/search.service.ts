import { Injectable, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EntityType, SearchResponse, MessagePatterns } from '@app/shared';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SearchService {
  private readonly logger = new Logger(SearchService.name);

  constructor(@Inject('SEARCH_SERVICE') private client: ClientProxy) {}

  async search(
    query: string,
    entityTypes: EntityType[],
    accessToken: string,
  ): Promise<SearchResponse> {
    if (!accessToken) {
      this.logger.error('Access token is missing for search request');
      throw new Error('Access token is required');
    }
    this.logger.log(
      `Requesting search results from search microservice for query: ${query}`,
    );
    const pattern = { cmd: MessagePatterns.GET_SEARCH_RESULTS };
    const payload = { query, entityTypes, accessToken };
    return lastValueFrom(this.client.send<SearchResponse>(pattern, payload));
  }
}
