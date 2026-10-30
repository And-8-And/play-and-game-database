import { AppError } from '../errors/app-error.js';

// eslint-disable-next-line no-unused-vars
export const errorHandler = (error, _req, res, _next) => {
  const isKnown = error instanceof AppError;
  if (!isKnown) console.error(error);

  res.status(isKnown ? error.statusCode : 500).json({
    error: {
      message: isKnown ? error.message : 'Internal server error',
      details: isKnown ? error.details : undefined,
    },
  });
};