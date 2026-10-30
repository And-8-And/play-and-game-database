import { httpClient } from './httpClient.js';

export const gamesApi = {
  search: (params) => httpClient.get('/games', params),
  getById: (id) => httpClient.get(`/games/${id}`),
  getCollection: (name, params) => httpClient.get(`/collections/${name}`, params),
};