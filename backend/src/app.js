import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { createApiRouter } from './routes/index.js';
import { notFound } from './middlewares/not-found.js';
import { errorHandler } from './middlewares/error-handler.js';

export const createApp = (services) => {
  const app = express();
  app.use(cors({ origin: env.clientOrigin }));
  app.use(express.json());
  app.use('/api', createApiRouter(services));
  app.use(notFound);
  app.use(errorHandler);
  return app;
};