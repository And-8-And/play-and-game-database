import { ORDERING_FIELDS, LOCAL_ORDERING_FIELD } from '../constants/ordering.js';
import { toGameSummary, toGameDetails, toPage } from '../mappers/game.mapper.js';

const toRawgOrdering = (ordering) => {
  const config = ordering && ORDERING_FIELDS[ordering.field];
  if (!config) return undefined;
  return ordering.direction === 'desc' ? `-${config.rawg}` : config.rawg;
};

const firstPlatform = (game) => game.platforms[0] ?? '';

const sortByPlatformLocally = (page, direction) => {
  const factor = direction === 'desc' ? -1 : 1;
  const results = [...page.results].sort(
    (a, b) => factor * firstPlatform(a).localeCompare(firstPlatform(b)),
  );
  return { ...page, results };
};

export class GamesService {
  #rawgClient;

  constructor(rawgClient) {
    this.#rawgClient = rawgClient;
  }

  async search(filters) {
    const { page, pageSize, ordering } = filters;
    const raw = await this.#rawgClient.get('/games', {
      search: filters.search,
      page,
      page_size: pageSize,
      dates: filters.dates,
      parent_platforms: filters.parentPlatforms,
      genres: filters.genres,
      publishers: filters.publishers,
      metacritic: filters.metacritic,
      ordering: toRawgOrdering(ordering),
    });

    const result = toPage(raw, { page, pageSize });
    return ordering?.field === LOCAL_ORDERING_FIELD
      ? sortByPlatformLocally(result, ordering.direction)
      : result;
  }

  async getDetails(idOrSlug) {
    const [game, screenshots] = await Promise.all([
      this.#rawgClient.get(`/games/${idOrSlug}`),
      this.#rawgClient.get(`/games/${idOrSlug}/screenshots`),
    ]);
    return toGameDetails(game, screenshots.results);
  }

  async getSummary(idOrSlug) {
    const game = await this.#rawgClient.get(`/games/${idOrSlug}`);
    return toGameSummary(game);
  }
}