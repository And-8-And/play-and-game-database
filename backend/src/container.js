import path from 'node:path';
import { env } from './config/env.js';
import { MemoryCache } from './cache/memory-cache.js';
import { RawgClient } from './clients/rawg.client.js';
import { JsonFavoritesRepository } from './repositories/favorites.repository.js';
import { GamesService } from './services/game.service.js';
import { CollectionsService } from './services/collections.service.js';
import { LookupsService } from './services/lookups.service.js';
import { FavoritesService } from './services/favorites.service.js';

export const createContainer = () => {
  const cache = new MemoryCache(env.cacheTtlSeconds);
  const rawgClient = new RawgClient({
    baseUrl: env.rawgBaseUrl,
    apiKey: env.rawgApiKey,
    cache,
  });
  const favoritesRepository = new JsonFavoritesRepository(
    path.resolve('data', 'favorites.json'),
  );

  const gamesService = new GamesService(rawgClient);

  return {
    gamesService,
    collectionsService: new CollectionsService(gamesService),
    lookupsService: new LookupsService(rawgClient),
    favoritesService: new FavoritesService(favoritesRepository, gamesService),
  };
};