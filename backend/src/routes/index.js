import { Router } from 'express';
import { createGamesController } from '../controllers/games.controller.js';
import { createCollectionsController } from '../controllers/collections.controller.js';
import { createLookupsController } from '../controllers/lookups.controller.js';
import { createFavoritesController } from '../controllers/favorites.controller.js';
import { createGamesRouter } from './games.routes.js';
import { createCollectionsRouter } from './collections.routes.js';
import { createLookupsRouter } from './lookups.routes.js';
import { createFavoritesRouter } from './favorites.routes.js';

export const createApiRouter = (services) => {
  const router = Router();
  router.get('/health', (_req, res) => res.json({ status: 'ok' }));
  router.use('/games', createGamesRouter(createGamesController(services.gamesService)));
  router.use('/collections', createCollectionsRouter(createCollectionsController(services.collectionsService)));
  router.use('/lookups', createLookupsRouter(createLookupsController(services.lookupsService)));
  router.use('/favorites', createFavoritesRouter(createFavoritesController(services.favoritesService)));
  return router;
};