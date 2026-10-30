import { asyncHandler } from '../utils/async-handler.js';
import { parseGameFilters, parseGameId } from '../validators/game-query.validator.js';

export const createGamesController = (gamesService) => ({
  search: asyncHandler(async (req, res) => {
    res.json(await gamesService.search(parseGameFilters(req.query)));
  }),

  getById: asyncHandler(async (req, res) => {
    res.json(await gamesService.getDetails(parseGameId(req.params.id)));
  }),
});