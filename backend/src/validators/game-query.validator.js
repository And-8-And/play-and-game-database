import { AppError } from '../errors/app-error.js';
import {
  ORDERING_FIELDS,
  LOCAL_ORDERING_FIELD,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
} from '../constants/ordering.js';

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const ID_LIST = /^[\w-]+(,[\w-]+)*$/;
const MIN_DATE = '1970-01-01';
const MAX_DATE = '2100-12-31';

const toInt = (value, name, { min, max, fallback }) => {
  if (value === undefined) return fallback;
  const number = Number(value);
  if (!Number.isInteger(number) || number < min || number > max) {
    throw new AppError(`Invalid "${name}" (expected integer ${min}-${max})`, 400);
  }
  return number;
};

const toList = (value, name) => {
  if (value === undefined || value === '') return undefined;
  if (!ID_LIST.test(value)) throw new AppError(`Invalid "${name}" list`, 400);
  return value;
};

const toDate = (value, name) => {
  if (value === undefined || value === '') return undefined;
  if (!ISO_DATE.test(value)) throw new AppError(`Invalid "${name}" (expected YYYY-MM-DD)`, 400);
  return value;
};

export const parsePagination = (query) => ({
  page: toInt(query.page, 'page', { min: 1, max: 10000, fallback: 1 }),
  pageSize: toInt(query.pageSize, 'pageSize', { min: 1, max: MAX_PAGE_SIZE, fallback: DEFAULT_PAGE_SIZE }),
});

const parseOrdering = ({ orderBy, direction }) => {
  if (!orderBy) return undefined;
  const isKnown = orderBy === LOCAL_ORDERING_FIELD || orderBy in ORDERING_FIELDS;
  if (!isKnown) throw new AppError(`Unknown "orderBy": ${orderBy}`, 400);
  if (direction && !['asc', 'desc'].includes(direction)) {
    throw new AppError('"direction" must be asc or desc', 400);
  }
  const defaultDirection = ORDERING_FIELDS[orderBy]?.defaultDirection ?? 'asc';
  return { field: orderBy, direction: direction ?? defaultDirection };
};

const parseDates = ({ dateFrom, dateTo }) => {
  const from = toDate(dateFrom, 'dateFrom');
  const to = toDate(dateTo, 'dateTo');
  if (!from && !to) return undefined;
  return `${from ?? MIN_DATE},${to ?? MAX_DATE}`;
};

export const parseGameFilters = (query) => ({
  ...parsePagination(query),
  search: query.search?.trim() || undefined,
  dates: parseDates(query),
  parentPlatforms: toList(query.platforms, 'platforms'),
  genres: toList(query.genres, 'genres'),
  publishers: toList(query.publishers, 'publishers'),
  ordering: parseOrdering(query),
});

export const parseGameId = (value) => {
  if (!/^[\w-]+$/.test(value)) throw new AppError('Invalid game id', 400);
  return value;
};

export const parsePositiveInt = (value, name) =>
  toInt(value, name, { min: 1, max: Number.MAX_SAFE_INTEGER, fallback: undefined });