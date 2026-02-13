export interface MicrosoftGraphApplication {
  displayName: string;
  appId: string;
  createdDateTime: string;
  signInAudience: string;
  publisherDomain: string;
}

export interface MicrosoftGraphApplicationResponse {
  '@odata.context': string;
  value: MicrosoftGraphApplication[];
}
