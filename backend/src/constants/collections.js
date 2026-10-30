import { last30Days, thisWeek, nextWeek, nextMonth, wholeYear } from '../utils/date-range.js';

const TOP_LIMITS = [250, 500];
const MIN_METACRITIC_FOR_TOP = '70,100';

const byRelease = { field: 'released', direction: 'desc' };
const byAnticipation = { field: 'popularity', direction: 'desc' };
const byRating = { field: 'rating', direction: 'desc' };

export const COLLECTIONS = Object.freeze({
  'last-30-days': {
    build: ({ now }) => ({ filters: { dates: last30Days(now), ordering: byRelease } }),
  },
  'this-week': {
    build: ({ now }) => ({ filters: { dates: thisWeek(now), ordering: byAnticipation } }),
  },
  'next-week': {
    build: ({ now }) => ({ filters: { dates: nextWeek(now), ordering: byAnticipation } }),
  },
  'next-month': {
    build: ({ now }) => ({ filters: { dates: nextMonth(now), ordering: byAnticipation } }),
  },
  'best-of-year': {
    build: ({ now, year }) => {
      const dates = wholeYear(year ?? now.getUTCFullYear());
      return {
        filters: { dates, ordering: byRating, metacritic: MIN_METACRITIC_FOR_TOP },
        fallbackFilters: { dates, ordering: byAnticipation },
      };
    },
  },
  'all-time-top': {
    build: ({ limit }) => ({
      filters: { ordering: byRating, metacritic: MIN_METACRITIC_FOR_TOP },
      limit: TOP_LIMITS.includes(limit) ? limit : TOP_LIMITS[0],
    }),
  },
});