import { Injectable } from '@nestjs/common';
import { getGraphClient } from 'src/utils/graphClient';
import {
  EntityType,
  SearchQueryRequest,
  SearchResponse,
} from 'src/types/dto/Search';
import { Endpoint } from 'src/types/endpoint';

@Injectable()
export class SearchService {
  async search(
    query: string,
    entityTypes: EntityType[],
    accessToken?: string,
  ): Promise<SearchResponse> {
    if (!accessToken) {
      throw new Error(Message.ERROR_EXECUTING_SEARCH);
    }

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
    const response = (await client
      .api(Endpoint.SEARCH_QUERY)
      .post(requestBody)) as SearchResponse;
    return response;
  }
}
