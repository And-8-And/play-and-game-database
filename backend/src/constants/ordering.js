export const ORDERING_FIELDS = Object.freeze({
  name: { rawg: 'name', defaultDirection: 'asc' },
  popularity: { rawg: 'added', defaultDirection: 'desc' },
  rating: { rawg: 'rating', defaultDirection: 'desc' },
  released: { rawg: 'released', defaultDirection: 'desc' },
  metacritic: { rawg: 'metacritic', defaultDirection: 'desc' },
});

export const LOCAL_ORDERING_FIELD = 'platform';

export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 40;