import { Injectable, Logger } from '@nestjs/common';
import {
  GraphClientService,
  EntityType,
  SearchQueryRequest,
  SearchResponse,
  Endpoint,
} from '@app/shared';

@Injectable()
export class SearchService {
  private readonly logger = new Logger(SearchService.name);

  constructor(private readonly graphClientService: GraphClientService) {}

  async search(
    query: string,
    entityTypes: EntityType[],
    accessToken: string,
  ): Promise<SearchResponse> {
    this.logger.log(`Executing search for query: ${query}`);
    try {
      const client = this.graphClientService.getClient(accessToken);
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
      const response = await client
        .api(Endpoint.SEARCH_QUERY)
        .post(requestBody);

      this.logger.log('Successfully completed search query');
      return response as SearchResponse;
    } catch (error) {
      this.logger.error(
        `Error executing search: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
