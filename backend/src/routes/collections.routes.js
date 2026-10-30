import { Router } from 'express';

export const createCollectionsRouter = (controller) => {
  const router = Router();
  router.get('/:name', controller.get);
  return router;
};