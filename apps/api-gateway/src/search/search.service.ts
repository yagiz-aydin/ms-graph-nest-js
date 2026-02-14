import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EntityType, SearchResponse } from '@app/shared';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SearchService {
  constructor(@Inject('SEARCH_SERVICE') private client: ClientProxy) {}

  async search(
    query: string,
    entityTypes: EntityType[],
    accessToken: string,
  ): Promise<SearchResponse> {
    if (!accessToken) {
      throw new Error('Access token is required');
    }
    const pattern = { cmd: 'search' };
    const payload = { query, entityTypes, accessToken };
    return lastValueFrom(this.client.send<SearchResponse>(pattern, payload));
  }
}
