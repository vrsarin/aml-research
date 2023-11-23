// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

export const environment = {
  production: false,
  VAULT_URL: process.env.NX_VAULT_URL ?? 'http://localhost:8081',
  GRAPH_URL: process.env.NX_GRAPH_URL ?? 'http://localhost:8082',
};
