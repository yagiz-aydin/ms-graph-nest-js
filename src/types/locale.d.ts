// Common types
/**
 * https://learn.microsoft.com/en-us/graph/api/resources/search-api-answers-overview?view=graph-rest-1.0#supported-language-tags
 */
type LocaleTag =
  | 'es-ar'
  | 'en-au'
  | 'de-at'
  | 'fr-be'
  | 'nl-be'
  | 'en-ca'
  | 'fr-ca'; // etc.

interface SupportedLanguage {
  tag: LocaleTag;
  language: string;
  region: string;
}
