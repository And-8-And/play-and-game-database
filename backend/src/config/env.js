import 'dotenv/config';

const required = (name) => {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
};

export const env = Object.freeze({
  port: Number(process.env.PORT) || 5000,
  rawgApiKey: required('RAWG_API_KEY'),
  rawgBaseUrl: process.env.RAWG_BASE_URL || 'https://api.rawg.io/api',
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  cacheTtlSeconds: Number(process.env.CACHE_TTL_SECONDS) || 300,
});