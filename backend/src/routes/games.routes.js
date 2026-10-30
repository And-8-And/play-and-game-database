import { Router } from 'express';

export const createGamesRouter = (controller) => {
  const router = Router();
  router.get('/', controller.search);
  router.get('/:id', controller.getById);
  return router;
};