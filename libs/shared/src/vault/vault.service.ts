import { Injectable, Logger } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const NodeVault = require('node-vault');

@Injectable()
export class VaultService {
  private client: any;
  private readonly logger = new Logger(VaultService.name);

  constructor() {
    this.client = NodeVault({
      apiVersion: 'v1',
      endpoint: process.env.VAULT_ADDR || 'http://127.0.0.1:8200',
      token: process.env.VAULT_TOKEN || 'root',
    });
  }

  async getSecret(path: string): Promise<any> {
    try {
      const result = await this.client.read(path);
      return result.data.data;
    } catch (error) {
      this.logger.error(`Failed to read secret from ${path}: ${error.message}`);
      throw error;
    }
  }

  async writeSecret(path: string, data: any): Promise<void> {
    try {
      await this.client.write(path, { data });
    } catch (error) {
      this.logger.error(`Failed to write secret to ${path}: ${error.message}`);
      throw error;
    }
  }
}
