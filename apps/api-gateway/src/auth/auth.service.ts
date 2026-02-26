import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import {
  ConfidentialClientApplication,
  Configuration,
  AuthenticationResult,
} from '@azure/msal-node';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { parseScopes } from '@app/shared';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private msalClient: ConfidentialClientApplication;

  constructor(
    private configService: ConfigService<
      {
        AZURE_CLIENT_ID: string;
        AZURE_TENANT_ID: string;
        AZURE_CLIENT_SECRET: string;
        AZURE_REDIRECT_URI: string;
        AZURE_SCOPES: string;
      },
      true
    >,
  ) {
    const msalConfig: Configuration = {
      auth: {
        clientId: this.configService.get<string>('AZURE_CLIENT_ID', {
          infer: true,
        }),
        authority: `https://login.microsoftonline.com/${this.configService.get<string>('AZURE_TENANT_ID')}`,
        clientSecret: this.configService.get<string>('AZURE_CLIENT_SECRET', {
          infer: true,
        }),
      },
    };
    this.msalClient = new ConfidentialClientApplication(msalConfig);
  }

  async signIn(): Promise<string> {
    this.logger.log('Initiating sign-in flow');
    const scopesString = this.configService.get<string>('AZURE_SCOPES');
    const scopes = parseScopes(scopesString);

    const authUrlParameters = {
      scopes: scopes,
      redirectUri: this.configService.get<string>('AZURE_REDIRECT_URI', {
        infer: true,
      }),
    };

    return await this.msalClient.getAuthCodeUrl(authUrlParameters);
  }

  async handleRedirect(
    req: Request,
    code: string,
  ): Promise<AuthenticationResult> {
    this.logger.log('Handling redirect from Azure AD');
    const scopesString = this.configService.get<string>('AZURE_SCOPES');
    const scopes = parseScopes(scopesString);

    const tokenRequest = {
      code: code,
      scopes: scopes,
      redirectUri: this.configService.get<string>('AZURE_REDIRECT_URI', {
        infer: true,
      }),
    };

    const response = await this.msalClient.acquireTokenByCode(tokenRequest);

    req.session.token = response.accessToken;
    if (response.account) {
      this.logger.log(`${response.account.username} sign-in successful.`);
    } else {
      this.logger.log('Unknown User sign-in successful.');
    }

    return response;
  }

  async signOut(req: Request): Promise<HttpStatus> {
    this.logger.log('Initiating sign-out flow');
    return new Promise((resolve, reject) => {
      if (!req.session.token) {
        this.logger.warn('Sign-out requested but no token found in session.');
        resolve(HttpStatus.BAD_REQUEST);
      }

      req.session.destroy(err => {
        if (err) {
          this.logger.error('Session destroy failed', err);
          reject(new Error('Session destroy failed'));
        }
      });

      resolve(HttpStatus.OK);
    });
  }

  getAfterLoginRedirect(req: Request): string {
    return req.session.afterLoginRedirect || '/';
  }

  deleteAfterLoginRedirect(req: Request): void {
    delete req.session.afterLoginRedirect;
  }
}
