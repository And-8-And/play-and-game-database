import { Router } from 'express';

export const createLookupsRouter = (controller) => {
  const router = Router();
  router.get('/genres', controller.genres);
  router.get('/platforms', controller.platforms);
  router.get('/publishers', controller.publishers);
  return router;
};