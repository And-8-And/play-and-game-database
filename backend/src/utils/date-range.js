const DAY_MS = 24 * 60 * 60 * 1000;

const toIso = (date) => date.toISOString().slice(0, 10);
const addDays = (date, days) => new Date(date.getTime() + days * DAY_MS);
const range = (from, to) => `${toIso(from)},${toIso(to)}`;

const startOfWeek = (date) => addDays(date, -((date.getUTCDay() + 6) % 7));

export const last30Days = (now) => range(addDays(now, -30), now);

export const thisWeek = (now) => {
  const start = startOfWeek(now);
  return range(start, addDays(start, 6));
};

export const nextWeek = (now) => {
  const start = addDays(startOfWeek(now), 7);
  return range(start, addDays(start, 6));
};

export const nextMonth = (now) => {
  const year = now.getUTCFullYear();
  const month = now.getUTCMonth() + 1;
  return range(new Date(Date.UTC(year, month, 1)), new Date(Date.UTC(year, month + 1, 0)));
};

export const wholeYear = (year) => `${year}-01-01,${year}-12-31`;