import { Injectable } from '@nestjs/common';
import 'isomorphic-fetch';
import { Client } from '@microsoft/microsoft-graph-client';

@Injectable()
export class GraphClientService {
  getClient(accessToken: string): Client {
    return Client.init({
      authProvider: done => {
        done(null, accessToken);
      },
    });
  }
}
