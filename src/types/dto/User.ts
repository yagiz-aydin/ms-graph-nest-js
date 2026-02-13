/**
 * Represents the individual user object returned by Microsoft Graph
 */
export interface MicrosoftGraphUser {
  id: string;
  displayName: string;
  givenName: string | null;
  surname: string | null;
  userPrincipalName: string;
  jobTitle: string | null;
  mail: string | null;
  mobilePhone: string | null;
  officeLocation: string | null;
  preferredLanguage: string | null;
  businessPhones: string[];
}

/**
 * Represents the top-level response structure for a user collection request
 */
export interface MicrosoftGraphUserResponse {
  '@odata.context': string;
  '@microsoft.graph.tips'?: string; // Optional as it's a diagnostic tip
  value: MicrosoftGraphUser[];
}
