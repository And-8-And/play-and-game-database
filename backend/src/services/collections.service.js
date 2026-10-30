import { COLLECTIONS } from '../constants/collections.js';
import { AppError } from '../errors/app-error.js';
import { parsePagination } from '../validators/game-query.validator.js';

const applyLimit = (result, { page, pageSize, limit }) => {
  const offset = (page - 1) * pageSize;
  const remaining = Math.max(limit - offset, 0);
  return {
    ...result,
    count: Math.min(result.count, limit),
    hasNext: result.hasNext && offset + pageSize < limit,
    results: result.results.slice(0, remaining),
  };
};

export class CollectionsService {
  #gamesService;
  #clock;

  constructor(gamesService, clock = () => new Date()) {
    this.#gamesService = gamesService;
    this.#clock = clock;
  }

  async get(name, query) {
    const collection = COLLECTIONS[name];
    if (!collection) throw new AppError(`Unknown collection: ${name}`, 404);

    const { page, pageSize } = parsePagination(query);
    const { filters, fallbackFilters, limit } = collection.build({
      now: this.#clock(),
      year: query.year ? Number(query.year) : undefined,
      limit: query.limit ? Number(query.limit) : undefined,
    });

    let result = await this.#gamesService.search({ ...filters, page, pageSize });
    if (result.count === 0 && fallbackFilters) {
      result = await this.#gamesService.search({ ...fallbackFilters, page, pageSize });
    }

    return limit ? applyLimit(result, { page, pageSize, limit }) : result;
  }
}