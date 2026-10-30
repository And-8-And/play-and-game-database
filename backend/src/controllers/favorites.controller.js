import { asyncHandler } from '../utils/async-handler.js';
import { AppError } from '../errors/app-error.js';
import { parsePositiveInt } from '../validators/game-query.validator.js';

export const createFavoritesController = (favoritesService) => ({
  list: asyncHandler(async (_req, res) => res.json(await favoritesService.list())),

  add: asyncHandler(async (req, res) => {
    if (req.body?.gameId === undefined) throw new AppError('"gameId" is required', 400);
    const gameId = parsePositiveInt(req.body.gameId, 'gameId');
    res.status(201).json(await favoritesService.add(gameId));
  }),

  remove: asyncHandler(async (req, res) => {
    await favoritesService.remove(parsePositiveInt(req.params.id, 'id'));
    res.status(204).end();
  }),
});