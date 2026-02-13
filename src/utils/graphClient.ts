import 'isomorphic-fetch';
import { Client } from '@microsoft/microsoft-graph-client';

export function getGraphClient(accessToken: string): Client {
  const client = Client.init({
    authProvider: (done) => {
      done(null, accessToken);
    },
  });

  return client;
}
