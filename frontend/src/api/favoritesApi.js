import { httpClient } from './httpClient.js';

export const favoritesApi = {
  list: () => httpClient.get('/favorites'),
  add: (gameId) => httpClient.post('/favorites', { gameId }),
  remove: (gameId) => httpClient.delete(`/favorites/${gameId}`),
};