import { Router } from 'express';

export const createFavoritesRouter = (controller) => {
  const router = Router();
  router.get('/', controller.list);
  router.post('/', controller.add);
  router.delete('/:id', controller.remove);
  return router;
};