export const environment = {
  production: true,
  VAULT_URL: process.env.NX_VAULT_URL ?? 'http://localhost:8081',
  GRAPH_URL: process.env.NX_GRAPH_URL ?? 'http://localhost:8082',
  MINIO_HOST: process.env.NX_MINIO_HOST ?? 'localhost',
  MINIO_URL: process.env.NX_MINIO_URL ?? 'http://localhost:9000',
};
