import { httpClient } from './httpClient.js';

export const lookupsApi = {
  getGenres: () => httpClient.get('/lookups/genres'),
  getPlatforms: () => httpClient.get('/lookups/platforms'),
  searchPublishers: (search) => httpClient.get('/lookups/publishers', { search }),
};