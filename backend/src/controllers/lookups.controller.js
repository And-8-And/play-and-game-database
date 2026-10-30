import { asyncHandler } from '../utils/async-handler.js';

export const createLookupsController = (lookupsService) => ({
  genres: asyncHandler(async (_req, res) => res.json(await lookupsService.getGenres())),
  platforms: asyncHandler(async (_req, res) => res.json(await lookupsService.getPlatforms())),
  publishers: asyncHandler(async (req, res) =>
    res.json(await lookupsService.searchPublishers(req.query.search)),
  ),
});