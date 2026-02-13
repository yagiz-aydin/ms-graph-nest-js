/**
 * Represents the valid entity types for Microsoft Graph search requests.
 * Permissions are required to search for specific entity types.
 * https://learn.microsoft.com/en-us/graph/api/resources/search-api-overview?view=graph-rest-1.0#scope-search-based-on-entity-types
 */

export type EntityType =
  // Acronym.Read.All
  | 'acronym'
  // Bookmark.Read.All
  | 'bookmark'
  // Chat.Read, Chat.ReadWrite, ChannelMessage.Read.All
  | 'chatMessage'
  // Mail.Read, Mail.ReadWrite
  | 'message'
  // Calendars.Read, Calendars.ReadWrite
  | 'event'
  // Files.Read.All, Files.ReadWrite.All, Sites.Read.All, Sites.ReadWrite.All
  | 'drive'
  // Files.Read.All, Files.ReadWrite.All, Sites.Read.All, Sites.ReadWrite.All
  | 'driveItem'
  // Sites.Read.All, Sites.ReadWrite.All
  | 'list'
  // Sites.Read.All, Sites.ReadWrite.All
  | 'listItem'
  // QnA.Read.All
  | 'qna'
  // Sites.Read.All, Sites.ReadWrite.All
  | 'site'
  // ! Custom Search for external items, use with contentSources
  // for ex: /external/connections/linux_files_connection
  // for ex: /external/connections/old_mail_connection
  | 'externalItem';

export interface SearchQueryRequest {
  requests: {
    entityTypes: EntityType[];
    query: {
      queryString: string;
    };
    contentSources?: string[];
    from?: number;
    size?: number;
    fields?: string[];
  }[];
}

export interface SearchResponse<T = any> {
  value: {
    searchTerms: string[];
    hitsContainers: {
      hits: {
        _id: string;
        _source: T;
        _summary: string;
      }[];
      total: number;
      moreResultsAvailable: boolean;
    }[];
  }[];
}
