import { Injectable } from '@nestjs/common';
import {
  getGraphClient,
  EntityType,
  SearchQueryRequest,
  SearchResponse,
  Endpoint,
} from '@app/shared';

@Injectable()
export class SearchService {
  async search(
    query: string,
    entityTypes: EntityType[],
    accessToken: string,
  ): Promise<SearchResponse> {
    const client = getGraphClient(accessToken);
    const requestBody: SearchQueryRequest = {
      requests: [
        {
          entityTypes: entityTypes,
          query: {
            queryString: query,
          },
        },
      ],
    };
    return client
      .api(Endpoint.SEARCH_QUERY)
      .post(requestBody) as Promise<SearchResponse>;
  }
}
