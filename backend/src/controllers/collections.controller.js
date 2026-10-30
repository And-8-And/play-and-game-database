import { asyncHandler } from '../utils/async-handler.js';

export const createCollectionsController = (collectionsService) => ({
  get: asyncHandler(async (req, res) => {
    res.json(await collectionsService.get(req.params.name, req.query));
  }),
});