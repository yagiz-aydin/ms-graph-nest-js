const NodeVault = require('node-vault');

export default async () => {
  const vault = NodeVault({
    apiVersion: 'v1',
    endpoint: process.env.VAULT_ADDR || 'http://127.0.0.1:8200',
    token: process.env.VAULT_TOKEN || 'root',
  });

  try {
    const list = await vault.list('secret/metadata');
    // For demo purposes, we will try to read a specific secret path
    // In production, this path should be dynamic or configured via env
    const secretPath = 'secret/data/ms-graph-nest-js/development';

    // Check if secret exists before reading to avoid error on fresh install
    // This is a simplified check.

    const result = await vault.read(secretPath).catch(() => null);

    if (result && result.data && result.data.data) {
      return result.data.data;
    }
    return {};
  } catch (err) {
    // Determine if we should fail hard or allow fallback to .env
    console.warn(
      'Vault connection failed or no secrets found, using .env files only.',
      err.message,
    );
    return {};
  }
};
